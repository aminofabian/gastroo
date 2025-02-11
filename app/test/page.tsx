import React from 'react';

const NewsletterBanner = () => {
  return (
    <div className="relative w-full h-[200px] bg-[#00B3B0] overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center px-8">
        {/* Left Content */}
        <div className="text-white space-y-2 max-w-[300px]">
          <div className="space-y-1">
            <p className="text-sm">JOIN OUR</p>
            <h2 className="text-2xl font-bold tracking-wider">NEWSLETTER</h2>
          </div>
          <p className="text-xs">
            Unlock a World of Knowledge and Stay Updated with Our Exclusive Content
          </p>
        </div>

        {/* Right Content - Website Launch Text */}
        <div className="absolute top-4 right-4 text-white text-sm">
          Castro Website Launch
        </div>

        {/* Social Icons */}
        <div className="absolute bottom-4 right-4 flex gap-3">
          <img src="/phone-icon.svg" alt="Phone" className="w-5 h-5" />
          <img src="/web-icon.svg" alt="Website" className="w-5 h-5" />
          <img src="/email-icon.svg" alt="Email" className="w-5 h-5" />
        </div>
      </div>

      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url("/city-skyline.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Curved Shape */}
      <div className="absolute bottom-0 left-0 w-[40%] h-full bg-white"
           style={{
             clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)'
           }}
      />
    </div>
  );
};

export default NewsletterBanner;