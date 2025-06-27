'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const symposiumImages = [
  {
    src: '/may-symposium/75B_1820.jpg',
    alt: 'May Symposium 2025 - Image 1',
    width: 800,
    height: 600
  },
  {
    src: '/may-symposium/75B_1929.jpg',
    alt: 'May Symposium 2025 - Image 2',
    width: 800,
    height: 600
  },
  {
    src: '/may-symposium/75B_1945.jpg',
    alt: 'May Symposium 2025 - Image 3',
    width: 800,
    height: 600
  },
  {
    src: '/may-symposium/DSC_8778.jpg',
    alt: 'May Symposium 2025 - Image 4',
    width: 800,
    height: 600
  },
  {
    src: '/may-symposium/75B_1813.jpg',
    alt: 'May Symposium 2025 - Image 5',
    width: 800,
    height: 600
  },
  {
    src: '/may-symposium/75B_1800.jpg',
    alt: 'May Symposium 2025 - Image 6',
    width: 800,
    height: 600
  },
  {
    src: '/may-symposium/75B_1917.jpg',
    alt: 'May Symposium 2025 - Image 7',
    width: 800,
    height: 600
  },
  {
    src: '/may-symposium/75B_1909.jpg',
    alt: 'May Symposium 2025 - Image 8',
    width: 800,
    height: 600
  },
  {
    src: '/may-symposium/75B_1842.jpg',
    alt: 'May Symposium 2025 - Image 9',
    width: 800,
    height: 600
  },
  {
    src: '/may-symposium/75B_1874.jpg',
    alt: 'May Symposium 2025 - Image 10',
    width: 800,
    height: 600
  },
  {
    src: '/may-symposium/75B_1813.jpg',
    alt: 'May Symposium 2025 - Image 11',
    width: 800,
    height: 600
  }
];

const eventDetails = {
  title: 'One Day Symposium - May 24th, 2025',
  subtitle: 'Focus on the Upper GA Tract',
  venue: 'Serena Hotel',
  date: 'May 24th, 2025',
  time: '11:00 AM - 8:00 PM',
  attendeeCount: '250+ attendees',
  speakers: '12 expert speakers',
  highlights: [
    'Latest research on upper gastrointestinal disorders',
    'Advanced diagnostic techniques presentations',
    'Expert panel discussions on treatment protocols',
    'Networking opportunities for gastroenterology professionals',
    'Exhibition of modern medical equipment and technology',
    'Hands-on workshops on endoscopic procedures'
  ],
  achievements: [
    'Raised awareness about GI health issues in Kenya',
    'Facilitated knowledge exchange between local and international experts',
    'Introduced new treatment guidelines for common upper GI conditions',
    'Strengthened partnerships with healthcare institutions across East Africa',
    'Provided continuing education for medical professionals'
  ]
};

export default function PastSymposiumPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % symposiumImages.length;
    });
  };

  const prevImage = () => {
    setSelectedImage((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + symposiumImages.length) % symposiumImages.length;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <Image
            src="/may-symposium/75B_1991.jpg"
            alt="Symposium background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 to-[#002244]/90"></div>
        
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4">Past Event Showcase</span>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                Past Event <span className="text-cyan-300">Summary</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                {eventDetails.title} - {eventDetails.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100/50 backdrop-blur-sm relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -bottom-24 -right-16 w-40 h-40 bg-blue-500/5 rounded-full"></div>
              <h2 className="text-2xl font-bold text-[#003366] mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Event Overview
              </h2>
              
              <div className="space-y-6 relative z-10">
                {/* Date and Time */}
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <svg className="w-5 h-5 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Date & Time</h3>
                    <p className="text-gray-600">{eventDetails.date}</p>
                    <p className="text-gray-600">{eventDetails.time}</p>
                  </div>
                </div>
                
                {/* Venue */}
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <svg className="w-5 h-5 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Venue</h3>
                    <p className="text-gray-600">{eventDetails.venue}</p>
                  </div>
                </div>
                
                {/* Attendees */}
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <svg className="w-5 h-5 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Participation</h3>
                    <p className="text-gray-600">{eventDetails.attendeeCount}</p>
                    <p className="text-gray-600">{eventDetails.speakers}</p>
                  </div>
                </div>
                

              </div>
            </div>
            
            {/* Achievements */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100/50 backdrop-blur-sm relative overflow-hidden"
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/5 rounded-full"></div>
              <h2 className="text-2xl font-bold text-[#003366] mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Event Achievements
              </h2>
              <ul className="space-y-3 relative z-10">
                {eventDetails.achievements.map((achievement, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <svg className="w-5 h-5 text-cyan-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Right Column - Event Highlights and Image Gallery */}
          <div className="lg:col-span-8 space-y-10">
            {/* Image Gallery */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100/50 backdrop-blur-sm relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <h2 className="text-2xl font-bold text-[#003366] mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Event Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 relative z-10">
                {symposiumImages.map((image, index) => (
                  <motion.div 
                    key={index} 
                    className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md"
                    onClick={() => openLightbox(index)}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      transition: { duration: 0.2 }
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center backdrop-blur-sm" 
        onClick={closeLightbox}>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-0 right-0 m-4">
              <button 
                onClick={closeLightbox} 
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Close lightbox"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              {selectedImage !== null && (
                <Image
                  src={symposiumImages[selectedImage].src}
                  alt={symposiumImages[selectedImage].alt}
                  width={1200}
                  height={800}
                />
              )}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button 
                onClick={prevImage} 
                className="bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75 transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button 
                onClick={nextImage} 
                className="bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75 transition-colors"
                aria-label="Next image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Additional Content - Summary Section */}
      <div className="bg-gradient-to-t from-blue-900 to-[#003366] text-white py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Thank You To All Participants
          </motion.h2>
          <motion.p 
            className="text-lg text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            We extend our heartfelt gratitude to all speakers, attendees, and sponsors who made the May Symposium a resounding success. Your contributions and participation have significantly advanced our collective knowledge and strengthened our professional community.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a href="/events" className="px-8 py-3 bg-white text-[#003366] font-medium rounded-lg hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>View Upcoming Events</span>
            </a>
            <a href="/membership" className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/20 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Become a Member</span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}