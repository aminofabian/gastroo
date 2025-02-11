import React from 'react';
import Image from 'next/image';

const AboutGSK = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Top Image */}
            <div className="relative h-[400px]  overflow-hidden">
              <Image
                src="/images/leaders/ambitious-and-ready-to-prove-it-2024-05-14-00-48-15-utc.jpg"
                alt="GSK Leadership"
                fill
                className="object-cover"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-3 GSK">
                <span className="text-4xl font-bold text-[#003366]">500+</span>
                <p className="text-[#003366]/80 font-medium">Active Members</p>
              </div>
            </div>
            
            {/* Bottom Images Grid */}
            <div className="grid grid-cols-2 gap-8">
              <div className="relative h-[280px]  overflow-hidden">
                <Image
                  src="/images/leaders/architect-and-engineer-work-together-and-shaking-h-2023-11-27-05-00-25-utc.jpg"
                  alt="GSK Collaboration"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[280px]  overflow-hidden">
                <Image
                  src="/images/leaders/doctors-preparing-to-work-in-hospital-during-coron-2023-11-27-05-01-47-utc.jpg"
                  alt="GSK Healthcare"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Text Content */}
            <div className="bg-white p-8  border border-gray-100 shadow-sm">
              <h2 className="text-3xl font-merriweather font-bold text-[#003366] mb-4">
                Leading Gastroenterology Excellence in Kenya
              </h2>
              <p className="text-gray-600 mb-6">
                We provide comprehensive support for gastroenterology professionals, ensuring the highest standards of practice and continuous development.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional Development Programs
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Research & Innovation Support
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Quality Healthcare Standards
                </li>
              </ul>
              <a 
                href="/about"
                className="inline-flex items-center justify-center w-full px-6 py-3 mt-8 text-white bg-[#003366] GSK hover:bg-[#003366]/90 transition-colors duration-200"
              >
                Learn More About GSK
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Additional Images */}
            <div className="relative h-[200px]  overflow-hidden">
              <Image
                src="/images/leaders/exhausted-surgeons-at-the-emergency-room-as-a-sign-2023-11-27-05-19-44-utc.jpg"
                alt="GSK Surgeons"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[200px]  overflow-hidden">
              <Image
                src="/images/leaders/im-determined-to-make-my-mark-2024-05-14-01-51-21-utc.jpg"
                alt="GSK Leadership"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGSK; 