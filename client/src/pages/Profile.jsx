import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { Link  } from 'react-router-dom';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice';
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import Footer from '../components/Footer';

const Profile = () => {

  const {currentUser, loading, error} = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState(false);
  const dispatch = useDispatch();
  console.log(userListings);


  const handleDeleteUser = async (e) => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
          method: 'DELETE'
        }
      );
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data.message));
        return ;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  const handleSignOutUser = async (e) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return ;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

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

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false){
        setShowListingsError(true);
        return ;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`,{
          method: 'DELETE'
        }
      );
      const data = await res.json();
      if(data.success === false){
        console.log(data.message);
        return ;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  }

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
        
        <span onClick={handleDeleteUser} className='text-red-500 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOutUser} className='text-red-500 cursor-pointer'>Sign out</span>
      </div>

      {error && <p className='text-red-500 mt-5 text-sm'>{error}</p>}
      {updateSuccess && <p className='text-green-700 mt-5 text-sm'>User updated successfully</p>}

      <button onClick={handleShowListings} className='text-green-700 w-full'>Show listings</button>
      {showListingsError && <p className='text-red-500 mt-5 text-sm'>Error showing listings</p>}

      {userListings && userListings.length > 0 && 
      <div className='flex flex-col gap-4'>
        <h1 className='text-center mt-7 text-2xl font-semibold'>Your listings</h1>
        {userListings.map((listing) => (
          <div key={listing._id} className='border hover:shadow-lg rounded-lg p-3 flex justify-between items-center'>
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover" 
                className='h-16 w-16 object-contain' />
              </Link>
              <Link to={`/listing/${listing._id}`}>
                <p className='text-slate-700 font-semibold hover:underline truncate flex-1'>{listing.name}</p>
              </Link>
              <div className='flex flex-col items-center'>
                <button onClick={()=> handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>edit</button>
                </Link>
                
              </div>
          </div>
        ))}
      </div>}
      <Footer></Footer>
    </div>
  )
}

export default Profile