"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaPlay, FaClock, FaGraduationCap, FaStethoscope, FaMicroscope, FaHeartbeat } from 'react-icons/fa';

// Sample courses data - in a real app, this would come from an API
const courses = [
  {
    id: 1,
    title: 'Advanced Clinical Assessment',
    description: 'Master the art of clinical assessment with advanced techniques and methodologies',
    duration: '6 hours',
    level: 'Advanced',
    category: 'Clinical Skills',
    cmePoints: 6,
    progress: 0,
    instructor: 'Dr. Sarah Johnson',
    icon: FaStethoscope,
    status: 'Not Started',
  },
  {
    id: 2,
    title: 'Medical Research Methodology',
    description: 'Learn the fundamentals of medical research and evidence-based practice',
    duration: '8 hours',
    level: 'Intermediate',
    category: 'Research',
    cmePoints: 8,
    progress: 75,
    instructor: 'Prof. Michael Chen',
    icon: FaMicroscope,
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Emergency Medicine Updates',
    description: 'Stay current with the latest developments in emergency medicine',
    duration: '4 hours',
    level: 'Intermediate',
    category: 'Emergency Care',
    cmePoints: 4,
    progress: 100,
    instructor: 'Dr. Emily Rodriguez',
    icon: FaHeartbeat,
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Medical Education Leadership',
    description: 'Develop leadership skills specific to medical education and training',
    duration: '10 hours',
    level: 'Advanced',
    category: 'Leadership',
    cmePoints: 10,
    progress: 30,
    instructor: 'Dr. James Wilson',
    icon: FaGraduationCap,
    status: 'In Progress',
  },
];

export default function LearningList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const categories = ['All Categories', ...Array.from(new Set(courses.map(course => course.category)))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-emerald-100 text-emerald-800';
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
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          {levels.map(level => (
            <option key={level} value={level}>{level}</option>
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

      {/* Courses Grid */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <Link href={`/dashboard/learning/${course.id}`} key={course.id}>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <course.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{course.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    {course.progress > 0 && (
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full">
                          <div 
                            className="h-1.5 bg-emerald-500 rounded-full transition-all duration-300" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <div className="flex items-center gap-1">
                        <FaClock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaGraduationCap className="w-4 h-4" />
                        <span>{course.level}</span>
                      </div>
                      <div className="ml-auto text-emerald-600 font-medium">
                        {course.cmePoints} CME Points
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found matching your criteria</p>
        </div>
      )}
    </div>
  );
} 