import React from 'react';
import { useState } from 'react';
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage';
import {app} from '../firebase'

const CreateListing = () => {

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(formData);
  
  
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

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData, 
      imageUrls: formData.imageUrls.filter((_, i) => i != index )
    })
  }

  const handleChange = () => {
    console.log('hello');
  }


  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Create a listing</h1> 
      <form className='flex flex-col sm:flex-row gap-4' action="">
        <div className='flex flex-col gap-4 flex-1'>
          <input className='border p-3 rounded-lg' id='name' type="text"
          placeholder='Name' onChange={handleChange}/>
          <textarea className='border p-3 rounded-lg' id='description' type="text"
          placeholder='Description' onChange={handleChange} required/>
          <input className='border p-3 rounded-lg' id='address' type="text"
          placeholder='Address' onChange={handleChange} required/>
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input id='sale' className='w-5' type="checkbox" name="" />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input id='rent' className='w-5' type="checkbox" name="" />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input id='parkingSpot' className='w-5' type="checkbox" name="" />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input id='furnished' className='w-5' type="checkbox" name="" />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input id='offer' className='w-5' type="checkbox" name="" />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-2'>
              <input 
                type="number"id="bedrooms" min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg'
                />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type="number" id="bathrooms" min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg'
                />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type="number" name="" id="regularPrice" min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg'
                />
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
                <span className='text-xs'>($/ Month)</span>

              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type="number" name="" id="discountPrice" min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg'
                />
              <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
                <span className='text-xs'>($/ Month)</span>
              </div>
            </div>
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
            className='h-10 uppercase bg-slate-600 text-white rounded hover:shadow-lg
             disabled:opacity-80'
          >
            create listing
          </button>
        </div>
        
      </form>
    </main>
  )
}

export default CreateListing