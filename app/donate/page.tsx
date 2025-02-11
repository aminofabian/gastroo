'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const donationOptions = [
  { amount: 1000, label: 'KES 1,000', impact: 'Provides educational materials for one healthcare worker' },
  { amount: 5000, label: 'KES 5,000', impact: 'Supports one day of community outreach programs' },
  { amount: 10000, label: 'KES 10,000', impact: 'Funds medical equipment for rural clinics' },
  { amount: 50000, label: 'KES 50,000', impact: 'Sponsors a full training program for medical staff' },
];

const impactMetrics = [
  {
    metric: '1000+',
    label: 'Healthcare Workers Trained',
    description: 'Continuous education and skill development for medical professionals'
  },
  {
    metric: '50+',
    label: 'Rural Clinics Supported',
    description: 'Providing essential medical equipment and resources'
  },
  {
    metric: '10,000+',
    label: 'Patients Reached',
    description: 'Direct impact on community health and well-being'
  }
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonate = async () => {
    setIsProcessing(true);
    // TODO: Integrate with payment gateway
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src="/banner/group-of-african-doctors-2023-11-27-05-21-29-utc.jpg"
          alt="Medical professionals working together"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Our Mission</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto px-4">
              Help us advance digestive healthcare across Kenya through education, research, and community outreach
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {impactMetrics.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white GSK p-6 shadow-md text-center"
            >
              <h3 className="text-3xl font-bold text-[#003366] mb-2">{item.metric}</h3>
              <h4 className="text-xl font-semibold mb-2">{item.label}</h4>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Donation Options */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {donationOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedAmount(option.amount);
                  setCustomAmount('');
                }}
                className={`p-6 GSK border-2 transition-all ${
                  selectedAmount === option.amount
                    ? 'border-[#003366] bg-[#003366] text-white'
                    : 'border-gray-200 hover:border-[#003366]'
                }`}
              >
                <div className="text-xl font-bold mb-2">{option.label}</div>
                <div className={`text-sm ${
                  selectedAmount === option.amount ? 'text-white/90' : 'text-gray-600'
                }`}>{option.impact}</div>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter custom amount (KES)
            </label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#003366] focus:border-[#003366]"
              placeholder="Enter amount"
            />
          </div>

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            disabled={isProcessing || (!selectedAmount && !customAmount)}
            className={`w-full py-4 px-6 rounded-md text-white font-semibold text-lg transition-all ${
              isProcessing || (!selectedAmount && !customAmount)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#003366] hover:bg-[#002244]'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Donate Now'}
          </button>

          {/* Security Notice */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>🔒 Secure payment processing</p>
            <p className="mt-2">
              Your donation will support GSK&apos;s mission to advance digestive healthcare in Kenya.
              All donations are tax-deductible.
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white GSK p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-4">How Your Donation Helps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Education &amp; Training</h3>
              <p className="text-gray-600">
                Your support helps us provide continuous medical education and training for healthcare
                professionals across Kenya, ensuring they&apos;re updated with the latest developments
                in gastroenterology.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Community Outreach</h3>
              <p className="text-gray-600">
                We organize regular community health programs, screening camps, and awareness
                campaigns to improve digestive health awareness and early detection of
                gastrointestinal conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 