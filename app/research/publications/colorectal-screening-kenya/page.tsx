import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Users, Calendar, BookOpen, Download, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Colorectal Cancer Screening in Kenya | GSK Research",
  description: "Research on colorectal cancer screening practices in Kenya: challenges and opportunities identified by the Gastroenterology Society of Kenya."
};

export default function ColorectalScreeningPublicationPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#003366] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link href="/research/publications" className="flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Publications</span>
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Colorectal Cancer Screening Practices in Kenya: Challenges and Opportunities
          </h1>
          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <span>Ndegwa S, Kariuki P, Otieno F, Gatheru P, Miriti K, et al.</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              <span>African Journal of Cancer</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span>2021</span>
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
              <span className="px-3 py-1 bg-[#003366]/10 text-[#003366] rounded-full text-sm font-medium">
                Oncology
              </span>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center text-gray-600 hover:text-[#003366] transition-colors">
                <Download size={18} className="mr-1" />
                <span className="text-sm">PDF</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-[#003366] transition-colors">
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
                <strong>Background:</strong> Colorectal cancer (CRC) incidence is rising in many African countries, including Kenya, where most cases are diagnosed at advanced stages. Effective screening programs are crucial for early detection and improved outcomes. This review examines current CRC screening practices in Kenya, identifies barriers to screening, and proposes context-appropriate strategies to increase screening uptake.
              </p>
              <p className="mb-4">
                <strong>Methods:</strong> We conducted a comprehensive review of published literature, national health policies, and healthcare facility data. Additionally, we surveyed 42 healthcare facilities across Kenya and interviewed 87 healthcare providers involved in CRC screening and management. The review focused on current screening practices, available resources, barriers to screening, and opportunities for improvement.
              </p>
              <p className="mb-4">
                <strong>Results:</strong> CRC screening rates in Kenya remain extremely low (&lt;5% of the eligible population). The most common screening modalities available were fecal occult blood testing (FOBT) (available in 76% of surveyed facilities) and colonoscopy (52%). However, significant disparities exist between urban and rural areas, with many rural facilities lacking basic screening capabilities. Major barriers to screening include limited resources (76% of facilities reported inadequate equipment), insufficient trained personnel (only 28% of facilities had staff trained in colonoscopy), high cost of screening tests (cited by 82% of providers as a major barrier), poor awareness among both healthcare providers and the public (68%), and cultural barriers including stigma around discussing bowel symptoms (54%). Our findings indicate that opportunistic screening predominates, with no systematic, population-based CRC screening program currently in place.
              </p>
              <p className="mb-4">
                <strong>Conclusion:</strong> Significant challenges exist for CRC screening implementation in Kenya. We recommend a phased approach beginning with high-risk population screening using FOBT as the primary screening tool, development of clear national guidelines adapted to local resources, investment in training more endoscopists, public education campaigns to increase awareness, and innovative financing mechanisms to reduce cost barriers. Culturally-appropriate screening approaches that address stigma and misconceptions are essential for increasing uptake. Multi-stakeholder collaboration involving the government, healthcare institutions, professional societies, and community organizations will be necessary to develop and sustain effective CRC screening programs in Kenya.
              </p>
            </div>
            
            {/* Keywords */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-800 mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {["Colorectal cancer", "Screening", "Kenya", "Early detection", "Barriers", "Implementation strategies"].map(keyword => (
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
                    Ndegwa S, Kariuki P, Otieno F, Gatheru P, Miriti K, et al. (2021). Colorectal Cancer Screening Practices in Kenya: Challenges and Opportunities. African Journal of Cancer, 13(3), 427-436.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Funding</h3>
                  <p className="text-gray-600">
                    This research was supported by the Gastroenterology Society of Kenya and the Kenya Cancer Research and Control Network with additional funding from the African Organization for Research and Training in Cancer (AORTIC).
                  </p>
                </div>
              </div>
            </div>
            
            {/* Key Findings */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Key Findings</h2>
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-4">Availability of Screening Modalities</h3>
                  <div className="aspect-[16/9] relative">
                    <Image 
                      src="/research/publications/crc-screening-chart1.png" 
                      alt="CRC screening availability chart" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Figure 1: Availability of colorectal cancer screening modalities across surveyed healthcare facilities in Kenya.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-4">Barriers to CRC Screening</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Limited resources/equipment</span>
                        <span className="font-medium text-[#003366]">76%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#003366] h-2.5 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">High cost of screening</span>
                        <span className="font-medium text-[#003366]">82%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#003366] h-2.5 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Insufficient trained personnel</span>
                        <span className="font-medium text-[#003366]">72%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#003366] h-2.5 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Poor awareness/knowledge</span>
                        <span className="font-medium text-[#003366]">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#003366] h-2.5 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Cultural barriers/stigma</span>
                        <span className="font-medium text-[#003366]">54%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#003366] h-2.5 rounded-full" style={{ width: '54%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-4">Urban vs. Rural Disparities</h3>
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Resource</th>
                          <th className="text-center py-2">Urban (%)</th>
                          <th className="text-center py-2">Rural (%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2">FOBT availability</td>
                          <td className="text-center py-2">92%</td>
                          <td className="text-center py-2">63%</td>
                        </tr>
                        <tr>
                          <td className="py-2">Colonoscopy services</td>
                          <td className="text-center py-2">82%</td>
                          <td className="text-center py-2">29%</td>
                        </tr>
                        <tr>
                          <td className="py-2">Trained endoscopists</td>
                          <td className="text-center py-2">45%</td>
                          <td className="text-center py-2">12%</td>
                        </tr>
                        <tr>
                          <td className="py-2">Pathology services</td>
                          <td className="text-center py-2">74%</td>
                          <td className="text-center py-2">31%</td>
                        </tr>
                        <tr>
                          <td className="py-2">CRC educational materials</td>
                          <td className="text-center py-2">68%</td>
                          <td className="text-center py-2">37%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Recommendations for Improving CRC Screening</h2>
              <div className="space-y-6">
                <div className="bg-[#003366]/5 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">1. Phased Implementation Approach</h3>
                  <p className="text-gray-600">
                    Begin with targeted screening of high-risk populations (family history, symptomatic patients) using FOBT as the primary screening tool, with gradual expansion to population-based screening as resources increase.
                  </p>
                </div>
                
                <div className="bg-[#003366]/5 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">2. National Guidelines and Protocol Development</h3>
                  <p className="text-gray-600">
                    Develop clear, resource-stratified national guidelines for CRC screening that can be adapted to different healthcare settings across Kenya, with standardized protocols for screening, follow-up, and referral.
                  </p>
                </div>
                
                <div className="bg-[#003366]/5 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">3. Healthcare Provider Training</h3>
                  <p className="text-gray-600">
                    Invest in training more gastroenterologists and nurse endoscopists, and educate primary care providers on CRC risk assessment and screening recommendations to increase screening referrals.
                  </p>
                </div>
                
                <div className="bg-[#003366]/5 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">4. Public Education and Awareness</h3>
                  <p className="text-gray-600">
                    Develop culturally appropriate educational campaigns that address stigma and misconceptions around CRC and screening procedures, using multiple communication channels including community health workers.
                  </p>
                </div>
                
                <div className="bg-[#003366]/5 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">5. Innovative Financing Mechanisms</h3>
                  <p className="text-gray-600">
                    Advocate for inclusion of CRC screening in national health insurance coverage, develop public-private partnerships, and explore sliding fee scales or voucher systems to reduce cost barriers.
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
                    src="/research/authors/ndegwa-s.jpg" 
                    alt="Dr. Samuel Ndegwa" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Dr. Samuel Ndegwa, MBChB, MMed</h3>
                  <p className="text-gray-600">Department of Surgery and Cancer, University of Nairobi</p>
                  <p className="text-gray-600">Email: s.ndegwa@uonbi.ac.ke</p>
                </div>
              </div>
            </div>
            
            {/* Related Publications */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Related Publications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/research/publications/gi-bleeding-nairobi" className="block group">
                  <div className="bg-gray-50 p-6 rounded-lg h-full hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-gray-800 mb-2 group-hover:text-[#003366] transition-colors">
                      Endoscopic Management of Gastrointestinal Bleeding: A Retrospective Analysis of Cases in Nairobi
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">Omondi L, et al. (2022)</p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      This retrospective study analyzed 450 cases of gastrointestinal bleeding managed endoscopically at three tertiary hospitals in Nairobi.
                    </p>
                  </div>
                </Link>
                
                <Link href="/research/publications/ibd-nairobi-cohort" className="block group">
                  <div className="bg-gray-50 p-6 rounded-lg h-full hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-gray-800 mb-2 group-hover:text-[#003366] transition-colors">
                      Clinical Presentation and Management of Inflammatory Bowel Disease: Experience from a Nairobi Cohort
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">Gitau W, et al. (2021)</p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      This prospective study described the clinical presentation, diagnostic approaches, and management strategies for inflammatory bowel disease in a cohort of 85 patients in Nairobi.
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