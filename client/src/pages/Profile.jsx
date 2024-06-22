import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { Link  } from 'react-router-dom';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';

const Profile = () => {

  const {currentUser, loading, error} = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  console.log(formData);




  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    try{
      // to prevent react from refreshing the page
      e.preventDefault();
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return ;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /  snapshot.totalBytes ) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => 
          setFormData({...formData, avatar: downloadURL})
        );
      }
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Profile</h1> 
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} 
          src={ formData.avatar || currentUser.avatar} 
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'
          alt="profile-photo" />
        <p className='self-center'>
          {fileUploadError ? 
            (<span className='text-red-500'>Error in image upload</span>) :
            (filePerc > 0 && filePerc < 100 ) ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'>Image uploaded successfully</span>
            ) : ""
          }  
        </p>
        <input className='border p-3 rounded-lg' id='username' type="text"
        placeholder='username' onChange={handleChange} defaultValue={currentUser.username}/>
        <input className='border p-3 rounded-lg' id="email" type="email" 
        placeholder='email' onChange={handleChange} defaultValue={currentUser.email}/>
        <input className='border p-3 rounded-lg' id="password" type="password" 
        placeholder='password' onChange={handleChange}/>
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:80'>
          {loading ? 'Loading...': 'Update'}
        </button>
        <Link to="/create-listing"
              className='text-center bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
              Create listing
        </Link>
      </form>
      <div className='my-4 flex justify-between'>
        
        <span className='text-red-500 cursor-pointer'>Delete account</span>
        <span className='text-red-500 cursor-pointer'>Sign out</span>
      </div>

      {error && <p className='text-red-500 mt-5 text-sm'>{error}</p>}
      {updateSuccess && <p className='text-green-700 mt-5 text-sm'>User updated successfully</p>}
    </div>
  )
}

export default Profile