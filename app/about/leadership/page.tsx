'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const leaders = [
  {
    name: "Dr. Eric Murunga",
    title: "Chairman",
    image: "/doctors/dr erick murunga.avif",
    specialty: "Gastroenterology",
    experience: "15+ years",
    hospital: "GSK Khan University Hospital",
    email: "chairman@gsk.or.ke",
    linkedin: "https://www.linkedin.com/in/dr-eric-murunga",
    bio: "Dr. Eric Murunga leads GSK with over 15 years of experience in gastroenterology. He has pioneered several innovative treatment approaches and is dedicated to advancing digestive healthcare in Kenya."
  },
  {
    name: "Dr. Wilson Kiraitu",
    title: "Vice Chair",
    image: "/doctors/dr wilson kiraitu.jpg",
    specialty: "Gastroenterology",
    experience: "12+ years",
    hospital: "Kenyatta National Hospital",
    email: "vicechair@gsk.or.ke",
    bio: "Dr. Wilson Kiraitu brings extensive experience in public healthcare and has been instrumental in developing GSK&apos;s community outreach programs."
  },
  {
    name: "Dr. Linda Gathara",
    title: "Secretary",
    image: "/doctors/Linda-Gathara.jpg",
    specialty: "Gastroenterology",
    experience: "10+ years",
    hospital: "Nairobi Hospital",
    email: "secretary@gsk.or.ke",
    bio: "Dr. Linda Gathara specializes in advanced endoscopic procedures and plays a key role in GSK&apos;s educational initiatives."
  },
  {
    name: "Dr. Mirriam Gatehi",
    title: "Vice Secretary",
    image: "/doctors/dr mirriam gatehi.jpg",
    specialty: "Gastroenterology",
    experience: "13+ years",
    hospital: "MP Shah Hospital",
    email: "vicesecretary@gsk.or.ke",
    bio: "Dr. Mirriam Gatehi focuses on research and development, leading several key studies in gastroenterological care."
  },
  {
    name: "Dr. Firoz Alimohammed",
    title: "Treasurer",
    image: "/doctors/dr firoz alimohammed.jpg",
    specialty: "Gastroenterology",
    experience: "14+ years",
    hospital: "Mombasa Hospital",
    email: "treasurer@gsk.or.ke",
    bio: "Dr. Firoz Alimohammed has extensive experience in both clinical practice and healthcare management, ensuring GSK&apos;s financial stability and growth."
  },
  {
    name: "Dr. Rupal Maru",
    title: "Vice - Treasurer",
    image: "/doctors/dr rupal maru.jpg",
    specialty: "Gastroenterology",
    experience: "11+ years",
    hospital: "Kisumu Specialist Hospital",
    email: "vicetreasurer@gsk.or.ke",
    bio: "Dr. Rupal Maru specializes in pediatric gastroenterology and has been vital in expanding GSK&apos;s services to younger patients."
  }
];

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden bg-[#003366]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366] to-[#002244]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Leadership</h1>
            <p className="text-xl md:text-2xl">
              Meet the dedicated team guiding GSK&apos;s mission in advancing gastroenterology care
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-6">
            Committed to Excellence in Gastroenterology
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our leadership team brings together some of Kenya&apos;s most experienced gastroenterology
            professionals. With diverse expertise and a shared vision, they work tirelessly to
            advance digestive healthcare and medical education across the country.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white GSK shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold">{leader.name}</h3>
                  <p className="text-white/90">{leader.title}</p>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">{leader.bio}</p>
                
                <div className="space-y-2">
                  {/* Specialty */}
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">{leader.specialty}</span>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">{leader.experience}</span>
                  </div>

                  {/* Hospital */}
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-gray-600">{leader.hospital}</span>
                  </div>
                </div>

                {/* Contact Links */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-start gap-4">
                    <a
                      href={`mailto:${leader.email}`}
                      className="text-[#003366] hover:text-[#002244] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                    {leader.linkedin && (
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#003366] hover:text-[#002244] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="mt-20 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-6">
            Our Vision for the Future
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Under the guidance of our leadership team, GSK continues to work towards improving
            gastroenterological care across Kenya. Through research, education, and community
            outreach, we&apos;re building a stronger healthcare system for all Kenyans.
          </p>
        </div>
      </div>
    </div>
  );
} 