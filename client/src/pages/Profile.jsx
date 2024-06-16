import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {

  const {currentUser, error} = useSelector((state) => state.user)

  const handleChange = (e) => {
    console.log('Hello')
  }

  const handleSubmit = (e) => {
    console.log('Hello')
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Profile</h1> 
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
        <img src={currentUser.avatar} 
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'
          alt="profile-photo" />
        <input className='border p-3 rounded-lg' id='username' type="text"
        placeholder='username' onChange={handleChange}/>
        <input className='border p-3 rounded-lg' id="email" type="email" 
        placeholder='email' onChange={handleChange}/>
        <input className='border p-3 rounded-lg' id="password" type="password" 
        placeholder='password' onChange={handleChange}/>
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:80'>
          Update
        </button>
      </form>
      <div className='my-4 flex justify-between'>
        <span className='text-red-500 cursor-pointer'>Delete account</span>
        <span className='text-red-500 cursor-pointer'>Sign out</span>
      </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Profile