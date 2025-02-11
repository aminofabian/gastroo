"use client";
import { useState, useEffect } from 'react';
import PartnerSlider from './PartnerSlider';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
}

const AnimatedCounter = ({ end, duration = 1000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.min(Math.floor(end * progress), end));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <div>{count}+</div>
  );
};

interface MapPointProps {
  top: number;
  left: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  delay?: number;
}

interface MapConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6'
} as const;

const MapPoint = ({ top, left, size = 'md', label = '', delay = 0 }: MapPointProps) => {
  return (
    <div className={`absolute transform -translate-x-1/2 -translate-y-1/2`} style={{ top: `${top}%`, left: `${left}%` }}>
      <div className="relative">
        <div className={`${sizeClasses[size]} rotate-45 bg-white/20 animate-pulse`} style={{ animationDelay: `${delay}ms` }}>
          <div className="absolute inset-0 flex items-center justify-center -rotate-45">
            <span className="text-white text-[10px] font-bold">+</span>
          </div>
        </div>
        {label && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="text-white text-xs font-semibold bg-[#003366]/50 px-2 py-0.5">
              {label}
            </span>
          </div>
        )}
        <div className="absolute inset-0 animate-ping" style={{ animationDelay: `${delay}ms` }}>
          <div className={`${sizeClasses[size]} rotate-45 bg-white/10`} />
        </div>
      </div>
    </div>
  );
};

const MapConnection = ({ x1, y1, x2, y2, delay = 0 }: MapConnectionProps) => (
  <line 
    x1={`${x1}%`} 
    y1={`${y1}%`} 
    x2={`${x2}%`} 
    y2={`${y2}%`} 
    stroke="white" 
    strokeOpacity="0.2" 
    strokeWidth="1.5"
    className="animate-drawLine"
    style={{ 
      animationDelay: `${delay}ms`,
      strokeDasharray: '1000',
      strokeDashoffset: '1000',
      animation: 'drawLine 2s ease-out forwards',
    }}
  />
);

interface Leader {
  name: string;
  title: string;
  image: string;
  specialty: string;
  experience: string;
  hospital?: string;
  email?: string;
  linkedin?: string;
}

const Partners = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-[0.02]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute -left-40 -top-40 w-80 h-80 bg-emerald-50 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-indigo-50 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Trusted Partners
          </h2>
          <div className="w-20 h-1 bg-emerald-600/20 mx-auto mb-6" />
          <p className="text-gray-600 text-lg leading-relaxed">
            We collaborate with leading organizations to advance research and innovation in healthcare, 
            working together to create a healthier future for all.
          </p>
        </div>

        {/* Partner Slider */}
        <div className="relative">
          {/* Gradient Edges */}
          <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />
          
          <PartnerSlider />
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '50+', label: 'Global Partners' },
            { number: '10+', label: 'Years of Excellence' },
            { number: '1000+', label: 'Success Stories' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Partners;