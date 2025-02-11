"use client"

import React from 'react';
import { FaUsers, FaBook, FaFlask, FaStar, FaDollarSign } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { motion } from 'framer-motion';

const MembershipFeatures = () => {
  return (
    <section className="relative mt-40">
      {/* Modern gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-40">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-transparent" />
      </div>

      {/* Main content */}
      <div className="bg-gradient-to-b from-[#003366] to-[#002347] pt-40 pb-32 relative">
        {/* Animated background glow */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-[128px] animate-pulse delay-1000" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-merriweather font-bold mb-8">
              <span className="inline-block bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Empowering Gastroenterology
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
              Access resources, connect with peers, and advance your professional development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="h-full bg-gradient-to-br from-white/[0.05] to-transparent p-1">
                  <div className="relative h-full bg-gradient-to-br from-[#003366]/40 to-[#002347]/40 backdrop-blur-sm p-8">
                    {/* Animated highlight line */}
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-indigo-400 group-hover:w-full transition-all duration-700" />
                    
                    <div className="relative">
                      <motion.div 
                        className="text-white mb-6 relative"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="absolute inset-0 bg-emerald-500/20 filter blur-lg" />
                        {feature.icon}
                      </motion.div>
                      
                      <h3 className="text-2xl font-merriweather text-white mb-4 font-semibold group-hover:text-emerald-200 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-white/80 mb-8 text-lg">
                        {feature.description}
                      </p>
                      <motion.a 
                        href={feature.link}
                        className="inline-flex items-center text-white group-hover:text-emerald-200 transition-all duration-300 text-lg font-medium"
                        whileHover={{ x: 5 }}
                      >
                        Learn More 
                        <motion.span 
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
};

const features = [
  {
    icon: <FaUsers className="w-12 h-12" />,
    title: "Member Directory",
    description: "Access our network of gastroenterology professionals",
    link: "/membership/directory"
  },
  {
    icon: <HiDocumentText className="w-12 h-12" />,
    title: "Certification",
    description: "Professional certification and accreditation",
    link: "/education/certification"
  },
  {
    icon: <FaBook className="w-12 h-12" />,
    title: "Clinical Guidelines",
    description: "Latest gastroenterology practice guidelines",
    link: "/guidelines"
  },
  {
    icon: <FaFlask className="w-12 h-12" />,
    title: "Research Access",
    description: "Member-exclusive research database",
    link: "/research"
  },
  {
    icon: <FaStar className="w-12 h-12" />,
    title: "CPD Points",
    description: "Track your continuing professional development",
    link: "/cpd"
  },
  {
    icon: <FaDollarSign className="w-12 h-12" />,
    title: "Join GSK",
    description: "Become a member today",
    link: "/membership/join"
  }
];

export default MembershipFeatures; 