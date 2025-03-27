import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Users, Calendar, BookOpen, Download, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "GI Bleeding Management in Nairobi | GSK Research",
  description: "Research on endoscopic management of gastrointestinal bleeding: A retrospective analysis of cases in Nairobi by the Gastroenterology Society of Kenya."
};

export default function GiBleedingPublicationPage() {
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
            Endoscopic Management of Gastrointestinal Bleeding: A Retrospective Analysis of Cases in Nairobi
          </h1>
          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <span>Omondi L, Njoroge P, Kamau W, Otieno G, Mwangi J, Waihenya R, et al.</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              <span>World Journal of Gastroenterology</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span>2022</span>
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
                Endoscopy
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
                <strong>Background:</strong> Gastrointestinal bleeding (GIB) is a common medical emergency associated with significant morbidity and mortality. Data on the endoscopic management of GIB in sub-Saharan Africa is limited. This study aimed to evaluate the etiology, endoscopic management strategies, and outcomes of GIB in Nairobi, Kenya.
              </p>
              <p className="mb-4">
                <strong>Objective:</strong> To analyze the etiology, treatment outcomes, and factors associated with rebleeding in patients with GIB managed endoscopically at three tertiary hospitals in Nairobi.
              </p>
              <p className="mb-4">
                <strong>Methods:</strong> We conducted a retrospective analysis of 450 patients who underwent endoscopic evaluation and management for acute GIB at three tertiary hospitals in Nairobi between January 2018 and December 2021. Data on demographics, clinical presentation, endoscopic findings, therapeutic interventions, and outcomes were collected from medical records. Logistic regression analysis was used to identify predictors of rebleeding and mortality.
              </p>
              <p className="mb-4">
                <strong>Results:</strong> Of the 450 patients, 62% presented with upper GIB and 38% with lower GIB. The mean age was 52.3 ± 16.7 years with a male predominance (58.2%). For upper GIB, the most common etiologies were peptic ulcer disease (42.5%), esophageal varices (24.6%), and gastric erosions (15.7%). For lower GIB, diverticular disease (28.1%), colorectal tumors (22.8%), and hemorrhoids (18.7%) were most frequent. Endoscopic therapy was performed in 68.2% of cases, with injection therapy, thermal coagulation, and band ligation being the most common modalities. The overall technical success rate was 92.3%. Rebleeding occurred in 11.8% of patients. Independent predictors of rebleeding included comorbid liver disease (OR 2.84, 95% CI: 1.56-5.17), hemodynamic instability at presentation (OR 3.21, 95% CI: 1.79-5.74), and Rockall score ≥6 (OR 2.97, 95% CI: 1.63-5.42). The overall 30-day mortality rate was 7.3%, primarily associated with advanced age, comorbidities, and hemodynamic instability at presentation.
              </p>
              <p className="mb-4">
                <strong>Conclusion:</strong> This study provides valuable insights into the etiology and management of GIB in Kenya. Endoscopic therapy demonstrated high technical success rates, supporting its effectiveness in the Kenyan healthcare context. Early risk stratification and prompt endoscopic intervention are crucial in optimizing outcomes. Future prospective studies are needed to develop locally-adapted protocols for GIB management in resource-limited settings.
              </p>
            </div>
            
            {/* Keywords */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-800 mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {["Gastrointestinal bleeding", "Endoscopy", "Kenya", "Peptic ulcer", "Esophageal varices", "Treatment outcomes"].map(keyword => (
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
                    Omondi L, Njoroge P, Kamau W, Otieno G, Mwangi J, Waihenya R, et al. (2022). Endoscopic Management of Gastrointestinal Bleeding: A Retrospective Analysis of Cases in Nairobi. World Journal of Gastroenterology, 28(15), 1578-1589.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Funding</h3>
                  <p className="text-gray-600">
                    This research was supported by the Gastroenterology Society of Kenya and a research grant from Kenyatta National Hospital.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Tables and Figures */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Key Tables and Figures</h2>
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-4">Etiology of Upper and Lower GI Bleeding</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Diagnosis</th>
                          <th className="py-2 px-4 border-b text-center text-sm font-medium text-gray-700">Number</th>
                          <th className="py-2 px-4 border-b text-center text-sm font-medium text-gray-700">Percentage (%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="bg-gray-50 font-medium">
                          <td className="py-2 px-4 text-gray-700" colSpan={3}>Upper GI Bleeding (n=279)</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Peptic ulcer disease</td>
                          <td className="py-2 px-4 text-center text-gray-700">119</td>
                          <td className="py-2 px-4 text-center text-gray-700">42.5%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Esophageal varices</td>
                          <td className="py-2 px-4 text-center text-gray-700">69</td>
                          <td className="py-2 px-4 text-center text-gray-700">24.6%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Gastric erosions</td>
                          <td className="py-2 px-4 text-center text-gray-700">44</td>
                          <td className="py-2 px-4 text-center text-gray-700">15.7%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Esophagitis</td>
                          <td className="py-2 px-4 text-center text-gray-700">21</td>
                          <td className="py-2 px-4 text-center text-gray-700">7.5%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Mallory-Weiss tear</td>
                          <td className="py-2 px-4 text-center text-gray-700">14</td>
                          <td className="py-2 px-4 text-center text-gray-700">5.0%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Gastric/esophageal tumors</td>
                          <td className="py-2 px-4 text-center text-gray-700">12</td>
                          <td className="py-2 px-4 text-center text-gray-700">4.3%</td>
                        </tr>
                        <tr className="bg-gray-50 font-medium">
                          <td className="py-2 px-4 text-gray-700" colSpan={3}>Lower GI Bleeding (n=171)</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Diverticular disease</td>
                          <td className="py-2 px-4 text-center text-gray-700">48</td>
                          <td className="py-2 px-4 text-center text-gray-700">28.1%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Colorectal tumors</td>
                          <td className="py-2 px-4 text-center text-gray-700">39</td>
                          <td className="py-2 px-4 text-center text-gray-700">22.8%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Hemorrhoids</td>
                          <td className="py-2 px-4 text-center text-gray-700">32</td>
                          <td className="py-2 px-4 text-center text-gray-700">18.7%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Colitis</td>
                          <td className="py-2 px-4 text-center text-gray-700">27</td>
                          <td className="py-2 px-4 text-center text-gray-700">15.8%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Angiodysplasia</td>
                          <td className="py-2 px-4 text-center text-gray-700">16</td>
                          <td className="py-2 px-4 text-center text-gray-700">9.4%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-700">Other</td>
                          <td className="py-2 px-4 text-center text-gray-700">9</td>
                          <td className="py-2 px-4 text-center text-gray-700">5.3%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Table 1: Etiology of gastrointestinal bleeding in 450 patients who underwent endoscopic evaluation.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-4">Success Rates of Endoscopic Interventions</h3>
                  <div className="aspect-[16/9] relative">
                    <Image 
                      src="/research/publications/gi-bleeding-chart.png" 
                      alt="Endoscopic intervention success rates" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Figure 1: Technical success rates of different endoscopic interventions for gastrointestinal bleeding.
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
                    src="/research/authors/omondi-l.jpg" 
                    alt="Dr. Linet Omondi" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Dr. Linet Omondi, MBChB, MMed</h3>
                  <p className="text-gray-600">Department of Medicine, University of Nairobi</p>
                  <p className="text-gray-600">Email: l.omondi@uonbi.ac.ke</p>
                </div>
              </div>
            </div>
            
            {/* Related Publications */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Related Publications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/research/publications/hpylori-infection-kenya" className="block group">
                  <div className="bg-gray-50 p-6 rounded-lg h-full hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-gray-800 mb-2 group-hover:text-[#003366] transition-colors">
                      Prevalence and Risk Factors of Helicobacter pylori Infection in Kenya: A Cross-Sectional Study
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">Kimani J, et al. (2023)</p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      This cross-sectional study investigated the prevalence and risk factors of Helicobacter pylori infection in various regions of Kenya.
                    </p>
                  </div>
                </Link>
                
                <Link href="/research/publications/ulcers-nsaids-kenya" className="block group">
                  <div className="bg-gray-50 p-6 rounded-lg h-full hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-gray-800 mb-2 group-hover:text-[#003366] transition-colors">
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