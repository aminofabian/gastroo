'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

interface PricingFeature {
  name: string;
  description: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  badge: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Annual Partnership",
    badge: "Core Membership",
    price: "Kes 200,000",
    period: "annually",
    description: "Support GSK programs and member services as a partnering company",
    features: [
      { name: "Access to GSK Events", description: "Priority access to all GSK events and conferences", included: true },
      { name: "Brand Recognition", description: "Your logo on GSK website and materials", included: true },
      { name: "Networking Opportunities", description: "Direct access to GSK's professional network", included: true },
      { name: "Research Collaboration", description: "Opportunity to participate in research projects", included: true },
      { name: "Member Directory", description: "Access to GSK's member directory", included: true },
      { name: "Newsletter Feature", description: "Company feature in GSK newsletter", included: true },
      { name: "Event Discounts", description: "Special rates for GSK events", included: true },
      { name: "Advisory Board", description: "Opportunity to join GSK advisory board", included: false },
    ],
  },
  {
    name: "Advertising",
    badge: "Multiple Options",
    price: "Starting at Kes 30,000",
    period: "per placement",
    description: "Promote your brand through various advertising channels",
    highlighted: true,
    features: [
      { name: "Home Page Banner", description: "Premium banner placement (Kes 80,000/season)", included: true },
      { name: "Secondary Pages", description: "Strategic ad placement (Kes 50,000/season)", included: true },
      { name: "Sponsored Content", description: "Custom articles and content (Kes 30,000/article)", included: true },
      { name: "Social Media", description: "Cross-platform promotion", included: true },
      { name: "Email Marketing", description: "Featured in email campaigns", included: true },
      { name: "Analytics Reports", description: "Detailed performance metrics", included: true },
      { name: "Custom Campaigns", description: "Tailored advertising solutions", included: true },
      { name: "Retargeting Options", description: "Advanced audience targeting", included: true },
    ],
  },
  {
    name: "Sponsorships",
    badge: "Premium Options",
    price: "Starting at Kes 100,000",
    period: "per event",
    description: "Premium sponsorship opportunities for maximum exposure",
    features: [
      { name: "Webinar Sponsorship", description: "Host branded webinars (Kes 100,000/session)", included: true },
      { name: "Event Sponsorship", description: "Major event sponsorship opportunities", included: true },
      { name: "Exclusive Package", description: "Comprehensive annual package (Kes 500,000)", included: true },
      { name: "Speaking Opportunities", description: "Keynote speaking slots at events", included: true },
      { name: "VIP Access", description: "Exclusive access to VIP events", included: true },
      { name: "Content Creation", description: "Custom content development", included: true },
      { name: "Brand Integration", description: "Deep integration with GSK brand", included: true },
      { name: "Market Research", description: "Access to industry insights", included: true },
    ],
  },
];

const PricingCard = ({ tier }: { tier: PricingTier }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 ${
      tier.highlighted 
        ? 'shadow-xl border-primary/20 scale-105 hover:scale-[1.06]' 
        : 'shadow-lg hover:shadow-xl hover:scale-[1.02]'
    }`}>
      {tier.highlighted && (
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rotate-45">
          <Badge className="bg-primary text-primary-foreground px-8 py-1">Popular</Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="space-y-2">
          <Badge variant="secondary" className="mb-2">{tier.badge}</Badge>
          <h3 className="text-2xl font-bold text-primary">{tier.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{tier.price}</span>
            <span className="text-muted-foreground">/{tier.period}</span>
          </div>
          <p className="text-muted-foreground">{tier.description}</p>
        </div>
      </CardHeader>

      <CardContent>
        <div className={`space-y-4 transition-all duration-300 ${
          isExpanded ? 'max-h-[1000px]' : 'max-h-[300px] overflow-hidden'
        }`}>
          {tier.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1">
                <Check className={`w-4 h-4 ${
                  feature.included ? 'text-primary' : 'text-muted-foreground/50'
                }`} />
              </div>
              <div>
                <div className="font-medium">{feature.name}</div>
                <div className="text-sm text-muted-foreground">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button 
          variant={tier.highlighted ? "default" : "outline"} 
          className="w-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <span className="flex items-center gap-2">Show Less <ChevronUp className="w-4 h-4" /></span>
          ) : (
            <span className="flex items-center gap-2">Learn More <ChevronDown className="w-4 h-4" /></span>
          )}
        </Button>
        <Button variant="default" className="w-full">Get Started</Button>
      </CardFooter>
    </Card>
  );
};

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background/80 py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute -left-40 -top-40 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Financial Sustainability
          </h1>
          <div className="w-20 h-1 bg-primary/20 mx-auto mb-6" />
          <p className="text-xl text-muted-foreground">
            Partnering with GSK offers multiple financial benefits to sustain and expand the initiatives. 
            Choose the partnership level that best suits your organization&apos;s needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} />
          ))}
        </div>

        {/* Financial Projections Section */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-12 mt-20">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Financial Income Projection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Annual Partners", amount: "Kes 1,000,000", details: "5 partners" },
              { title: "Home Page Ads", amount: "Kes 320,000", details: "4 companies" },
              { title: "Secondary Page Ads", amount: "Kes 500,000", details: "10 ads" },
              { title: "Sponsored Content", amount: "Kes 300,000", details: "10 articles" },
              { title: "Webinar Sponsorships", amount: "Kes 600,000", details: "6 sessions" },
              { title: "Exclusive Sponsorships", amount: "Kes 1,000,000", details: "2 companies" },
            ].map((item, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-2xl font-bold text-primary">{item.amount}</p>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30h10v10H30V30zm-10 0h10v10H20V30zm-10 0h10v10H10V30zm30-10h10v10H40V20zm-10 0h10v10H30V20zm-10 0h10v10H20V20zm-10 0h10v10H10V20z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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
} 