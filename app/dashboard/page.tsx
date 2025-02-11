import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { FaCalendarAlt, FaFileAlt, FaGraduationCap, FaStethoscope, FaCertificate, FaFile, FaBuilding } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import RecentUpdatesList from "@/components/dashboard/RecentUpdatesList";
import { auth } from "@/auth";
import QuickLinkItem from "@/components/dashboard/QuickLinkItem";

const quickLinks = [
  {
    title: "Upcoming CME",
    description: "View upcoming events",
    href: "/events",
    gradient: "from-[#083c74] to-[#083c74]",
    icon: <FaCalendarAlt />
  },
  {
    title: "Clinical Resources",
    description: "Access medical resources",
    href: "/dashboard/resources",
    gradient: "from-[#083c74] to-[#083c74]",
    icon: <FaStethoscope />
  },
  {
    title: "Research Papers",
    description: "Latest publications",
    href: "/dashboard/research",
    gradient: "from-[#083c74] to-[#083c74]",
    icon: <FaFileAlt />
  },
  {
    title: "Learning Hub",
    description: "Educational content",
    href: "/dashboard/learning",
    gradient: "from-[#083c74] to-[#083c74]",
    icon: <FaGraduationCap />
  },
  {
    title: "Certificates",
    description: "View your certificates",
    href: "/dashboard/certificates",
    gradient: "from-[#083c74] to-[#083c74]",
    icon: <FaCertificate />
  },
  {
    title: "Payments",
    description: "Manage your payments",
    href: "/dashboard/payments",
    gradient: "from-[#083c74] to-[#083c74]",
    icon: <MdPayments />
  },
  {
    title: "Documents",
    description: "Access your documents",
    href: "/dashboard/documents",
    gradient: "from-[#083c74] to-[#083c74]",
    icon: <FaFile />
  },
  {
    title: "Profile",
    description: "Update your profile",
    href: "/profile",
    gradient: "from-[#083c74] to-[#083c74]",
    icon: <FaBuilding />
  }
];

export default async function DashboardPage() {
  const session = await auth();
  const firstName = session?.user?.firstName || 'there';

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="relative overflow-hidden mb-8 bg-gradient-to-r from-[#003366] to-[#004488]">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {firstName}</h1>
          <p className="text-white/80 mb-4">Stay updated with the latest in gastroenterology</p>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {quickLinks.map((link, index) => (
          <QuickLinkItem 
            key={link.title} 
            link={{
              title: link.title,
              description: link.description,
              href: link.href,
              gradient: link.gradient
            }}
            icon={link.icon}
            index={index} 
          />
        ))}
      </div>

      {/* Recent Updates with Suspense */}
      <Suspense fallback={<div className="bg-white p-6 shadow-lg animate-pulse h-64" />}>
        <RecentUpdatesList />
      </Suspense>
    </DashboardLayout>
  );
} 