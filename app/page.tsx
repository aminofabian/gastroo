import { Suspense } from 'react';
import { Jost } from "next/font/google";
import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import MembershipFeatures from "@/components/homepage/MembershipFeatures";
import AboutGSK from "@/components/homepage/AboutGSK";
import Partners from "@/components/homepage/Partners";
import Newsletter from "@/components/homepage/Newsletter";
import Footer from '@/components/homepage/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

const font = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Add proper metadata
export const metadata = {
  title: 'GSK - Home',
  description: 'Welcome to Gastroenterology Society of Kenya',
};

// Add proper error handling
function ErrorFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>Something went wrong. Please try again later.</h1>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<div>Loading...</div>}>
          {/* Hero Section */}
          <section className="relative">
            <Hero />
          </section>

          {/* About GSK Section */}
          <section className="relative">
            <AboutGSK />
          </section>

          {/* Rest of your sections wrapped in Suspense */}
          <Suspense fallback={<div>Loading features...</div>}>
            {/* Membership Features with smooth transition */}
            <section className="relative -mt-20">
              <MembershipFeatures />
            </section>

            {/* Features Section with top wave separator */}
            <section className="relative bg-white pt-20 pb-20">
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#af2a57] to-transparent pointer-events-none" />
              <div className="relative">
                <Features />
              </div>
            </section>
          </Suspense>

          {/* Partners Section with gradient background */}
          <section className="relative bg-gradient-to-b from-gray-50 to-white py-10">
            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-[0.02]" />
            <div className="relative">
              <Partners />
            </div>
          </section>

          {/* Publications Section with subtle separator */}
          {/* <section className="relative bg-white pt-5">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#c22f61]" />
            <div className="relative">
              <Publications />
            </div>
          </section> */}

          {/* Donation Section with dark background */}
          {/* <section className="relative py-20">
            <div className="relative">
              <Donation />
            </div>
          </section> */}

          {/* Newsletter Section */}
          <section className="relative">
            <Newsletter />
          </section>

          {/* Footer */}
          <section className="relative bg-[#c22f61]">
            <Footer />
          </section>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}