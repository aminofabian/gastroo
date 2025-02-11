'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const supportCategories = [
  { 
    id: 'technical', 
    label: 'Technical Support',
    icon: '🔧',
    description: 'Get help with website access, member portal issues, or technical difficulties'
  },
  { 
    id: 'membership', 
    label: 'Membership Services',
    icon: '👥',
    description: 'Questions about membership benefits, renewal, or application status'
  },
  { 
    id: 'events', 
    label: 'Events &amp; Training',
    icon: '📅',
    description: 'Information about upcoming events, workshops, and training sessions'
  },
  { 
    id: 'resources', 
    label: 'Medical Resources',
    icon: '📚',
    description: 'Access to medical guidelines, research papers, and educational materials'
  }
];

const faqs = [
  {
    question: 'How do I become a member?',
    answer: 'To become a member, submit an application through our membership portal. You&apos;ll need to provide your medical credentials and professional references.'
  },
  {
    question: 'When are the annual conferences?',
    answer: 'Our main conference is held every September in Nairobi. Regional workshops are conducted quarterly throughout the year.'
  },
  {
    question: 'How can I access research materials?',
    answer: 'Members can access our digital library through the member portal. Contact us if you need help with access.'
  }
];

const contactInfo = [
  {
    icon: '📍',
    title: 'Office Location',
    details: ['2nd Floor, ACS Plaza', 'Lenana Road, Kilimani', 'Nairobi, Kenya']
  },
  {
    icon: '📞',
    title: 'Phone Number',
    details: ['+254 704 373 746']
  },
  {
    icon: '✉️',
    title: 'Email',
    details: ['secretarygsk@gmail.com']
  },
  {
    icon: '⏰',
    title: 'Office Hours',
    details: ['Monday - Friday: 8:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 1:00 PM']
  }
];

export default function HelpDeskPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: '',
    priority: 'normal',
    ticketType: 'support'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showFaqs, setShowFaqs] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: Implement ticket submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setShowFaqs(true);
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
      <div className="relative h-[200px] w-full overflow-hidden bg-[#003366]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366] to-[#002244]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Help &amp; Support</h1>
            <p className="text-lg md:text-xl">How can we assist you today?</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {supportCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setFormData(prev => ({ ...prev, category: category.id }));
                setShowFaqs(false);
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 GSK text-left transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#003366] text-white shadow-lg scale-105'
                  : 'bg-white hover:bg-gray-50 shadow-md'
              }`}
            >
              <span className="text-3xl mb-3 block">{category.icon}</span>
              <h3 className="text-lg font-semibold mb-2">{category.label}</h3>
              <p className={`text-sm ${
                selectedCategory === category.id ? 'text-white/90' : 'text-gray-600'
              }`}>{category.description}</p>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ticket Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white GSK shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Submit a Support Ticket</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
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
                      Priority Level
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                    >
                      <option value="low">Low Priority</option>
                      <option value="normal">Normal Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ticket Type
                    </label>
                    <select
                      name="ticketType"
                      value={formData.ticketType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                    >
                      <option value="support">Technical Support</option>
                      <option value="inquiry">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
                    placeholder="Please provide as much detail as possible"
                  ></textarea>
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
                  {isSubmitting ? 'Submitting Ticket...' : 'Submit Support Ticket'}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <p className="text-green-600 text-center">
                      Your support ticket has been submitted successfully! We&apos;ll respond within 24 hours.
                    </p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-600 text-center">
                      Failed to submit ticket. Please try GSKin or contact us directly.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white GSK shadow-md p-6"
            >
              <h2 className="text-2xl font-bold mb-6">Support Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            {showFaqs && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white GSK shadow-md p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white GSK shadow-md p-6"
            >
              <h2 className="text-2xl font-bold mb-6">Our Location</h2>
              <div className="relative h-[300px] w-full GSK overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8177!2d36.7855!3d-1.2923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d62d4fccdd%3A0x71471f13cf792996!2sACS%20Plaza%2C%20Lenana%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1647856732345!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 