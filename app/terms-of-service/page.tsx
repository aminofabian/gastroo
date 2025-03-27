'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfServicePage() {
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
            Terms of Service
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
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">1. Introduction</h2>
            <p>
              Welcome to the Gastroenterology Society of Kenya ("GSK", "we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Services").
            </p>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">2. Use of Services</h2>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">2.1 Eligibility</h3>
            <p>
              To access or use our Services, you must be at least 18 years old and have the legal capacity to enter into a binding agreement with GSK. If you are accessing or using our Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
            </p>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">2.2 Account Registration</h3>
            <p>
              Some of our Services may require you to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your account credentials and for any activities or actions under your account.
            </p>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">2.3 Prohibited Activities</h3>
            <p>
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Using the Services for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Violating or infringing upon the rights of others, including their intellectual property rights</li>
              <li>Attempting to circumvent any security features of the Services</li>
              <li>Interfering with or disrupting the Services or servers or networks connected to the Services</li>
              <li>Harvesting or collecting email addresses or other contact information of other users from the Services</li>
              <li>Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">3. Membership</h2>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">3.1 Membership Eligibility</h3>
            <p>
              Membership in the Gastroenterology Society of Kenya is open to healthcare professionals with an interest in gastroenterology and digestive health, subject to meeting the specific criteria for each membership category as outlined on our website.
            </p>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">3.2 Membership Fees</h3>
            <p>
              Membership fees are set by the GSK Executive Committee and are subject to change. Current membership fees are displayed on our website. Fees are non-refundable except in exceptional circumstances at the discretion of the Executive Committee.
            </p>
            <h3 className="text-xl font-serif font-bold text-gray-700 mt-6 mb-3">3.3 Membership Termination</h3>
            <p>
              GSK reserves the right to terminate or suspend your membership at any time if you are found to be in violation of these Terms, professional ethics, or for any other reason as determined by the Executive Committee.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">4. Intellectual Property</h2>
            <p>
              The Services and their original content, features, and functionality are and will remain the exclusive property of the Gastroenterology Society of Kenya and its licensors. The Services are protected by copyright, trademark, and other laws of both Kenya and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of GSK.
            </p>
            <p>
              Materials provided through our Services, including but not limited to educational resources, guidelines, and publications, are intended for personal, non-commercial use only, unless otherwise specified.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">5. User Content</h2>
            <p>
              Our Services may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that you post to the Services, including its legality, reliability, and appropriateness.
            </p>
            <p>
              By posting User Content to the Services, you grant us the right and license to use, modify, perform, display, reproduce, and distribute such material on and through the Services. You retain any and all of your rights to any User Content you submit, post, or display on or through the Services and you are responsible for protecting those rights.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">6. Disclaimer of Warranties</h2>
            <p>
              The Services are provided on an "AS IS" and "AS AVAILABLE" basis. GSK expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p>
              GSK makes no warranty that the Services will meet your requirements, be available on an uninterrupted, timely, secure, or error-free basis, or be accurate, reliable, complete, legal, or safe.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall GSK, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">9. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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
