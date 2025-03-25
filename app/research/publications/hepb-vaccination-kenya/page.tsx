import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Users, Calendar, BookOpen, Download, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Hepatitis B Vaccination in Healthcare Workers | GSK Research",
  description: "Research on hepatitis B vaccination coverage among healthcare workers in Kenyan hospitals by the Gastroenterology Society of Kenya."
};

export default function HepBVaccinationPublicationPage() {
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
            Hepatitis B Vaccination Coverage Among Healthcare Workers in Kenyan Hospitals
          </h1>
          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <span>Mwangi A, Githinji G, Wanjiku C, Nganga L, Kariuki S, et al.</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              <span>Journal of Viral Hepatitis</span>
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
              <span className="px-3 py-1 bg-[#c22f61]/10 text-[#c22f61] rounded-full text-sm font-medium">
                Hepatology
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
                <strong>Background:</strong> Healthcare workers (HCWs) are at increased risk of hepatitis B virus (HBV) infection due to occupational exposure. Despite the availability of safe and effective vaccines, HBV vaccination coverage among HCWs in many African countries remains suboptimal. This study aimed to assess HBV vaccination coverage and identify barriers to vaccination among HCWs in Kenyan hospitals.
              </p>
              <p className="mb-4">
                <strong>Methods:</strong> We conducted a cross-sectional survey in 24 hospitals across Kenya from March to November 2021. A total of 1,485 HCWs were recruited using stratified random sampling. Data were collected through structured questionnaires and verification of vaccination records. Anti-HBs antibody testing was performed to confirm immunity status in a subset of participants. Multivariate logistic regression analysis was used to identify factors associated with vaccination status.
              </p>
              <p className="mb-4">
                <strong>Results:</strong> The overall HBV vaccination coverage (≥3 doses) was 52.8% (95% CI: 50.2-55.4%). Significant variations in coverage were observed across different healthcare worker categories, with the highest coverage among physicians (71.3%) and the lowest among support staff (26.4%). Only 35.2% of the vaccinated HCWs had their anti-HBs levels measured post-vaccination. Factors independently associated with complete vaccination included awareness of HBV occupational risk (aOR: 3.28, 95% CI: 2.42-4.45), longer duration of employment (aOR: 1.89, 95% CI: 1.36-2.63), and working in referral hospitals (aOR: 2.15, 95% CI: 1.61-2.86). The main barriers to vaccination were vaccine unavailability (38.7%), cost (27.5%), time constraints (18.3%), and concerns about vaccine safety (15.5%). Of the 487 participants who underwent anti-HBs testing, 83.6% of those reporting complete vaccination demonstrated protective antibody levels (≥10 mIU/mL).
              </p>
              <p className="mb-4">
                <strong>Conclusion:</strong> HBV vaccination coverage among healthcare workers in Kenya remains suboptimal, with significant disparities across professional categories. Comprehensive institutional policies, improved vaccine access, and targeted education programs are needed to enhance vaccination uptake. Regular post-vaccination serological testing should be implemented to ensure protective immunity, with booster doses administered when necessary. These findings highlight the urgent need for national guidelines and funding to support systematic HBV prevention programs for healthcare workers in Kenya.
              </p>
            </div>
            
            {/* Keywords */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-800 mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {["Hepatitis B virus", "Healthcare workers", "Vaccination", "Kenya", "Immunization", "Occupational health"].map(keyword => (
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
                    Mwangi A, Githinji G, Wanjiku C, Nganga L, Kariuki S, et al. (2022). Hepatitis B Vaccination Coverage Among Healthcare Workers in Kenyan Hospitals. Journal of Viral Hepatitis, 29(4), 321-330.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Funding</h3>
                  <p className="text-gray-600">
                    This research was funded by the Gastroenterology Society of Kenya and the Kenya Medical Research Institute (KEMRI) with additional support from the World Health Organization (WHO) Kenya Country Office.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Data Visualization */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Key Findings</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-4">HBV Vaccination Coverage by Professional Category</h3>
                  <div className="aspect-[4/3] relative">
                    <Image 
                      src="/research/publications/hepb-chart1.png" 
                      alt="HBV vaccination coverage chart" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Figure 1: HBV vaccination coverage (≥3 doses) across different healthcare worker categories.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-4">Reported Barriers to HBV Vaccination</h3>
                  <div className="aspect-[4/3] relative">
                    <Image 
                      src="/research/publications/hepb-chart2.png" 
                      alt="Barriers to vaccination chart" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Figure 2: Reported barriers to HBV vaccination among healthcare workers in Kenya.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Policy Recommendations */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Policy Recommendations</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#c22f61] text-white rounded-full flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-medium text-gray-800">Mandatory Vaccination Programs</h3>
                    <p className="text-gray-600">
                      Implement mandatory HBV vaccination programs for all healthcare workers at the institutional level, with special attention to non-clinical support staff who currently have the lowest coverage rates.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#c22f61] text-white rounded-full flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-medium text-gray-800">Cost Reduction Strategies</h3>
                    <p className="text-gray-600">
                      Develop cost reduction strategies, including institutional or government subsidization of HBV vaccination for healthcare workers, as cost was identified as a major barrier to vaccination.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#c22f61] text-white rounded-full flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-medium text-gray-800">Post-Vaccination Serological Testing</h3>
                    <p className="text-gray-600">
                      Implement routine post-vaccination serological testing to confirm immunity, with booster doses for non-responders or those with waning immunity.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#c22f61] text-white rounded-full flex items-center justify-center flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-medium text-gray-800">Education and Awareness</h3>
                    <p className="text-gray-600">
                      Strengthen education and awareness programs on HBV occupational risks and the benefits of vaccination, particularly targeting groups with lower knowledge levels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Author Information */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Corresponding Author</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden relative bg-gray-200 flex-shrink-0">
                  <Image 
                    src="/research/authors/mwangi-a.jpg" 
                    alt="Dr. Anne Mwangi" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Dr. Anne Mwangi, MBChB, MPH</h3>
                  <p className="text-gray-600">Department of Hepatology, Kenya Medical Research Institute</p>
                  <p className="text-gray-600">Email: a.mwangi@kemri.org</p>
                </div>
              </div>
            </div>
            
            {/* Related Publications */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Related Publications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/research/publications/nafld-kenya" className="block group">
                  <div className="bg-gray-50 p-6 rounded-lg h-full hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-gray-800 mb-2 group-hover:text-[#c22f61] transition-colors">
                      Prevalence of Non-Alcoholic Fatty Liver Disease in Urban Kenya and Associated Metabolic Risk Factors
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">Karanja J, et al. (2020)</p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      This study investigated the prevalence of non-alcoholic fatty liver disease in an urban Kenyan population and its association with metabolic syndrome components.
                    </p>
                  </div>
                </Link>
                
                <Link href="/research/publications/hpylori-infection-kenya" className="block group">
                  <div className="bg-gray-50 p-6 rounded-lg h-full hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-gray-800 mb-2 group-hover:text-[#c22f61] transition-colors">
                      Prevalence and Risk Factors of Helicobacter pylori Infection in Kenya: A Cross-Sectional Study
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">Kimani J, et al. (2023)</p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      This cross-sectional study investigated the prevalence and risk factors of Helicobacter pylori infection in various regions of Kenya.
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