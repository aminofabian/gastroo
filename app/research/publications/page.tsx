'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter } from 'lucide-react';

// Publication type
type Publication = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  category: string;
  abstract: string;
  link: string;
};

// Publications data
const publicationsData: Publication[] = [
  {
    id: "hpylori-infection-kenya",
    title: "Prevalence and Risk Factors of Helicobacter pylori Infection in Kenya: A Cross-Sectional Study",
    authors: "Kimani J, Ogutu E, Wangari M, Maina D, Njoroge M, Waweru W, et al.",
    journal: "East African Medical Journal",
    year: "2023",
    category: "Infectious Diseases",
    abstract: "This cross-sectional study investigated the prevalence and risk factors of Helicobacter pylori infection in various regions of Kenya. Over 1,200 participants from both urban and rural settings were included in the analysis, which identified socioeconomic factors, water sources, and household crowding as significant risk factors for H. pylori positivity.",
    link: "/research/publications/hpylori-infection-kenya"
  },
  {
    id: "gi-bleeding-nairobi",
    title: "Endoscopic Management of Gastrointestinal Bleeding: A Retrospective Analysis of Cases in Nairobi",
    authors: "Omondi L, Njoroge P, Kamau W, Otieno G, Mwangi J, Waihenya R, et al.",
    journal: "World Journal of Gastroenterology",
    year: "2022",
    category: "Endoscopy",
    abstract: "This retrospective study analyzed 450 cases of gastrointestinal bleeding managed endoscopically at three tertiary hospitals in Nairobi. The research evaluated the etiology, treatment outcomes, and factors associated with rebleeding, highlighting the effectiveness of various endoscopic techniques in the Kenyan healthcare context.",
    link: "/research/publications/gi-bleeding-nairobi"
  },
  {
    id: "hepb-vaccination-kenya",
    title: "Hepatitis B Vaccination Coverage Among Healthcare Workers in Kenyan Hospitals",
    authors: "Mwangi A, Githinji G, Wanjiku C, Nganga L, Kariuki S, et al.",
    journal: "Journal of Viral Hepatitis",
    year: "2022",
    category: "Hepatology",
    abstract: "This study assessed hepatitis B vaccination coverage among healthcare workers in 24 hospitals across Kenya. The research identified significant gaps in vaccination coverage, particularly among non-clinical staff, and explored barriers to vaccination including vaccine availability, cost, and institutional policies.",
    link: "/research/publications/hepb-vaccination-kenya"
  },
  {
    id: "colorectal-screening-kenya",
    title: "Colorectal Cancer Screening Practices in Kenya: Challenges and Opportunities",
    authors: "Ndegwa S, Kariuki P, Otieno F, Gatheru P, Miriti K, et al.",
    journal: "African Journal of Cancer",
    year: "2021",
    category: "Oncology",
    abstract: "This review examined current practices, challenges, and opportunities for colorectal cancer screening in Kenya. The study highlighted low screening rates, limited resources, and poor awareness as major barriers, while proposing culturally-appropriate strategies to increase screening uptake in the population.",
    link: "/research/publications/colorectal-screening-kenya"
  },
  {
    id: "ibd-nairobi-cohort",
    title: "Clinical Presentation and Management of Inflammatory Bowel Disease: Experience from a Nairobi Cohort",
    authors: "Gitau W, Muriithi A, Otieno Y, Mwangi N, Litu O, et al.",
    journal: "Inflammatory Bowel Diseases",
    year: "2021",
    category: "Inflammatory Bowel Disease",
    abstract: "This prospective study described the clinical presentation, diagnostic approaches, and management strategies for inflammatory bowel disease in a cohort of 85 patients in Nairobi. The research highlighted distinctive patterns of disease presentation and treatment challenges in the Kenyan context.",
    link: "/research/publications/ibd-nairobi-cohort"
  },
  {
    id: "nafld-kenya",
    title: "Prevalence of Non-Alcoholic Fatty Liver Disease in Urban Kenya and Associated Metabolic Risk Factors",
    authors: "Karanja J, Waiganjo N, Mbugua S, Odhiambo K, et al.",
    journal: "BMC Gastroenterology",
    year: "2020",
    category: "Hepatology",
    abstract: "This study investigated the prevalence of non-alcoholic fatty liver disease in an urban Kenyan population and its association with metabolic syndrome components. Using ultrasound and laboratory evaluation of 712 participants, the research identified a rising prevalence and associated risk factors in this previously understudied population.",
    link: "/research/publications/nafld-kenya"
  },
  {
    id: "barrett-esophagus-kenya",
    title: "Prevalence of Barrett's Esophagus in Patients Undergoing Upper Endoscopy in Kenya",
    authors: "Ngugi P, Mwaniki J, Njeru E, Waweru P, et al.",
    journal: "Diseases of the Esophagus",
    year: "2020",
    category: "Esophageal Disorders",
    abstract: "This prospective study determined the prevalence of Barrett's esophagus among 430 patients undergoing upper endoscopy at two referral hospitals in Kenya. The research identified prevalence, associated risk factors, and highlighted challenges in diagnosis and surveillance in resource-limited settings.",
    link: "/research/publications/barrett-esophagus-kenya"
  },
  {
    id: "ulcers-nsaids-kenya",
    title: "Peptic Ulcer Disease and NSAID Use in Kenya: A Hospital-Based Case-Control Study",
    authors: "Okoth K, Akelo V, Mulwa E, Mwaura J, et al.",
    journal: "Pan African Medical Journal",
    year: "2019",
    category: "Gastroenterology",
    abstract: "This case-control study examined the relationship between non-steroidal anti-inflammatory drug (NSAID) use and peptic ulcer disease in a Kenyan hospital setting. The research quantified risk factors and patterns of NSAID use, providing evidence for preventing NSAID-associated upper gastrointestinal complications.",
    link: "/research/publications/ulcers-nsaids-kenya"
  }
];

// Categories extracted from publications
const categories = ['All', ...Array.from(new Set(publicationsData.map(pub => pub.category)))];

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter publications based on search query and selected category
  const filteredPublications = publicationsData.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pub.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#003366] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link href="/research" className="flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Research</span>
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Publications Archive
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Explore our collection of peer-reviewed articles, research papers, and academic contributions from GSK members.
          </p>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white border-b py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-grow max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search publications by title, author, or keywords..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <select
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]/50"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Publications List */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-gray-800">
            {filteredPublications.length} Publication{filteredPublications.length !== 1 ? 's' : ''}
          </h2>
          <div className="text-gray-500">
            Sorted by year (newest first)
          </div>
        </div>
        
        <div className="space-y-8">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#003366]"
              >
                <div className="mb-1">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm inline-block mb-2">
                    {pub.category}
                  </span>
                  <span className="ml-2 text-gray-500">{pub.year}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                  {pub.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Authors:</span> {pub.authors}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">{pub.journal}</span>, {pub.year}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {pub.abstract}
                </p>
                <Link href={pub.link} className="text-[#003366] hover:text-[#004488] transition-colors duration-300 font-medium">
                  Read Full Publication →
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-lg">No publications match your search criteria.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                className="mt-4 text-[#003366] hover:text-[#004488] transition-colors duration-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 