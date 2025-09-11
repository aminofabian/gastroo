import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Calendar, User, MapPin, AlertTriangle, Heart, Brain, Droplets, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Acute Liver Failure - Clinical Case Study | Dr. Otedo Amos | GSK",
  description: "Comprehensive case study of 8 patients with Acute Liver Failure by Dr. Otedo Amos, Consultant Physician & Gastroenterologist. Managed in Kisumu County Referral Hospital and Aga Khan Hospital, Kisumu (2022-2025)",
};

export default function AcuteLiverFailurePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/presentations"
          className="inline-flex items-center text-[#003366] hover:text-[#002347] mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Presentations
        </Link>

        {/* Header */}
        <div className="border-b border-gray-200 pb-8 mb-12">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-[#003366] text-white mb-4">
              Hepatology
            </span>
            <h1 className="text-5xl font-bold text-[#003366] mb-6 leading-tight">
              Acute Liver Failure (ALF)
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
              A comprehensive case study of 8 patients managed in Kisumu County Referral Hospital and Aga Khan Hospital, Kisumu (2022-2025)
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3 text-[#003366]" />
              <span className="font-medium">Dr. Otedo Amos – Consultant Physician & Gastroenterologist</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-[#003366]" />
              <span className="font-medium">2022-2025</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-[#003366]" />
              <span className="font-medium">Kisumu County Referral Hospital & Aga Khan Hospital</span>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mb-12 bg-gray-50 border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-[#003366] mb-8">Download Presentation</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="/presentations/Accute Liver Failure.pptx"
              download
              className="inline-flex items-center px-8 py-4 bg-[#003366] text-white hover:bg-[#002347] transition-colors duration-200 font-semibold text-lg"
            >
              <Download className="w-8 h-8 mr-4" />
              Download PowerPoint File
            </a>
            <a
              href="/presentations/Accute Liver Failure.pptx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white transition-colors duration-200 font-semibold text-lg"
            >
              <FileText className="w-8 h-8 mr-4" />
              Open in New Tab
            </a>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Definition & Introduction */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <AlertTriangle className="w-8 h-8 mr-4 text-red-500" />
              Definition & Introduction
            </h2>
            <div className="prose prose-xl max-w-none">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Acute Liver Failure (ALF) is a rare, life-threatening liver condition with rapid loss of function. 
                It presents with altered mental status and coagulopathy (INR &gt; 1.5) in patients without prior liver disease. 
                Often affects young adults, with high morbidity and mortality.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-8 mb-8">
                <h3 className="text-xl font-bold text-red-800 mb-6">Key Characteristics:</h3>
                <ul className="list-disc list-inside text-red-700 space-y-3 text-lg">
                  <li>Rare, life-threatening liver condition</li>
                  <li>Rapid loss of liver function</li>
                  <li>Altered mental status (hepatic encephalopathy)</li>
                  <li>Coagulopathy with INR &gt; 1.5</li>
                  <li>Occurs in patients without prior liver disease</li>
                  <li>Often affects young adults</li>
                  <li>High morbidity and mortality</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Case Report */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Heart className="w-8 h-8 mr-4 text-blue-500" />
              Case Series (2022–2025)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-6">Patient Demographics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Total Patients:</span>
                    <span className="font-bold text-[#003366] text-lg">8 patients</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Female:</span>
                    <span className="font-bold text-[#003366] text-lg">3 patients</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Male:</span>
                    <span className="font-bold text-[#003366] text-lg">5 patients</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-6">Treatment Locations</h3>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#003366] mr-3"></div>
                    Kisumu County Referral Hospital
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#003366] mr-3"></div>
                    Aga Khan Hospital, Kisumu
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#003366] mb-6">Causes Observed:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-6 text-center border-2 border-gray-200 hover:border-[#003366] transition-colors duration-200">
                  <span className="text-lg font-semibold text-gray-800">HIV</span>
                </div>
                <div className="bg-white p-6 text-center border-2 border-gray-200 hover:border-[#003366] transition-colors duration-200">
                  <span className="text-lg font-semibold text-gray-800">Anti-TB Drugs</span>
                </div>
                <div className="bg-white p-6 text-center border-2 border-gray-200 hover:border-[#003366] transition-colors duration-200">
                  <span className="text-lg font-semibold text-gray-800">Herbs</span>
                </div>
                <div className="bg-white p-6 text-center border-2 border-gray-200 hover:border-[#003366] transition-colors duration-200">
                  <span className="text-lg font-semibold text-gray-800">Sepsis</span>
                </div>
                <div className="bg-white p-6 text-center border-2 border-gray-200 hover:border-[#003366] transition-colors duration-200 col-span-2 md:col-span-1">
                  <span className="text-lg font-semibold text-gray-800">Unknown</span>
                </div>
              </div>
            </div>
          </section>

          {/* Diagnosis */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Activity className="w-8 h-8 mr-4 text-green-500" />
              Diagnosis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-4">Clinical</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>• Jaundice</li>
                  <li>• RUQ pain</li>
                  <li>• Ascites</li>
                  <li>• Encephalopathy</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-4">Laboratory</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>• LFTs</li>
                  <li>• INR</li>
                  <li>• CBC</li>
                  <li>• Ammonia</li>
                  <li>• Lactate</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-4">Imaging & Tests</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>• Ultrasound (ascites common)</li>
                  <li>• Viral hepatitis panels</li>
                  <li>• Toxin screens</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pathophysiology */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Brain className="w-8 h-8 mr-4 text-purple-500" />
              Pathophysiology
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Rapid hepatocyte failure leads to toxin buildup, resulting in cerebral edema and multi-organ dysfunction.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200  p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Pathophysiological Cascade:</h3>
                <ol className="list-decimal list-inside text-purple-700 space-y-3 text-lg">
                  <li><strong>Rapid hepatocyte failure</strong> → Loss of liver function</li>
                  <li><strong>Toxin buildup</strong> → Accumulation of harmful substances</li>
                  <li><strong>Cerebral edema</strong> → Brain swelling</li>
                  <li><strong>Multi-organ dysfunction</strong> → Systemic complications</li>
                </ol>
              </div>
              <div className="mt-6 bg-blue-50 border border-blue-200  p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Role of Neutrophil Extracellular Traps (NETs):</h3>
                <p className="text-blue-700 text-lg leading-relaxed">
                  NETs are implicated in inflammation, cytotoxicity, and thrombosis formation in ALF.
                </p>
              </div>
            </div>
          </section>

          {/* Etiology */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8">Etiology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-4">Viral Hepatitis</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>• Hepatitis A, B, E</li>
                  <li>• Especially E in pregnancy</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-4">Drugs</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>• Acetaminophen</li>
                  <li>• NSAIDs</li>
                  <li>• Antibiotics</li>
                  <li>• Anti-TB drugs</li>
                  <li>• Herbs</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-4">Toxins</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>• Mushrooms</li>
                  <li>• Carbon tetrachloride</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-4">Other Causes</h3>
                <ul className="space-y-2 text-gray-700 text-lg">
                  <li>• Pregnancy-related syndromes (HELLP, acute fatty liver, eclampsia)</li>
                  <li>• Autoimmune hepatitis</li>
                  <li>• Vascular disorders</li>
                  <li>• Malignancy</li>
                  <li>• Sepsis</li>
                  <li>• Unknown causes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Clinical Presentation */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8">Clinical Presentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Early Symptoms</h3>
                <div className="bg-green-50 border border-green-200  p-4">
                  <ul className="space-y-2 text-green-700">
                    <li>• Fatigue</li>
                    <li>• Nausea</li>
                    <li>• Abdominal pain</li>
                    <li>• Subtle mental changes</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progressive Symptoms</h3>
                <div className="bg-orange-50 border border-orange-200  p-4">
                  <ul className="space-y-2 text-orange-700">
                    <li>• Jaundice</li>
                    <li>• Hepatic encephalopathy</li>
                    <li>• Coagulopathy</li>
                    <li>• Multi-organ dysfunction</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hepatic Encephalopathy Grading</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Grade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Clinical Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Grade 1</td>
                      <td className="border border-gray-300 px-4 py-2">Mild confusion, altered mood</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Grade 2</td>
                      <td className="border border-gray-300 px-4 py-2">Lethargy, inappropriate behavior</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Grade 3</td>
                      <td className="border border-gray-300 px-4 py-2">Marked confusion, stupor</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Grade 4</td>
                      <td className="border border-gray-300 px-4 py-2">Coma</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Treatment */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8">Treatment</h2>
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-6">ICU Care</h3>
                <p className="text-lg text-gray-700 mb-4">
                  Organ support and close monitoring
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Supportive Therapy</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Fluids</li>
                    <li>• Vitamin K</li>
                    <li>• Rifaximin</li>
                    <li>• Lactulose</li>
                    <li>• Oxygen</li>
                    <li>• Mannitol</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Advanced Therapies</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Cause-specific therapy</li>
                    <li>• Liver transplant (best treatment)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Complications */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8">Complications</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-8">
              <h3 className="text-xl font-bold text-red-800 mb-6">Major Complications:</h3>
              <ul className="list-disc list-inside text-red-700 space-y-3 text-lg">
                <li>Hepatic encephalopathy</li>
                <li>Cerebral edema</li>
                <li>Renal failure</li>
                <li>Infections</li>
                <li>Coagulopathy</li>
                <li>Metabolic imbalances</li>
              </ul>
            </div>
          </section>

          {/* Challenges */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8">Challenges in Kenya</h2>
            <div className="space-y-8">
              <div className="bg-red-50 border-l-4 border-red-500 p-8">
                <h3 className="text-xl font-bold text-red-800 mb-6">High ICU Costs</h3>
                <p className="text-lg text-red-700 mb-4">30k–250k KES/day in private</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-orange-50 border-l-4 border-orange-500 p-8">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">Resource Shortages</h3>
                  <ul className="space-y-3 text-orange-700 text-lg">
                    <li>• Shortage of ICU beds</li>
                    <li>• Specialized staff shortage</li>
                    <li>• Diagnostic resources limited</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-8">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">System Issues</h3>
                  <ul className="space-y-3 text-blue-700 text-lg">
                    <li>• Delays in referral worsen outcomes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Prognosis */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8">Prognosis</h2>
            <div className="space-y-8">
              <div className="bg-green-50 border-l-4 border-green-500 p-8">
                <h3 className="text-xl font-bold text-green-800 mb-6">Kisumu Study Outcomes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-700">5</div>
                    <div className="text-lg text-green-600 font-medium">Survived</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-700">3</div>
                    <div className="text-lg text-red-600 font-medium">Died</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-700">62.5%</div>
                    <div className="text-lg text-blue-600 font-medium">Survival Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Prognosis Depends On:</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Cause of ALF</li>
                    <li>• Timing of treatment</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Better Outcomes With:</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Advanced liver support</li>
                    <li>• Transplantation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8">Conclusion</h2>
            <div className="prose prose-lg max-w-none">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-8">
                <p className="text-lg text-blue-800 mb-6 leading-relaxed">
                  ALF can be managed with strong infrastructure and early diagnosis.
                </p>
                <h3 className="text-xl font-bold text-blue-800 mb-4">Key Requirements:</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-3 text-lg">
                  <li>Improving health systems and referral networks is crucial</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
