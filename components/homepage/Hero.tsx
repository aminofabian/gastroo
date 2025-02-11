"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { Banner } from "@/types";

// Enhanced global styles with unique effects
const styles = {
  radialGradient: {
    background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 26, 53, 0.4) 100%)'
  },
  meshGradient: {
    background: 'linear-gradient(45deg, rgba(0, 26, 53, 0.4) 0%, transparent 100%), radial-gradient(circle at top right, rgba(155, 155, 155, 0.15), transparent 70%)'
  },
  glowEffect: {
    filter: 'drop-shadow(0 0 20px rgba(155, 155, 155, 0.15))'
  },
  shimmerGradient: {
    background: 'linear-gradient(90deg, transparent, rgba(155, 155, 155, 0.1), transparent)',
    backgroundSize: '200% 100%'
  },
  gradientText: {
    background: 'linear-gradient(-45deg, #ffffff, #a8a8a8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%'
  }
} as const;

// Unique statistics with animations
const impactStats = [
  { number: '500+', label: 'Specialists', icon: '👨‍⚕️' },
  { number: '30+', label: 'CME Events', icon: '🎓' },
  { number: '15+', label: 'Research Papers', icon: '📚' }
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 8;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 2,
  stiffness: 150,
  damping: 30,
};

const TRANSITION_EASE = [0.32, 0.72, 0, 1];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    
    // Fetch banners
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/banners");
        if (!response.ok) {
          throw new Error('Failed to fetch banners');
        }
        const data = await response.json();
        setBanners(data.filter((banner: Banner) => banner.active));
      } catch (error) {
        console.error("Failed to fetch banners:", error);
        // Set a default banner if fetch fails
        setBanners([{
          id: 'default',
          title: 'Welcome to GSK',
          image: '/images/default-banner.jpg',
          link: '/membership',
          cta: 'Join Now',
          order: 0,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="relative min-h-screen bg-[#001a35] overflow-hidden">
        <div className="absolute inset-0" style={styles.meshGradient} />
        <div className="absolute inset-0 bg-[url('/effects/noise.png')] opacity-[0.02] mix-blend-overlay" />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-48 bg-white/10 rounded"></div>
            <div className="h-24 w-96 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Always show the hero section, even without banners
  return (
    <div className="relative min-h-screen bg-[#001a35] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0" style={styles.meshGradient} />
      <div className="absolute inset-0 bg-[url('/effects/noise.png')] opacity-[0.02] mix-blend-overlay" />
      
      {/* Main content */}
      <div className="relative w-full min-h-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto pt-20 sm:pt-24 flex flex-col h-full">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]" />
          
          {/* Main text section */}
          <div className="relative z-20 flex-1">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-6"
              >
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 24 }}
                  transition={{ delay: 0.5 }}
                  className="h-[2px] bg-white/30"
                />
                <span className="text-white/70 text-sm tracking-wider">PROFESSIONAL NETWORK</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
              >
                <motion.span 
                  className="block"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={styles.gradientText}
                >
                  ADVANCE YOUR
                </motion.span>
                <motion.span 
                  className="block text-white/90"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  GASTROENTEROLOGY
                </motion.span>
                <span className="block">PRACTICE</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#0a1547] p-6 rounded-sm max-w-xl mt-12 relative overflow-hidden group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="flex items-center gap-4 text-white/90">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-lg font-medium mb-2">Join Kenya&apos;s Premier Gastroenterology Network</p>
                    <p className="text-base text-white/80">Access exclusive CME programs, research collaborations, and clinical resources. Connect with leading specialists across East Africa.</p>
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-6">
                  <motion.a 
                    href="/membership"
                    className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-8 py-3 rounded-sm transition-all font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Join as Specialist
                    <span className="text-lg">→</span>
                  </motion.a>
                  <motion.a
                    href="/membership/benefits"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-white/60 hover:text-white/90 transition-colors"
                  >
                    View Member Benefits
                  </motion.a>
                </div>
              </motion.div>

              {/* Professional highlights with floating animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex gap-8"
              >
                {[
                  { icon: '🔬', text: 'Clinical Excellence' },
                  { icon: '🎯', text: 'Specialized Training' },
                  { icon: '🤝', text: 'Peer Collaboration' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 text-white/70"
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut"
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      color: "rgba(255, 255, 255, 0.9)"
                    }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Stats and image section */}
          <div className="relative mt-12 lg:mt-0 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -left-12 top-0 h-full w-24 bg-gradient-to-r from-[#001a35] via-[#001a35]/80 to-transparent z-20" />
              {banners.length > 0 && <SwipeCarousel banners={banners} />}
              
              {/* Stats overlay with enhanced animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 right-0 bg-white/10 backdrop-blur-sm p-4 rounded-sm"
              >
                <motion.div 
                  className="flex items-center gap-4"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0px rgba(255, 255, 255, 0.2)",
                      "0 0 0 4px rgba(255, 255, 255, 0)",
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div>
                    <span className="text-3xl text-white font-bold">15+</span>
                    <span className="text-white/70 text-sm ml-1">Years</span>
                  </div>
                  <div className="text-white/70 text-sm border-l border-white/20 pl-4">
                    Leading<br />Gastroenterology<br />in East Africa
                  </div>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-white ml-2"
                  >
                    →
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 right-8 text-white/30"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm">Scroll to</span>
              <span className="text-sm">explore</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center"
              >
                ↓
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const SwipeCarousel = ({ banners }: { banners: Banner[] }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  useEffect(() => {
    if (!autoplayEnabled) return;

    const intervalId = setInterval(() => {
      const next = (imgIndex + 1) % banners.length;
      setImgIndex(next);
    }, AUTO_DELAY);

    return () => clearInterval(intervalId);
  }, [imgIndex, autoplayEnabled, banners.length]);

  const onDragStart = () => {
    setDragStartX(dragX.get());
    setAutoplayEnabled(false);
  };

  const onDragEnd = () => {
    const dragEndX = dragX.get();
    if (dragStartX === null) return;

    const dragDelta = dragEndX - dragStartX;

    if (Math.abs(dragDelta) > DRAG_BUFFER) {
      if (dragDelta > 0) {
        const next = (imgIndex - 1 + banners.length) % banners.length;
        setImgIndex(next);
      } else {
        const next = (imgIndex + 1) % banners.length;
        setImgIndex(next);
      }
    }

    setAutoplayEnabled(true);
  };

  return (
    <div className="relative overflow-hidden bg-black/20 rounded-lg">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Images banners={banners} imgIndex={imgIndex} />
      </motion.div>

      <Dots banners={banners} imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  );
};

const Images = ({ banners, imgIndex }: { banners: Banner[]; imgIndex: number }) => {
  return (
    <>
      {banners.map((banner, index) => (
        <motion.div
          key={banner.id}
          style={{
            backgroundImage: `url(${banner.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            scale: imgIndex === index ? 1 : 0.85,
          }}
          transition={SPRING_OPTIONS}
          className="aspect-video w-full shrink-0 rounded-lg bg-neutral-800 object-cover relative"
        >
          <div className="absolute inset-0 bg-black/25 rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
            <a
              href={banner.link}
              className="inline-block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              {banner.cta}
            </a>
          </div>
        </motion.div>
      ))}
    </>
  );
};

const Dots = ({ banners, imgIndex, setImgIndex }: { banners: Banner[]; imgIndex: number; setImgIndex: (index: number) => void }) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {banners.map((_, index) => (
        <button
          key={index}
          onClick={() => setImgIndex(index)}
          className={`h-2 w-2 rounded-full transition-colors ${
            index === imgIndex ? "bg-white" : "bg-white/50"
          }`}
        />
      ))}
    </div>
  );
};

export default Hero; 