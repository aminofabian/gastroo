import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Users, Calendar, BookOpen, Download, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "H. pylori Infection in Kenya | GSK Research",
  description: "Research on the prevalence and risk factors of Helicobacter pylori infection in Kenya: A cross-sectional study by the Gastroenterology Society of Kenya."
};

export default function HpyloriPublicationPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#c22f61] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link href="/research/publications" className="flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Publications</span>
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Prevalence and Risk Factors of Helicobacter pylori Infection in Kenya: A Cross-Sectional Study
          </h1>
          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <span>Kimani J, Ogutu E, Wangari M, Maina D, Njoroge M, Waweru W, et al.</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              <span>East African Medical Journal</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span>2023</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Publication Info Bar */}
          <div className="bg-gray-50 p-6 border-b flex flex-wrap justify-between gap-4">
            <div className="flex items-center">
              <span className="px-3 py-1 bg-[#c22f61]/10 text-[#c22f61] rounded-full text-sm font-medium">
                Infectious Diseases
              </span>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center text-gray-600 hover:text-[#c22f61] transition-colors">
                <Download size={18} className="mr-1" />
                <span className="text-sm">PDF</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-[#c22f61] transition-colors">
                <Share2 size={18} className="mr-1" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
          
          {/* Abstract */}
          <div className="p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Abstract</h2>
            <div className="text-gray-700 mb-8 leading-relaxed">
              <p className="mb-4">
                <strong>Background:</strong> Helicobacter pylori infection is a major cause of chronic gastritis, peptic ulcer disease, and gastric cancer worldwide. Limited data exists on H. pylori prevalence and associated risk factors in Kenya.
              </p>
              <p className="mb-4">
                <strong>Objective:</strong> This cross-sectional study investigated the prevalence and risk factors of Helicobacter pylori infection in various regions of Kenya.
              </p>
              <p className="mb-4">
                <strong>Methods:</strong> We enrolled 1,248 participants (ages 18-65) from both urban and rural settings across Kenya between January 2021 and December 2022. H. pylori status was determined using stool antigen testing. Demographic data and information on potential risk factors were collected through structured questionnaires. Multivariable logistic regression was used to identify independent risk factors associated with H. pylori positivity.
              </p>
              <p className="mb-4">
                <strong>Results:</strong> The overall prevalence of H. pylori infection was 53.8% (95% CI: 51.0-56.6%). Prevalence was significantly higher in urban (62.4%) compared to rural areas (45.2%, p&lt;0.001). Multivariable analysis identified the following independent risk factors for H. pylori infection: lower education level (aOR 1.78, 95% CI: 1.24-2.55), shared housing with &gt;3 people per room (aOR 2.13, 95% CI: 1.46-3.12), use of untreated water (aOR 1.95, 95% CI: 1.35-2.83), and history of dyspeptic symptoms (aOR 1.67, 95% CI: 1.18-2.36). Regular consumption of fermented dairy products was associated with reduced odds of infection (aOR 0.72, 95% CI: 0.53-0.97).
              </p>
              <p className="mb-4">
                <strong>Conclusion:</strong> H. pylori infection remains highly prevalent in Kenya, particularly in urban settings. Socioeconomic factors, crowded housing conditions, and water source are significant risk factors. These findings highlight the need for public health interventions targeting improved living conditions, safe water access, and H. pylori awareness to reduce infection rates and associated disease burden in Kenya.
              </p>
            </div>
            
            {/* Keywords */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-800 mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {["Helicobacter pylori", "Kenya", "Prevalence", "Risk factors", "Cross-sectional study", "Gastritis"].map(keyword => (
                  <span key={keyword} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Publication Details */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Publication Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Citation</h3>
                  <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded border">
                    Kimani J, Ogutu E, Wangari M, Maina D, Njoroge M, Waweru W, et al. (2023). Prevalence and Risk Factors of Helicobacter pylori Infection in Kenya: A Cross-Sectional Study. East African Medical Journal, 100(2), 78-86.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Funding</h3>
                  <p className="text-gray-600">
                    This research was funded by the Gastroenterology Society of Kenya and supported by a grant from the Ministry of Health, Kenya.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Data Visualization */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Key Findings</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-4">H. pylori Prevalence by Region</h3>
                  <div className="aspect-[4/3] relative">
                    <Image 
                      src="/research/publications/hpylori-chart1.png" 
                      alt="H. pylori prevalence chart" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Figure 1: Prevalence of H. pylori infection across different regions of Kenya.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-4">Risk Factors for H. pylori Infection</h3>
                  <div className="aspect-[4/3] relative">
                    <Image 
                      src="/research/publications/hpylori-chart2.png" 
                      alt="Risk factors chart" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Figure 2: Adjusted odds ratios for significant risk factors associated with H. pylori infection.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Author Information */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Corresponding Author</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden relative bg-gray-200 flex-shrink-0">
                  <Image 
                    src="/research/authors/kimani-j.jpg" 
                    alt="Dr. Joseph Kimani" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Dr. Joseph Kimani, MBChB, MMed</h3>
                  <p className="text-gray-600">Department of Gastroenterology, University of Nairobi</p>
                  <p className="text-gray-600">Email: j.kimani@uonbi.ac.ke</p>
                </div>
              </div>
            </div>
            
            {/* Related Publications */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Related Publications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/research/publications/gi-bleeding-nairobi" className="block group">
                  <div className="bg-gray-50 p-6 rounded-lg h-full hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-gray-800 mb-2 group-hover:text-[#c22f61] transition-colors">
                      Endoscopic Management of Gastrointestinal Bleeding: A Retrospective Analysis of Cases in Nairobi
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">Omondi L, et al. (2022)</p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      This retrospective study analyzed 450 cases of gastrointestinal bleeding managed endoscopically at three tertiary hospitals in Nairobi.
                    </p>
                  </div>
                </Link>
                
                <Link href="/research/publications/ulcers-nsaids-kenya" className="block group">
                  <div className="bg-gray-50 p-6 rounded-lg h-full hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-gray-800 mb-2 group-hover:text-[#c22f61] transition-colors">
                      Peptic Ulcer Disease and NSAID Use in Kenya: A Hospital-Based Case-Control Study
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">Okoth K, et al. (2019)</p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      This case-control study examined the relationship between non-steroidal anti-inflammatory drug (NSAID) use and peptic ulcer disease in a Kenyan hospital setting.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 