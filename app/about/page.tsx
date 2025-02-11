'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Hero Section Component
const AboutHero = () => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const images = [
    '/ban/19195.jpg',
    '/ban/Business-Facebook-Cover-01.jpg',
    '/ban/SL-122519-26430-01.jpg'
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen min-h-[600px] bg-[#003366]">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentImage === index ? 'opacity-30' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`GSK Banner ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/80 to-[#003366]/95" />
      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-serif leading-relaxed">
            The Gastroenterology Society of Kenya (GSK) is more than just a medical organization - it&apos;s a community of dedicated professionals united by a passion for advancing digestive health care through education, research, and advocacy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Gallery Section Component
const Gallery = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { src: "/meeting/75B_6035.jpg", alt: "GSK Activities 1" },
          { src: "/meeting/75B_6038.jpg", alt: "GSK Activities 2" },
          { src: "/meeting/75B_6043.jpg", alt: "GSK Activities 3" }
        ].map((img, index) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative h-80 overflow-hidden  shadow-lg group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#003366]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// Mission Section Component
const Mission = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative h-[600px] overflow-hidden  shadow-xl">
            <Image
              src="/meeting/75B_6055.jpg"
              alt="GSK Mission"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/30 to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#003366]/10">
              <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold text-[#003366] mb-8">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg mb-8 font-serif leading-relaxed">
            Our mission is to advance the practice of gastroenterology through education, research, and the dissemination of knowledge, improving the prevention, diagnosis, treatment, and management of gastrointestinal diseases in Kenya.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#003366] text-white px-8 py-3 rounded-md hover:bg-[#004488] transition-colors duration-300 shadow-lg"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </div>
  </section>
);

// Work With Me Section Component
const WorkWithMe = () => (
  <section className="py-24 bg-[#003366]">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-serif font-bold text-white text-center mb-16"
      >
        Partner With Us
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Education",
            description: "Supporting continuous medical education and professional development for healthcare providers."
          },
          {
            title: "Research",
            description: "Promoting and facilitating research in gastroenterology and digestive health."
          },
          {
            title: "Advocacy",
            description: "Advocating for better digestive health policies and improved healthcare access."
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg p-8  hover:bg-white/15 transition-colors duration-300"
          >
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              {item.title}
            </h3>
            <p className="text-white/80 leading-relaxed">
              {item.description}
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 text-white border border-white/30 px-6 py-2 rounded-md hover:bg-white hover:text-[#003366] transition-colors duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Ready to Shoot Section Component
const ReadyToShoot = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold text-[#003366] mb-8">
            Ready to Join?
          </h2>
          <p className="text-gray-600 text-lg mb-8 font-serif leading-relaxed">
            Join the Gastroenterology Society of Kenya and become part of a community dedicated to advancing digestive health care in Kenya. Together, we can make a difference.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#003366] text-white px-8 py-3 rounded-md hover:bg-[#004488] transition-colors duration-300 shadow-lg"
          >
            Become a Member
          </motion.button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative h-[500px] overflow-hidden  shadow-xl">
            <Image
              src="/meeting/75B_6092.jpg"
              alt="Join GSK"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/30 to-transparent" />
          </div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#003366]/10">
              <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Main About Page Component
export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutHero />
      <Gallery />
      <Mission />
      <WorkWithMe />
      <ReadyToShoot />
    </main>
  );
} 