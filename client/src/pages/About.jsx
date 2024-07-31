import React from 'react';
import Footer from '../components/Footer';
import photo from '../assets/5220536930_f20c652671_k.jpg'

const About = () => {
  return (
    <div>
      <div className='py-20 px-4 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Estate X</h1>
        <p className='mb-4 text-slate-700'>
          Welcome to Estate X, your premier destination for buying and selling homes. Whether you're in the market for your dream house or looking to get the best value for your property, Estate X offers a seamless and efficient platform tailored to meet your real estate needs. Our extensive listings and personalized services ensure you find exactly what you're looking for, with trusted buyers and sellers ready to make your transaction smooth and successful.
        </p>
        <p className='mb-4 text-slate-700'>
          At Estate X, we understand that buying or selling a home is more than just a transaction—it's a significant life event. That's why our team is dedicated to providing you with comprehensive support and expert guidance every step of the way. From detailed property listings and virtual tours to market analysis and negotiation tips, we equip you with the tools and knowledge needed to make informed decisions with confidence.
        </p>
        <p className='mb-4 text-slate-700'>
          Join our vibrant community of homeowners, buyers, and real estate professionals who trust Estate X to deliver exceptional results. Our user-friendly platform makes it easy to list your property, explore potential homes, and connect with the right people. Start your real estate journey with Estate X today, and let us help you turn your dreams into reality.
        </p>

      </div>
      <img className='h-[500px] mx-auto object-cover w-full' src={photo}></img>
      <div className='py-20 px-4 max-w-6xl mx-auto'>
        <p className='mb-4 text-slate-700'>
          At Estate X, we pride ourselves on staying ahead of the curve with the latest technology and market trends. Our cutting-edge tools, including advanced search filters and AI-driven recommendations, ensure that you can find properties that match your specific criteria quickly and efficiently. Additionally, our mobile app allows you to manage your real estate activities on the go, giving you the flexibility to browse listings, schedule viewings, and stay updated with market developments wherever you are.
        </p>
        <p className='mb-4 text-slate-700'>
          We also believe in the importance of community and local expertise. Our network of experienced real estate agents is deeply familiar with the neighborhoods and markets they serve. They provide invaluable insights and personalized advice tailored to your unique needs and preferences. Whether you're moving to a new city or looking for the perfect neighborhood to raise a family, our agents are here to guide you with local knowledge and professional expertise.
        </p>
        <p className='mb-4 text-slate-700'>
          Moreover, Estate X is committed to transparency and integrity in all our dealings. We prioritize building long-lasting relationships based on trust and reliability. Our detailed property descriptions, verified listings, and honest reviews from previous clients give you a clear and accurate picture of what to expect. With Estate X, you can navigate the real estate market with peace of mind, knowing that you have a trustworthy partner by your side.
        </p>

      </div>

      <Footer></Footer>
    </div>
  )
}

export default About