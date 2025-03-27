"use client"
import React, { useState, FormEvent } from 'react';

const NewsletterBanner = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden mb-16">
      <img 
        src="/banner/group-of-african-doctors-2023-11-27-05-21-29-utc.jpg" 
        alt="Group of African doctors" 
        className="absolute w-full h-full object-cover object-center brightness-75"
      />
      
      <div className="absolute inset-0 bg-[#003366]/80" />
      
      <div className="absolute inset-0 flex items-center justify-end px-4 sm:px-6 lg:px-8">
        <div className="bg-[#003366]/90 p-8 max-w-md w-full mr-0 lg:mr-16">
          <h2 className="text-white text-2xl font-merriweather font-bold mb-4">
            Stay Updated with GSK Newsletter
          </h2>
          
          <p className="text-white/90 text-base font-merriweather mb-6 leading-relaxed">
            Subscribe to receive the latest updates in gastroenterology research and practice.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white 
                       placeholder:text-white/50 focus:outline-none focus:ring-2 
                       focus:ring-[#0f5a5e]/50 font-merriweather transition-all duration-300"
            />
            <button
              type="submit"
              className="w-full bg-[#003366] text-white px-6 py-3 font-merriweather
                       font-medium hover:bg-[#003366]/90 transition-all duration-300
                       flex items-center justify-center gap-2 group"
            >
              Subscribe
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterBanner;