"use client";

import React from 'react';

const CPDPage = () => {
  const cpdCategories = [
    {
      title: "Scientific Meetings & Conferences",
      points: "Up to 20 points per event",
      description: "Attendance and participation in GSK-accredited conferences, symposiums, and scientific meetings.",
      examples: [
        "Annual GSK Conference (20 points)",
        "Regional Gastroenterology Workshops (10 points)",
        "International Conferences (15-20 points)"
      ]
    },
    {
      title: "Publications & Research",
      points: "10-15 points per publication",
      description: "Contributing to scientific knowledge through research and publications in peer-reviewed journals.",
      examples: [
        "First Author Publication (15 points)",
        "Co-author Publication (10 points)",
        "Case Study Publication (8 points)"
      ]
    },
    {
      title: "Teaching & Presentations",
      points: "5-10 points per activity",
      description: "Sharing knowledge through teaching activities and presentations at medical institutions.",
      examples: [
        "Guest Lecturer (10 points)",
        "Workshop Facilitator (8 points)",
        "Clinical Teaching (5 points per session)"
      ]
    },
    {
      title: "Online Learning",
      points: "1-5 points per module",
      description: "Completion of accredited online courses and e-learning modules.",
      examples: [
        "GSK E-learning Modules (2 points each)",
        "Webinar Participation (3 points)",
        "Online Case Reviews (1 point each)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-[#003366] text-white py-20">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-merriweather font-bold mb-6">
              Continuing Professional Development Points
            </h1>
            <p className="text-xl font-merriweather text-white/90 leading-relaxed">
              Track your professional growth and maintain your medical license through GSK&apos;s accredited CPD program.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction Section */}
        <div className="mb-16">
          <div className="bg-white  p-8 shadow-xl">
            <h2 className="text-2xl font-merriweather font-bold text-[#003366] mb-6">
              Understanding CPD Points
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="font-merriweather text-gray-600 mb-4">
                Continuing Professional Development (CPD) points are a measure of ongoing education and professional growth in the medical field. For gastroenterologists in Kenya, maintaining current CPD points is essential for license renewal and ensuring up-to-date knowledge of medical practices.
              </p>
              <p className="font-merriweather text-gray-600 mb-4">
                The Kenya Medical Practitioners and Dentists Council (KMPDC) requires all practicing doctors to accumulate a minimum of 50 CPD points annually to maintain their medical license.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {cpdCategories.map((category, index) => (
            <div key={index} className="bg-white  p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-merriweather font-bold text-[#003366] mb-4">
                {category.title}
              </h3>
              <div className="mb-4">
                <span className="inline-block bg-emerald-100 text-emerald-800 font-merriweather text-sm px-3 py-1 ">
                  {category.points}
                </span>
              </div>
              <p className="font-merriweather text-gray-600 mb-4">
                {category.description}
              </p>
              <ul className="space-y-2">
                {category.examples.map((example, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-merriweather text-gray-600">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Why CPD Points Matter */}
        <div className="bg-gradient-to-br from-[#003366] to-[#002244]  p-8 text-white mb-16">
          <h2 className="text-2xl font-merriweather font-bold mb-6">
            Why CPD Points Matter
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-white/10  p-6">
                <h3 className="font-merriweather font-semibold text-lg mb-3">Professional Growth</h3>
                <p className="font-merriweather text-white/80">
                  Stay current with the latest medical advancements and best practices in gastroenterology.
                </p>
              </div>
            </div>
            <div>
              <div className="bg-white/10  p-6">
                <h3 className="font-merriweather font-semibold text-lg mb-3">License Renewal</h3>
                <p className="font-merriweather text-white/80">
                  Meet regulatory requirements for maintaining your medical practice license in Kenya.
                </p>
              </div>
            </div>
            <div>
              <div className="bg-white/10  p-6">
                <h3 className="font-merriweather font-semibold text-lg mb-3">Quality Care</h3>
                <p className="font-merriweather text-white/80">
                  Ensure you provide the highest standard of care to your patients through continuous learning.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Track Points */}
        <div className="bg-white  p-8 shadow-xl">
          <h2 className="text-2xl font-merriweather font-bold text-[#003366] mb-6">
            How to Track Your CPD Points
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="font-merriweather text-gray-600 mb-4">
              GSK members can track their CPD points through our online portal. Points are automatically updated for GSK-accredited events and can be manually added for external activities after verification.
            </p>
            <div className="flex justify-center mt-8">
              <a 
                href="/dashboard/cpd"
                className="inline-flex items-center px-6 py-3 bg-[#003366] text-white  font-merriweather font-semibold hover:bg-[#002244] transition-colors"
              >
                Track Your Points
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPDPage; 