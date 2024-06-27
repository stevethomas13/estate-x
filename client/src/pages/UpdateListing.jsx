import React from 'react';
import { useState, useEffect } from 'react';
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage';
import {app} from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateListing = () => {

  const {currentUser} = useSelector(state => state.user);
  const params = useParams();
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false, 
    parking: false, 
    furnished: false, 
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  useEffect(() => {
    const fetchListing = async () => {
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json();
        if(data.success === false){
            console.log(data.message);
            return ;
        }
        setFormData(data);
    };

    fetchListing();
  }, [])
  
  
  const handleImageSubmit = (e) => {
    setUploading(true);
    setImageUploadError(false);
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for(let i = 0; i < files.length; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
      .then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls)});
        setImageUploadError(false);
        setUploading(false);
      })
      .catch((error) => {
        setImageUploadError(`Image uploade error: ${error}`)
      });
    }
    else{
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          console.log(`Progress is ${progress}`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      )
    });
  }

  const handleSubmit = async (e) => {
   try{
      e.preventDefault();
      if (formData.imageUrls.length < 1) return setError('You must upload at least one image!');
      if (+formData.discountPrice > +formData.regularPrice) return setError(
        'Discount price must be lower than regular price');
      setError(false);
      setLoading(true);
      const res = await fetch(`/api/listing/update/${params.listingId}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id}),
        }
      );
      const data = await res.json();
      setLoading(false);
      if(data.success === false){
        setError(error.message);
        return ;
      }
      navigate(`/listing/${data._id}`);
    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData, 
      imageUrls: formData.imageUrls.filter((_, i) => i != index )
    })
  }

  const handleChange = (e) => {
    if(e.target.id === 'sale' || e.target.id === 'rent'){
      setFormData({
        ...formData, 
        type: e.target.id
      })
    }

    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
      setFormData({
        ...formData, 
        [e.target.id]: e.target.checked
      })
    }

    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }
  }


  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Update a listing</h1> 
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4' action="">
        <div className='flex flex-col gap-4 flex-1'>
          <input className='border p-3 rounded-lg' id='name' type="text"
          placeholder='Name' onChange={handleChange} value={formData.name}/>
          <textarea className='border p-3 rounded-lg' id='description' type="text"
          placeholder='Description' onChange={handleChange} value={formData.description} required/>
          <input className='border p-3 rounded-lg' id='address' type="text"
          placeholder='Address' onChange={handleChange} required value={formData.address}/>
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input id='sale' 
                className='w-5' type="checkbox"  onChange={handleChange}
                checked={formData.type==='sale'}
                />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input id='rent' className='w-5' type="checkbox" 
              onChange={handleChange} checked={formData.type==='rent'} />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input id='parking' className='w-5' type="checkbox" 
              onChange={handleChange} checked={formData.parking} />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input id='furnished' className='w-5' type="checkbox" name=""
              onChange={handleChange} checked={formData.furnished} />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input id='offer' className='w-5' type="checkbox" name=""
              onChange={handleChange} checked={formData.offer} />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-2'>
              <input 
                type="number"id="bedrooms" min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg'
                value={formData.bedrooms} onChange={handleChange}
                />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type="number" id="bathrooms" min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg'
                value={formData.bathrooms} onChange={handleChange}
                />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type="number" name="" id="regularPrice" min='50' max='1000000000' required
                className='p-3 border border-gray-300 rounded-lg'
                value={formData.regularPrice} onChange={handleChange}
                />
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}

              </div>
            </div>
            { formData.offer && (
              <div className='flex items-center gap-2'>
                <input 
                  type="number" name="" id="discountPrice" min='0' max='1000000000' required
                  className='p-3 border border-gray-300 rounded-lg'
                  value={formData.discountPrice} onChange={handleChange}
                  />
                <div className='flex flex-col items-center'>
                  <p>Discounted Price</p>
                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-4 flex-1'>
          <p className='font-semibold'>Images:
            <span className='font-nornal text-gray-600 ml-2'>
            The first image will be the cover(max 6)</span>
          </p>
          <div className='flex gap-4'>
            <input onChange={(e) => setFiles(e.target.files)} type="file" id="images" accept='image/*' multiple
              className='p-3 border border-gray-300 rounded w-full'
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded
              uppercase hover:shadow-lg disabled:opacity-80'>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-500 text-sm'>{imageUploadError && imageUploadError}</p>
          {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
              <div key={url} className='flex justify-between p-3 items-center border'>
                <img 
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg' />
                <button 
                  type='button'
                  className='p-3 text-red-500 rounded-lg uppercase hover:opacity-80'
                  onClick={() => handleRemoveImage(index)}>
                  Delete
                </button>
              </div>
            ))
          }
          <button 
            disabled={loading || uploading}
            className='h-10 uppercase bg-slate-600 text-white rounded hover:shadow-lg
             disabled:opacity-80'
          >
            {loading ? 'Loading..' : 'update listing'}
          </button>
            {error && <p className='text-red-500 mt-5 text-sm'>{error}</p>}
        </div>
        
      </form>
    </main>
  )
}

export default UpdateListing