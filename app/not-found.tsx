'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { GiStomach, GiDna2 } from 'react-icons/gi';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#003366] to-[#002244] relative overflow-hidden flex items-center justify-center">
      {/* Floating Medical Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white"
              style={{
                left: `${(i % 4) * 25}%`,
                top: `${Math.floor(i / 4) * 30}%`,
                fontSize: '24px'
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {i % 2 === 0 ? <GiStomach size={32} /> : <GiDna2 size={32} />}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* 404 Text */}
          <h1 className="text-8xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent font-serif">
            404
          </h1>
          
          {/* Title */}
          <h2 className="text-3xl font-serif font-bold text-white">
            Page Not Found
          </h2>
          
          {/* Description */}
          <p className="text-lg text-emerald-100/80 max-w-md mx-auto font-serif">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Please check the URL or navigate back to the homepage.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#003366]  font-serif font-semibold hover:bg-emerald-50 transition-colors group"
            >
              Return Home
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#003366] border border-white/20 text-white  font-serif font-semibold hover:bg-[#004488] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>

        {/* Medical Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 35c5.5 0 10-4.5 10-10s-4.5-10-10-10S5 19.5 5 25s4.5 10 10 10zm30 0c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10zM30 50c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }} />
      </div>
    </div>
  );
} 