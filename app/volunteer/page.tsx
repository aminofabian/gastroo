'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const volunteerRoles = [
  {
    title: 'Medical Education',
    icon: '👨‍⚕️',
    description: 'Share your expertise by teaching and mentoring medical students and professionals',
    responsibilities: [
      'Conduct training sessions',
      'Develop educational materials',
      'Mentor junior professionals',
      'Facilitate workshops'
    ]
  },
  {
    title: 'Community Outreach',
    icon: '🏥',
    description: 'Help organize and conduct health awareness programs in communities',
    responsibilities: [
      'Organize health camps',
      'Conduct awareness sessions',
      'Support screening programs',
      'Community engagement'
    ]
  },
  {
    title: 'Research Support',
    icon: '🔬',
    description: 'Assist in medical research projects and data collection',
    responsibilities: [
      'Data collection and analysis',
      'Literature review',
      'Research coordination',
      'Documentation support'
    ]
  },
  {
    title: 'Event Organization',
    icon: '📅',
    description: 'Help plan and execute medical conferences and workshops',
    responsibilities: [
      'Event planning',
      'Coordinate with speakers',
      'Manage registrations',
      'On-site support'
    ]
  }
];

const benefits = [
  {
    title: 'Professional Growth',
    description: 'Gain valuable experience and enhance your medical career',
    icon: '📈'
  },
  {
    title: 'Networking',
    description: 'Connect with leading gastroenterology professionals',
    icon: '🤝'
  },
  {
    title: 'Recognition',
    description: 'Get certified recognition for your volunteer work',
    icon: '🏆'
  },
  {
    title: 'Learning',
    description: 'Access to workshops, training sessions, and resources',
    icon: '📚'
  }
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    specialization: '',
    role: '',
    experience: '',
    motivation: '',
    availability: 'part-time'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: Implement form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/banner/group-of-african-doctors-2023-11-27-05-21-29-utc.jpg"
          alt="Medical professionals working together"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Mission</h1>
            <p className="text-xl md:text-2xl mb-8">
              Make a difference in Kenya&apos;s healthcare by volunteering with the Gastroenterology Society
            </p>
            <a
              href="#apply"
              className="inline-block bg-white text-[#003366] px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all"
            >
              Volunteer Now
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Volunteer Roles */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Volunteer Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {volunteerRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white GSK p-6 shadow-md hover:shadow-lg transition-all"
              >
                <span className="text-4xl mb-4 block">{role.icon}</span>
                <h3 className="text-xl font-bold mb-3">{role.title}</h3>
                <p className="text-gray-600 mb-4">{role.description}</p>
                <ul className="space-y-2">
                  {role.responsibilities.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#003366] rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Volunteer With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white GSK p-6 shadow-md text-center"
              >
                <span className="text-4xl mb-4 block">{benefit.icon}</span>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div id="apply" className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white GSK shadow-md p-8"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Volunteer Application</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profession
                  </label>
                  <input
                    type="text"
                    name="profession"
                    required
                    value={formData.profession}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization (if any)
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Volunteer Role
                </label>
                <select
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                >
                  <option value="">Select a role</option>
                  {volunteerRoles.map((role, index) => (
                    <option key={index} value={role.title.toLowerCase()}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                  placeholder="Please describe your relevant experience..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivation to Volunteer
                </label>
                <textarea
                  name="motivation"
                  required
                  value={formData.motivation}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                  placeholder="Why do you want to volunteer with GSK?"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  name="availability"
                  required
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                >
                  <option value="part-time">Part-time</option>
                  <option value="full-time">Full-time</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-md text-white font-semibold transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#003366] hover:bg-[#002244]'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-green-600 text-center">
                    Thank you for your interest! We&alsquo;ll review your application and get back to you soon.
                  </p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-600 text-center">
                    Failed to submit application. Please try GSKin.
                  </p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 