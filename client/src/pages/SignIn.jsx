import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess, clearState } from '../redux/user/userSlice';
import OAuth from '../components/OAuth.jsx';


const SignIn = () => {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const {loading, error} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let ignore = false;
    
    
    if (!ignore)  dispatch(clearState());
    return () => { ignore = true; }
    },[]);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try{
      // to prevent react from refreshing the page
      e.preventDefault();
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
        return ;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    }catch(error){
      dispatch(signInFailure(error.message));
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'> Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
        <input className='border p-3 rounded-lg' id="email" type="text" 
        placeholder='email' onChange={handleChange}/>
        <input className='border p-3 rounded-lg' id="password" type="password" 
        placeholder='password' onChange={handleChange}/>
        <button
          disabled={loading} 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:80'>
          { loading ? 'Loading...' :' Sign In' }
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-3'>
        <p className=''>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn;