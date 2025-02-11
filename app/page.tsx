import { Button } from "@/components/ui/button";
import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";
import LoginButton from "@/components/auth/LoginButton";
import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import MembershipFeatures from "@/components/homepage/MembershipFeatures";
import AboutGSK from "@/components/homepage/AboutGSK";
import Partners from "@/components/homepage/Partners";
import Publications from "@/components/homepage/Publications";
import Donation from "@/components/homepage/Donation";
import Newsletter from "@/components/homepage/Newsletter";
import Footer from '@/components/homepage/Footer';

const font = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative">
        <Hero />
      </section>

      {/* About GSK Section */}
      <section className="relative">
        <AboutGSK />
      </section>

       {/* Membership Features with smooth transition */}
       <section className="relative -mt-20">
        <MembershipFeatures />
      </section>

      {/* Features Section with top wave separator */}
      <section className="relative bg-white pt-20 pb-20">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#002347] to-transparent pointer-events-none" />
        <div className="relative">
          <Features />
        </div>
      </section>

      {/* Partners Section with gradient background */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-10">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-[0.02]" />
        <div className="relative">
          <Partners />
        </div>
      </section>

      {/* Publications Section with subtle separator */}
      <section className="relative bg-white pt-5">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#003366]" />
        <div className="relative">
          <Publications />
        </div>
      </section>

      {/* Donation Section with dark background */}
      <section className="relative py-20">
        <div className="relative">
          <Donation />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative">
        <Newsletter />
      </section>

      {/* Footer */}
      <section className="relative bg-[#003366]">
        <Footer />
      </section>
    </main>
  );
}
