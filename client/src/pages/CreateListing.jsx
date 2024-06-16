import React from 'react'

const CreateListing = () => {
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
            <input type="file" id="images" accept='image/*' multiple
              className='p-3 border border-gray-300 rounded w-full'
            />
            <button
              className='p-3 text-green-700 border border-green-700 rounded
              uppercase hover:shadow-lg disabled:opacity-80'>
              Upload
            </button>
          </div>
          <button 
            className='h-10 uppercase bg-slate-600 text-white rounded hover:shadow-lg disabled:opacity-80'
          >
            create listing
          </button>
        </div>
        
      </form>
    </main>
  )
}

export default CreateListing