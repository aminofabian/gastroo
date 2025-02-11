"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaMicroscope, FaFlask, FaDna, FaBrain, FaHospital, FaCalendarAlt, FaUserMd, FaExternalLinkAlt } from 'react-icons/fa';

// Sample research data - in a real app, this would come from an API
const researchItems = [
  {
    id: 1,
    title: 'Clinical Trial: Novel Treatment for Type 2 Diabetes',
    description: 'Investigating the efficacy of a new therapeutic approach for managing Type 2 Diabetes',
    type: 'Clinical Trial',
    status: 'Recruiting',
    category: 'Endocrinology',
    deadline: '2024-08-30',
    institution: 'GSK Research Center',
    principalInvestigator: 'Dr. Robert Chen',
    icon: FaFlask,
  },
  {
    id: 2,
    title: 'Research Publication: Advances in Neurological Disorders',
    description: 'Recent findings in the treatment of neurodegenerative diseases',
    type: 'Publication',
    status: 'Published',
    category: 'Neurology',
    publishDate: '2024-02-15',
    journal: 'Medical Science Journal',
    authors: 'Smith J., Johnson M., et al.',
    icon: FaBrain,
  },
  {
    id: 3,
    title: 'Research Grant: Cardiovascular Disease Prevention',
    description: 'Funding opportunity for innovative research in cardiovascular disease prevention strategies',
    type: 'Grant',
    status: 'Open',
    category: 'Cardiology',
    deadline: '2024-06-15',
    fundingAmount: '$500,000',
    duration: '2 years',
    icon: FaHospital,
  },
  {
    id: 4,
    title: 'Genomic Study: Cancer Biomarkers',
    description: 'Investigation of novel biomarkers for early cancer detection',
    type: 'Study',
    status: 'Ongoing',
    category: 'Oncology',
    startDate: '2024-01-01',
    institution: 'GSK Genomics Lab',
    collaborators: '3 institutions',
    icon: FaDna,
  },
];

export default function ResearchList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const types = ['All Types', ...Array.from(new Set(researchItems.map(item => item.type)))];
  const categories = ['All Categories', ...Array.from(new Set(researchItems.map(item => item.category)))];

  const filteredItems = researchItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All Types' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recruiting':
        return 'bg-green-100 text-green-800';
      case 'Published':
        return 'bg-emerald-100 text-emerald-800';
      case 'Open':
        return 'bg-purple-100 text-purple-800';
      case 'Ongoing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search research..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Research Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Link href={`/dashboard/research/${item.id}`} key={item.id}>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <item.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <FaExternalLinkAlt className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaMicroscope className="w-4 h-4" />
                      <span>{item.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaHospital className="w-4 h-4" />
                      <span>{item.category}</span>
                    </div>
                    {item.deadline && (
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>Deadline: {new Date(item.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                    {item.principalInvestigator && (
                      <div className="flex items-center gap-1">
                        <FaUserMd className="w-4 h-4" />
                        <span>{item.principalInvestigator}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No research items found matching your criteria</p>
        </div>
      )}
    </div>
  );
} 