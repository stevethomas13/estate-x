import React from 'react';
import { useParams }from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useSelector  } from 'react-redux';
import 'swiper/css/bundle';
import Contact from './Contact';
import Footer from '../components/Footer';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

const Listing = () => {
  SwiperCore.use([Navigation]);
  const {currentUser} = useSelector(state => state.user);
  const [offerListings, setOfferListings] =useState();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);


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
        fetchOfferListings();
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }  
    }

    const fetchOfferListings = async () => {
        try{
            const res = await fetch('/api/listing/get?offer=true&limit=4');
            const data = await res.json();
            setOfferListings(data);
        }catch(error){
            console.log(error);
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
                  <img className='h-[500px] mx-auto object-cover w-full' src={url}></img>
                </SwiperSlide>
              )
            )}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} DISCOUNT
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}

          </div>

        </div>
      )}

      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10">
          
           { offerListings && offerListings.length > 0 && (
              <div>
                  <div className="my-3">
                    <h2 className="text-2xl font-semibold text-slate-600">More like this:</h2>
                    <Link className="text-sm text-blue-800 hover:underline" to={'../search?offer=true'}>
                        Show more offers
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-4">
                      {offerListings.map((offerListing) => (
                          <ListingItem listing={offerListing} key={offerListing._id}></ListingItem>
                      ))}
                  </div>
              </div>
          )} 
          
      </div>

      <Footer></Footer>
    </main>
  )
}

export default Listing