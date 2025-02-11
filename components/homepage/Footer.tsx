'use client';

import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="relative bg-[#001a35] text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Brief Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Logo variant="light" />
            <p className="mt-6 text-base text-white/90">
              Advancing digestive healthcare through education, research, and clinical excellence.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-base font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-base text-white/90">
              {["Who We Are", "Membership", "Education", "Guidelines"].map((link) => (
                <motion.li key={link} whileHover={{ x: 2 }}>
                  <Link href="#" className="hover:text-white flex items-center gap-2">
                    <FaChevronRight className="text-xs" />
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-base font-bold mb-6">Resources</h3>
            <ul className="space-y-3 text-base text-white/90">
              {["Publications", "Meetings", "Training", "Research"].map((link) => (
                <motion.li key={link} whileHover={{ x: 2 }}>
                  <Link href="#" className="hover:text-white flex items-center gap-2">
                    <FaChevronRight className="text-xs" />
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-base font-bold mb-6">Contact Us</h3>
            <div className="space-y-3 text-base text-white/90">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-white/70" />
                2nd floor of ACS Plaza, Lenana road, Kilimani Nairobi.
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-white/70" />
                (254) 704 373 746              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-white/70" />
                secretatygsk@gmail.com              </p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-white/70">
          © {new Date().getFullYear()} Gastroenterology Society of Kenya. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 