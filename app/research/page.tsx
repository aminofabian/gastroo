'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Hero Section Component
const ResearchHero = () => {
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
    <div className="relative h-screen min-h-[600px] bg-[#c22f61]">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentImage === index ? 'opacity-30' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`GSK Research Banner ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#c22f61]/80 to-[#c22f61]/95" />
      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            Research & Publications
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-serif leading-relaxed">
            Advancing gastroenterology knowledge through innovative research, collaborative studies, and evidence-based publications to improve digestive health care in Kenya and beyond.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Research Areas Section
const ResearchAreas = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-serif font-bold text-[#c22f61] text-center mb-16"
      >
        Our Research Focus Areas
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Digestive Diseases in Africa",
            description: "Studying the unique patterns, prevalence, and management of digestive diseases in the African context.",
            icon: "🔬"
          },
          {
            title: "Hepatology Research",
            description: "Investigating liver diseases, viral hepatitis, and innovative treatment approaches for liver conditions.",
            icon: "🧬"
          },
          {
            title: "Gastrointestinal Cancer",
            description: "Researching early detection, prevention strategies, and treatment outcomes for GI cancers in Kenya.",
            icon: "🔍"
          },
          {
            title: "Inflammatory Bowel Disease",
            description: "Exploring the epidemiology, diagnosis, and management of IBD in the Kenyan population.",
            icon: "🦠"
          },
          {
            title: "Nutrition & Digestive Health",
            description: "Examining the relationship between nutrition, diet, and gastrointestinal disorders.",
            icon: "🥗"
          },
          {
            title: "Endoscopy Innovations",
            description: "Developing and evaluating new endoscopic techniques and technologies for improved diagnosis and treatment.",
            icon: "🔧"
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#c22f61]"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Publications Section
const Publications = () => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-serif font-bold text-[#c22f61] mb-4">
          Recent Publications
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our members contribute to the global body of gastroenterology knowledge through peer-reviewed publications, research papers, and clinical studies.
        </p>
      </motion.div>
      
      <div className="space-y-8">
        {[
          {
            title: "Prevalence and Risk Factors of Helicobacter pylori Infection in Kenya: A Cross-Sectional Study",
            authors: "Kimani J, Ogutu E, Wangari M, et al.",
            journal: "East African Medical Journal",
            year: "2023",
            link: "#"
          },
          {
            title: "Endoscopic Management of Gastrointestinal Bleeding: A Retrospective Analysis of Cases in Nairobi",
            authors: "Omondi L, Njoroge P, Kamau W, et al.",
            journal: "World Journal of Gastroenterology",
            year: "2022",
            link: "#"
          },
          {
            title: "Hepatitis B Vaccination Coverage Among Healthcare Workers in Kenyan Hospitals",
            authors: "Mwangi A, Githinji G, Wanjiku C, et al.",
            journal: "Journal of Viral Hepatitis",
            year: "2022",
            link: "#"
          },
          {
            title: "Colorectal Cancer Screening Practices in Kenya: Challenges and Opportunities",
            authors: "Ndegwa S, Kariuki P, Otieno F, et al.",
            journal: "African Journal of Cancer",
            year: "2021",
            link: "#"
          }
        ].map((pub, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
              {pub.title}
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Authors:</span> {pub.authors}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">{pub.journal}</span>, {pub.year}
            </p>
            <Link href={pub.link} className="text-[#c22f61] hover:text-[#004488] transition-colors duration-300 font-medium">
              Read Publication →
            </Link>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <Link href="#" className="inline-block bg-[#c22f61] text-white px-8 py-3 rounded-md hover:bg-[#004488] transition-colors duration-300 shadow-lg">
          View All Publications
        </Link>
      </motion.div>
    </div>
  </section>
);

// Research Opportunities Section
const ResearchOpportunities = () => (
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
          <div className="relative h-[600px] overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/meeting/75B_6055.jpg"
              alt="Research Collaboration"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#c22f61]/30 to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#c22f61]/10">
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
          <h2 className="text-4xl font-serif font-bold text-[#c22f61] mb-8">
            Research Opportunities
          </h2>
          <p className="text-gray-600 text-lg mb-6 font-serif leading-relaxed">
            GSK offers various research opportunities for gastroenterologists, fellows, residents, and medical students interested in advancing digestive health knowledge.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              "Research grants and funding opportunities",
              "Collaborative research projects with international partners",
              "Mentorship programs for early-career researchers",
              "Access to research facilities and resources",
              "Opportunities to present at national and international conferences"
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <span className="text-[#c22f61] mr-2">✓</span>
                <span className="text-gray-600">{item}</span>
              </motion.li>
            ))}
          </ul>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#c22f61] text-white px-8 py-3 rounded-md hover:bg-[#004488] transition-colors duration-300 shadow-lg"
          >
            Apply for Research Opportunities
          </motion.button>
        </motion.div>
      </div>
    </div>
  </section>
);

// Call to Action Section
const CallToAction = () => (
  <section className="py-24 bg-[#c22f61]">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-serif font-bold text-white mb-6">
          Contribute to Gastroenterology Research
        </h2>
        <p className="text-white/90 text-lg mb-8 font-serif leading-relaxed">
          Join our research community and help advance the field of gastroenterology in Kenya. Whether you're a seasoned researcher or just starting your career, there's a place for you in our collaborative network.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#c22f61] px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-lg font-medium"
          >
            Submit Research Proposal
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent text-white border border-white px-8 py-3 rounded-md hover:bg-white/10 transition-colors duration-300 shadow-lg font-medium"
          >
            Join Research Network
          </motion.button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default function ResearchPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <ResearchHero />
      
      {/* Research Areas Section */}
      <ResearchAreas />
      
      {/* Publications Section */}
      <Publications />
      
      {/* Research Opportunities Section */}
      <ResearchOpportunities />
      
      {/* Call to Action Section */}
      <CallToAction />
    </main>
  );
}
