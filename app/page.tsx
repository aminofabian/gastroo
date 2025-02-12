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

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main>
      <h1>Welcome to Your App</h1>
    </main>
  );
}
