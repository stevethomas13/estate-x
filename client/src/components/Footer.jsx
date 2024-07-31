import React from 'react';
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";

const Footer = () => {
    return (
        <footer
            className="text-center bg-slate-700 text-white/75 lg:text-left">
            <div
                className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-white/10 lg:justify-between">
                <div className="me-12 hidden lg:block">
                    <span>See more:</span>
                </div>
                <div className="flex justify-center gap-3">
                    <Link to={'https://www.linkedin.com/in/steve-thomas-in/'}>
                        <FaLinkedin className='w-8 h-8' />
                    </Link>
                    <Link to={'https://github.com/stevethomas13'}>
                        <FaGithub className='w-8 h-8' />
                    </Link>
                    <Link to={'https://stevethomas.vercel.app'}>
                        <IoIosDocument className='w-8 h-8' />
                    </Link>
                    
                </div>
            </div>

            <div className="mx-6 py-10 text-center md:text-left">
                <div className="grid-1 grid gap-8 md:grid-cols-4">
                    <div className="">
                        <h6
                            className="mb-4 flex items-center justify-center font-semibold md:justify-start">
                            EstateX
                        </h6>
                        <p>
                            Find your next perfect home with ease!
                        </p>
                    </div>
                    <div>
                        <h6
                            className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Products
                        </h6>
                        <Link to={'search?type=rent'}>
                            <p className="mb-4">
                                Rent
                            </p>
                        </Link>
                        <Link to={'search?type=sale'}>
                            <p className="mb-4">
                                Sale
                            </p>
                        </Link>
                        <Link to={'search?offer=true'}>
                            <p className="mb-4">
                                Offer
                            </p>
                        </Link>
                        
                    </div>
                    <div>
                        <h6
                            className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Useful links
                        </h6>
                        <p className="mb-4">
                            <a href="#!">Pricing</a>
                        </p>
                        <p className="mb-4">
                            <a href="#!">Settings</a>
                        </p>
                        <p className="mb-4">
                            <a href="#!">Orders</a>
                        </p>
                        <p>
                            <a href="#!">Help</a>
                        </p>
                    </div>
                    <div>
                        <h6
                            className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Contact
                        </h6>
                        <p className="mb-4 flex items-center justify-center md:justify-start">
                            <FaHome className='h-6 w-6 mr-2' />
                            Dublin, Ireland
                        </p>
                        <p className="mb-4 flex items-center justify-center md:justify-start">

                            <MdEmail className='h-6 w-6 mr-2' />
                            info@example.com
                        </p>

                    </div>
                </div>
            </div>


        </footer>
    )
}

export default Footer