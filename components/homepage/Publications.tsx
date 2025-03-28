"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegCalendarAlt, FaRegClock, FaRegUser, FaChevronRight, FaDna, FaMicroscope, FaFlask, FaQuoteRight } from 'react-icons/fa';
import { GiMedicalDrip, GiMedicines, GiStomach, GiDna2 } from 'react-icons/gi';
import { IconType } from 'react-icons';
import Image from 'next/image';
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from 'next/link';

interface FloatingIconProps {
  icon: IconType;
  delay: number;
  duration: number;
  x: string;
  y: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon: Icon, delay, duration, x, y }) => (
  <motion.div
    className="absolute text-[#003366]/10 text-3xl"
    initial={{ x, y }}
    animate={{ 
      y: y,
      translateY: ["-20px", "20px"],
      rotate: [0, 360],
      scale: [1, 1.2, 1]
    }}
    transition={{ 
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Icon />
  </motion.div>
);

interface Post {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  author?: {
    node: {
      name: string;
      avatar?: {
        url: string;
      }
    }
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    }
  };
  categories?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
}

const JOURNAL_DESCRIPTION = {
  title: "GSK Medical Journal",
  subtitle: "Volume 24 • Issue 3 • March 2024",
  description: "A peer-reviewed publication dedicated to advancing gastroenterology in East Africa",
  stats: [
    { label: "Impact Factor", value: "4.2" },
    { label: "Articles", value: "1.2K+" },
    { label: "Citations", value: "15K+" },
    { label: "Countries", value: "45+" }
  ]
};

const FEATURED_ARTICLE = {
  title: "Advancing Gastroenterology in Kenya",
  subtitle: "Leading the way in digestive health research and clinical excellence",
  description: "Our latest issue explores groundbreaking research in gastroenterology, featuring studies from leading institutions across East Africa. From innovative endoscopic techniques to emerging treatments in IBD management.",
  image: "/publication/ambitious-and-ready-to-prove-it-2024-05-14-00-48-15-utc.jpg"
};

const Publications = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data.posts.nodes.slice(0, 3));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Medical Journal Background Pattern */}
      <div className="absolute inset-0 opacity-[0.01]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2340e0d0' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px'
      }} />

      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon icon={FaDna} delay={0} duration={8} x="10%" y="20%" />
        <FloatingIcon icon={GiDna2} delay={1} duration={7} x="80%" y="30%" />
        <FloatingIcon icon={FaMicroscope} delay={2} duration={9} x="20%" y="70%" />
        <FloatingIcon icon={GiMedicalDrip} delay={3} duration={6} x="70%" y="80%" />
        <FloatingIcon icon={GiMedicines} delay={4} duration={8} x="90%" y="40%" />
        <FloatingIcon icon={GiStomach} delay={5} duration={7} x="30%" y="60%" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Enhanced Journal Header */}
        <motion.div 
          className="text-center mb-20 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="relative inline-block mb-8">
            <h2 className="relative font-merriweather text-6xl md:text-7xl font-bold text-[#003366]">
              {JOURNAL_DESCRIPTION.title}
            </h2>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#0f5a5e]/20" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-merriweather italic mb-6">
            {JOURNAL_DESCRIPTION.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {JOURNAL_DESCRIPTION.description}
          </p>

          {/* Journal Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-3xl mx-auto">
            {JOURNAL_DESCRIPTION.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[#0f5a5e] mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Featured Article */}
        <motion.div 
          className="relative w-full mb-16 overflow-hidden rounded-2xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-[21/9] w-full">
            <Image
              src={FEATURED_ARTICLE.image}
              alt="Featured medical publication"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-[#003366]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <div className="max-w-3xl">
                <div className="mb-4 text-white/80 font-medium">Featured Article</div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold text-white mb-4">
                  {FEATURED_ARTICLE.title}
                </h3>
                <p className="text-white/90 text-base sm:text-lg font-merriweather mb-6">
                  {FEATURED_ARTICLE.subtitle}
                </p>
                <p className="text-white/80 text-sm sm:text-base max-w-2xl">
                  {FEATURED_ARTICLE.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-96 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          // Keep existing posts grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-white shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300" 
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2340e0d0' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative bg-white overflow-hidden border border-gray-100 shadow-lg group-hover:border-[#0f5a5e]/10 transition-colors duration-300">
                  <div className="px-8 py-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-4 py-1.5 bg-[#0f5a5e]/3 text-[#003366] text-sm font-medium">
                        {post.categories?.nodes[0]?.name || 'Article'}
                      </span>
                      <span className="flex items-center gap-2 text-gray-500 text-sm">
                        <FaRegCalendarAlt className="text-[#0f5a5e]/50" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-2xl font-merriweather font-bold text-[#003366] mb-3">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaRegUser className="text-[#0f5a5e]/50" />
                        <span>{post.author?.node.name || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaRegClock className="text-[#0f5a5e]/50" />
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    {post.featuredImage ? (
                      <div className="aspect-w-16 aspect-h-9">
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-w-16 aspect-h-9 bg-gray-100" />
                    )}
                    <div className="absolute inset-0 bg-[#003366]/60" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div 
                        className="text-white mb-4 line-clamp-2 font-merriweather"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                    </div>
                  </div>

                  <div className="p-8 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.categories?.nodes.map((category) => (
                        <span 
                          key={category.slug}
                          className="px-3 py-1 bg-[#0f5a5e]/3 text-[#003366] text-sm font-merriweather hover:bg-[#0f5a5e]/5 transition-colors cursor-pointer"
                        >
                          #{category.name}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <motion.button 
                        className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#003366] text-white hover:bg-[#003366]/90 transition-all duration-300"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                      >
                        Read Full Article
                        <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Enhanced Footer */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover more groundbreaking research, clinical studies, and expert insights in our comprehensive journal archive.
          </p>
          <Link href="/blog">
            <motion.button 
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[#003366] text-white text-lg font-merriweather hover:bg-[#003366]/90 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <span className="relative z-10">Browse Complete Journal Archive</span>
              <ArrowRightIcon className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications; 