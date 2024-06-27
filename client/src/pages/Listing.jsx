import React from 'react';
import { useParams }from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log(listing)


  useEffect(() => {
    
    const fetchListing = async () => {
      try {
        setLoading(false);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if(data.success === false){
          setError(true);
          setLoading(false);
          return ;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }  
    }

    fetchListing();
      
    
  }, [params.listingId])
  




  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) =>
              ( <SwiperSlide key={url}>
                  <img className='h-[500px] mx-auto' src={url}></img>
                </SwiperSlide>
              )
            )}
          </Swiper>

        </div>
      )}
    </main>
  )
}

export default Listing