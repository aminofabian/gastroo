'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="relative pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#003366] mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Introduction</h2>
            <p>
              The Gastroenterology Society of Kenya (GSK) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or participate in our programs.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect via the website includes:
            </p>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">Personal Data</h3>
            <p>
              Personally identifiable information, such as your name, email address, telephone number, and demographic information that you voluntarily give to us when you register with the website or when you choose to participate in various activities related to the website. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the website.
            </p>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">Derivative Data</h3>
            <p>
              Information our servers automatically collect when you access the website, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.
            </p>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">Financial Data</h3>
            <p>
              Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the website. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Create and manage your account.</li>
              <li>Process membership applications and payments.</li>
              <li>Email you regarding your account or membership.</li>
              <li>Fulfill and manage event registrations and attendance.</li>
              <li>Send you a newsletter or other communications.</li>
              <li>Respond to your inquiries and provide customer service.</li>
              <li>Administer promotions, surveys, and contests.</li>
              <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
              <li>Deliver targeted advertising, newsletters, and other information regarding promotions and the website to you.</li>
              <li>Increase the efficiency and operation of the website.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the website.</li>
              <li>Notify you of updates to the website.</li>
              <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">By Law or to Protect Rights</h3>
            <p>
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </p>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">Third-Party Service Providers</h3>
            <p>
              We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </p>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">Marketing Communications</h3>
            <p>
              With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4">
              <p><strong>Gastroenterology Society of Kenya</strong></p>
              <p>2nd floor of ACS Plaza, Lenana road, Kilimani Nairobi</p>
              <p>Email: secretatygsk@gmail.com</p>
              <p>Phone: (254) 704 373 746</p>
            </div>
          </section>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link 
            href="/"
            className="inline-block bg-[#003366] text-white px-8 py-3 rounded-md hover:bg-[#004488] transition-colors duration-300 shadow-lg"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
