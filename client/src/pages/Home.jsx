import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";
import { motion } from 'framer-motion';
import house_image from '../assets/image.jpg'

function Home() {
    const [offerListings, setOfferListings] = useState();
    const [saleListings, setSaleListings] = useState();
    const [rentListings, setRentListings] = useState();
    SwiperCore.use([Navigation]);
    console.log(offerListings);


    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch('/api/listing/get?offer=true&limit=4');
                const data = await res.json();
                setOfferListings(data);
                fetchRentListings();
            } catch (error) {
                console.log(error);
            }
        }
        const fetchRentListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=rent&limit=4');
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings();
            } catch (error) {
                console.log(error);
            }
        }
        const fetchSaleListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=sale&limit=4');
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOfferListings();
    }, []);



    return (
        <div>

            <div className="relative flex flex-col md:flex-row gap-6 max-w-6xl md:mx-auto h-[600px] md:h-[850px] place-content-center mx-5">
                {/* Left Column */}
                <div className="flex flex-col gap-6 md:w-1/2 place-content-center">
                    <motion.h1
                        className="text-slate-700 font-bold text-3xl lg:text-6xl"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Find your next <span className="text-slate-500">perfect</span>
                        <br />
                        home with ease.
                    </motion.h1>
                    <motion.div
                        className="text-gray-400 text-xs sm:text-sm"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        EstateX is the best place to find your next home to live in.
                        <br />
                        We have a wide range of properties to choose from.
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <Link
                            to={"/search"}
                            className="text-xs sm:text text-blue-800 font-bold hover:underline"
                        >
                            Let's get started
                        </Link>
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="items-center justify-center md:w-1/2 md:flex hidden">
                    <motion.div
                        className="w-144 h-150 rounded-full bg-blue-300"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 1 }}
                    >
                        <img
                            src={house_image}
                            alt="Circular Decorative"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </motion.div>
                </div>
            </div>

            <Swiper navigation>
                {offerListings &&
                    offerListings.length > 0 &&
                    offerListings.map((listing) => (
                        <SwiperSlide>
                            <div class="relative inline-block w-full">
                                <img src={listing.imageUrls[0]} alt="Overlay example" class="w-full h-[500px] object-cover" />
                                <Link to={`/listing/${listing._id}`}>
                                    <button
                                        class="absolute top-3/4 left-1/2 transform bg-gray-800 bg-opacity-50 -translate-x-1/2 -translate-y-1/2 bg-transparent-700 text-white font-bold py-2 px-4 rounded hover:bg-opacity-80 duration-300"
                                    >
                                        See this listing
                                    </button>
                                </Link>

                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>

            <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10">
                {offerListings && offerListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
                            <Link className="text-sm text-blue-800 hover:underline" to={'search?offer=true'}>
                                Show more offers
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {offerListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id}></ListingItem>
                            ))}
                        </div>
                    </div>
                )}
                {rentListings && rentListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h2 className="text-2xl font-semibold text-slate-600">Recent places to rent</h2>
                            <Link className="text-sm text-blue-800 hover:underline" to={'search?type=rent'}>
                                Show more places for rent
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {rentListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id}></ListingItem>
                            ))}
                        </div>
                    </div>
                )}
                {saleListings && saleListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h2 className="text-2xl font-semibold text-slate-600">Recent places to sale</h2>
                            <Link className="text-sm text-blue-800 hover:underline" to={'search?type=sale'}>
                                Show more places for sale
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {saleListings.map((listing) => (
                                <ListingItem listing={listing} key={listing._id}></ListingItem>
                            ))}
                        </div>
                    </div>
                )}

            </div>
            <Footer></Footer>
        </div>
    );
}

export default Home;