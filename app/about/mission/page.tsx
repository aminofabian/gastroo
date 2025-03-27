'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const values = [
  {
    title: "Excellence in Patient Care",
    description: "Providing high-quality and evidence-based medical care to patients with gastrointestinal diseases.",
    icon: "🏥"
  },
  {
    title: "Professional Development",
    description: "Advancing the knowledge and skills of healthcare providers in the field of gastroenterology through education, training, and research.",
    icon: "📚"
  },
  {
    title: "Collaboration",
    description: "Encouraging teamwork among healthcare professionals and stakeholders to improve patient outcomes.",
    icon: "🤝"
  },
  {
    title: "Ethical Standards",
    description: "Upholding the highest standards of ethics, professionalism, and integrity in practice and research.",
    icon: "⚖️"
  },
  {
    title: "Access to Care",
    description: "Promoting equitable access to gastroenterological services and advancing public health regarding gastrointestinal diseases.",
    icon: "🌍"
  }
];

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/banner/group-of-african-doctors-2023-11-27-05-21-29-utc.jpg"
          alt="Medical professionals collaborating"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission &amp; Vision</h1>
            <p className="text-xl md:text-2xl">
              Advancing gastroenterology care in Kenya through excellence, education, and innovation
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white GSK shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-[#003366] mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            The mission of the Gastroenterology Society of Kenya is to advance the practice of 
            gastroenterology through education, research, and the dissemination of knowledge. 
            It aims to improve the prevention, diagnosis, treatment, and management of 
            gastrointestinal diseases in Kenya, enhance the skills of healthcare professionals, 
            and raise awareness about digestive health issues in the community.
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white GSK shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-[#003366] mb-6">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            The vision of the Gastroenterology Society of Kenya is to be a leading force in 
            improving gastrointestinal health in Kenya, ensuring that individuals have access 
            to high-quality, comprehensive care for gastrointestinal disorders. The society 
            envisions a future where gastroenterology is a well-established, highly specialized 
            field, with robust infrastructure, education, and research contributing to better 
            health outcomes for the Kenyan population.
          </p>
        </motion.div>

        {/* Values Section */}
        <div>
          <h2 className="text-3xl font-bold text-[#003366] mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white GSK shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-bold text-[#003366] mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-[#003366] mb-6">Join Us in Our Mission</h2>
          <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
            Together, we can improve gastrointestinal healthcare in Kenya and make a lasting 
            impact on our community&apos;s health and well-being.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/membership"
              className="bg-[#003366] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#002244] transition-colors"
            >
              Become a Member
            </a>
            <a
              href="/volunteer"
              className="bg-white text-[#003366] border-2 border-[#003366] px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors"
            >
              Volunteer With Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 