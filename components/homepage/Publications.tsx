"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaRegCalendarAlt, FaRegClock, FaRegUser, FaChevronRight, FaDna, FaMicroscope, FaFlask, FaQuoteRight } from 'react-icons/fa';
import { GiMedicalDrip, GiMedicines, GiStomach, GiDna2 } from 'react-icons/gi';
import { IconType } from 'react-icons';
import Image from 'next/image';
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface FloatingIconProps {
  icon: IconType;
  delay: number;
  duration: number;
  x: string;
  y: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon: Icon, delay, duration, x, y }) => (
  <motion.div
    className="absolute text-[#003366]/10 text-3xl"
    initial={{ x, y }}
    animate={{ 
      y: y,
      translateY: ["-20px", "20px"],
      rotate: [0, 360],
      scale: [1, 1.2, 1]
    }}
    transition={{ 
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Icon />
  </motion.div>
);

const Publications = () => {
  const publications = [
    {
      category: "Research Article",
      title: "Advances in Endoscopic Techniques for Gastric Cancer Detection",
      preview: "A comprehensive review of modern endoscopic methods and their effectiveness in early detection of gastric malignancies.",
      date: "March 15, 2024",
      author: "Dr. Sarah Kimani",
      readTime: "12 min read",
      tags: ["Endoscopy", "Cancer Research", "Diagnostics"],
      image: "/publication/abdomen-8762848_1280.jpg"
    },
    {
      category: "Clinical Study",
      title: "Impact of Probiotics on Inflammatory Bowel Disease Management",
      preview: "Analysis of probiotic interventions in IBD patients across multiple healthcare facilities in Kenya.",
      date: "March 10, 2024",
      author: "Dr. James Mwangi",
      readTime: "15 min read",
      tags: ["IBD", "Probiotics", "Clinical Research"],
      image: "/publication/stomach-7111043_1280.jpg"
    },
    {
      category: "Review Article",
      title: "Current Trends in Hepatitis B Treatment in East Africa",
      preview: "A systematic review of treatment approaches and outcomes in managing Hepatitis B in East African populations.",
      date: "March 5, 2024",
      author: "Dr. John Doe",
      readTime: "10 min read",
      tags: ["Hepatitis", "Treatment", "East Africa"],
      image: "/publication/istockphoto-2181115231-2048x2048.jpg"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Medical Journal Background Pattern */}
      <div className="absolute inset-0 opacity-[0.01]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2340e0d0' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px'
      }} />

      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon icon={FaDna} delay={0} duration={8} x="10%" y="20%" />
        <FloatingIcon icon={GiDna2} delay={1} duration={7} x="80%" y="30%" />
        <FloatingIcon icon={FaMicroscope} delay={2} duration={9} x="20%" y="70%" />
        <FloatingIcon icon={GiMedicalDrip} delay={3} duration={6} x="70%" y="80%" />
        <FloatingIcon icon={GiMedicines} delay={4} duration={8} x="90%" y="40%" />
        <FloatingIcon icon={GiStomach} delay={5} duration={7} x="30%" y="60%" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Journal-Style Header */}
        <motion.div 
          className="text-center mb-20 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="relative inline-block mb-8">
            <h2 className="relative font-merriweather text-6xl md:text-7xl font-bold text-[#003366]">
              Medical Journal
            </h2>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#0f5a5e]/20" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-merriweather italic">
            Volume 24 • Issue 3 • March 2024
          </p>
        </motion.div>

        {/* Featured Image */}
        <motion.div 
          className="relative w-full mb-16 overflow-hidden -lg shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-[21/9] w-full">
            <Image
              src="/publication/ambitious-and-ready-to-prove-it-2024-05-14-00-48-15-utc.jpg"
              alt="Featured medical publication"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 via-[#003366]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <div className="max-w-3xl">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold text-white mb-4">
                  Advancing Gastroenterology in Kenya
                </h3>
                <p className="text-white/90 text-base sm:text-lg font-merriweather">
                  Leading the way in digestive health research and clinical excellence
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Journal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
          {publications.map((pub, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Paper Texture Background */}
              <div className="absolute inset-0 bg-white shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300" 
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2340e0d0' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative bg-white overflow-hidden border border-gray-100 shadow-lg group-hover:border-[#0f5a5e]/10 transition-colors duration-300">
                {/* Journal Header */}
                <div className="px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-4 py-1.5 bg-[#0f5a5e]/3 text-[#003366] text-sm font-medium">
                      {pub.category}
                    </span>
                    <span className="flex items-center gap-2 text-gray-500 text-sm">
                      <FaRegCalendarAlt className="text-[#0f5a5e]/50" />
                      {pub.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-merriweather font-bold text-[#003366] mb-3">
                    {pub.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FaRegUser className="text-[#0f5a5e]/50" />
                      <span>{pub.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRegClock className="text-[#0f5a5e]/50" />
                      <span>{pub.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Journal Content */}
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <Image
                      src={pub.image}
                      alt={pub.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[#003366]/60" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="text-white mb-4 line-clamp-2 font-merriweather">
                      <FaQuoteRight className="float-left mr-4 text-3xl text-[#0f5a5e]/20" />
                      {pub.preview}
                    </div>
                  </div>
                </div>

                {/* Journal Footer */}
                <div className="p-8 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pub.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-[#0f5a5e]/3 text-[#003366] text-sm font-merriweather hover:bg-[#0f5a5e]/5 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <motion.button 
                    className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#003366] text-white hover:bg-[#003366]/90 transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    Read Full Article
                    <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Journal-Style Footer */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[#003366] text-white text-lg font-merriweather hover:bg-[#003366]/90 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative z-10">Browse Complete Journal Archive</span>
            <ArrowRightIcon className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications; 