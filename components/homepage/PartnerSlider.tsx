'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const partners = [
  '/partners/Screenshot_2025-02-07_095045-removebg-preview.png',
  '/partners/Screenshot_2025-02-07_095103-removebg-preview.png',
  '/partners/Screenshot_2025-02-07_095118-removebg-preview.png',
  '/partners/Screenshot_2025-02-07_095252-removebg-preview.png',
  '/partners/Screenshot_2025-02-07_095302-removebg-preview.png',
  '/partners/Screenshot_2025-02-07_095311-removebg-preview.png',
  '/partners/Screenshot_2025-02-07_095322-removebg-preview.png',
];

const PartnerSlider = () => {
  return (
    <div className="w-full py-16">
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={50}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="partner-slider"
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={index}>
            <div className="partner-card group">
              <div className="relative overflow-hidden bg-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8">
                  <Image
                    src={partner}
                    alt={`Partner ${index + 1}`}
                    width={200}
                    height={100}
                    className="object-contain h-24 w-full filter transition-all duration-300 group-hover:brightness-110"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .partner-slider {
          padding: 20px 0;
        }

        .partner-card {
          padding: 10px;
          transition: all 0.3s ease;
        }

        .swiper-slide {
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .swiper-slide-active {
          opacity: 1;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .partner-card:hover {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PartnerSlider; 