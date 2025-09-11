import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Calendar, User, MapPin, Target, Heart, Brain, Activity, Stethoscope, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Esophageal Motility Disorders - Clinical Study | Edna Kamau | GSK",
  description: "Comprehensive study on esophageal motility disorders by Edna Kamau. Diagnosis, classification using Chicago v4.0, and management principles with high-resolution manometry.",
};

export default function EsophagealPage() {
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
              Esophageal Disorders
            </span>
            <h1 className="text-5xl font-bold text-[#003366] mb-6 leading-tight">
              Esophageal Motility Disorders
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
              Diagnosis, classification using Chicago v4.0, and management principles with high-resolution manometry
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3 text-[#003366]" />
              <span className="font-medium">Edna Kamau</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-[#003366]" />
              <span className="font-medium">2025</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-[#003366]" />
              <span className="font-medium">GSK Clinical Research</span>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mb-12 bg-gray-50 border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-[#003366] mb-8">Download Presentation</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="/presentations/Esophageal.pptx"
              download
              className="inline-flex items-center px-8 py-4 bg-[#003366] text-white hover:bg-[#002347] transition-colors duration-200 font-semibold text-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              Download PowerPoint File
            </a>
            <a
              href="/presentations/Esophageal.pptx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white transition-colors duration-200 font-semibold text-lg"
            >
              <FileText className="w-6 h-6 mr-3" />
              Open in New Tab
            </a>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Objectives */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Target className="w-8 h-8 mr-4 text-blue-500" />
              Objectives
            </h2>
            <div className="prose prose-xl max-w-none">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-8 mb-8">
                <h3 className="text-xl font-bold text-blue-800 mb-6">Learning Objectives:</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-3 text-lg">
                  <li>Diagnose and classify esophageal motility disorders (Chicago v4.0)</li>
                  <li>Highlight role of high-resolution manometry (HRM)</li>
                  <li>Review management principles</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Clinical Presentation */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Heart className="w-8 h-8 mr-4 text-red-500" />
              Clinical Presentation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-4">Primary Symptoms</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#003366] mr-3"></div>
                    Dysphagia (to solids and liquids)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#003366] mr-3"></div>
                    Food sticking in chest/neck
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#003366] mr-3"></div>
                    Non-cardiac chest pain
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-4">Secondary Symptoms</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#003366] mr-3"></div>
                    Regurgitation
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#003366] mr-3"></div>
                    Refractory heartburn
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Diagnosis */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Stethoscope className="w-8 h-8 mr-4 text-green-500" />
              Diagnosis
            </h2>
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-6">Upper GI Endoscopy</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Rules out structural/mucosal disease
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-8">
                <h3 className="text-xl font-bold text-green-800 mb-6">Esophageal Manometry (Gold Standard)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-4">High-Resolution Manometry (HRM) & Impedance Manometry</h4>
                    <ul className="space-y-2 text-green-700 text-lg">
                      <li>• Assess EGJ pressure</li>
                      <li>• Evaluate relaxation</li>
                      <li>• Measure peristalsis</li>
                      <li>• Detect spasms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-4">Key Metrics</h4>
                    <ul className="space-y-2 text-green-700 text-lg">
                      <li>• Integrated Relaxation Pressure (IRP)</li>
                      <li>• Distal Contractile Integral (DCI)</li>
                      <li>• Distal Latency (DL)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Chicago Classification v4.0 */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Brain className="w-8 h-8 mr-4 text-purple-500" />
              Chicago Classification v4.0
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-8">
                <h3 className="text-xl font-bold text-purple-800 mb-6">EGJ Outflow Disorders</h3>
                <ul className="space-y-4 text-purple-700 text-lg">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Achalasia</strong>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 mr-3 mt-2"></div>
                    <div>
                      <strong>EGJ Outflow Obstruction (EGJOO)</strong>
                      <p className="text-sm text-purple-600 mt-1">Evaluated with HRM, barium swallow, ENDOFLIP</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-8">
                <h3 className="text-xl font-bold text-blue-800 mb-6">Peristaltic Disorders</h3>
                <ul className="space-y-4 text-blue-700 text-lg">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Hypomotility:</strong>
                      <ul className="ml-4 mt-2 space-y-1 text-sm">
                        <li>• Ineffective motility</li>
                        <li>• Absent contractility</li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Distal esophageal spasm:</strong>
                      <p className="text-sm text-blue-600 mt-1">Abnormal premature contractions</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Case Reports */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Activity className="w-8 h-8 mr-4 text-orange-500" />
              Case Reports
            </h2>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-8">
              <h3 className="text-xl font-bold text-orange-800 mb-6">Clinical Examples</h3>
              <p className="text-lg text-orange-700 leading-relaxed mb-4">
                Examples of patients with reduced DCI and peristaltic breaks showing ineffective motility.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Reduced DCI</h4>
                  <p className="text-orange-700">Distal Contractile Integral below normal range</p>
                </div>
                <div className="bg-white p-6 border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Peristaltic Breaks</h4>
                  <p className="text-orange-700">Discontinuity in esophageal peristaltic wave</p>
                </div>
              </div>
            </div>
          </section>

          {/* Clinical Value of HRM */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Zap className="w-8 h-8 mr-4 text-yellow-500" />
              Clinical Value of HRM
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8">
                <h3 className="text-xl font-bold text-yellow-800 mb-4">Surgical Planning</h3>
                <ul className="space-y-3 text-yellow-700 text-lg">
                  <li>• Guides surgical planning (e.g., fundoplication)</li>
                  <li>• Identifies patients at risk of postoperative dysphagia</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-4">Diagnostic Benefits</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• Precise motility assessment</li>
                  <li>• Objective measurement of esophageal function</li>
                  <li>• Risk stratification for surgical procedures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Management Principles */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8">Management Principles</h2>
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-6">Management Approach</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Management depends on the underlying disorder and includes various therapeutic options.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 border-2 border-gray-200 hover:border-[#003366] transition-colors duration-200">
                  <h4 className="font-bold text-[#003366] mb-3">Medical Therapy</h4>
                  <p className="text-gray-700 text-sm">Pharmacological interventions</p>
                </div>
                <div className="bg-white p-6 border-2 border-gray-200 hover:border-[#003366] transition-colors duration-200">
                  <h4 className="font-bold text-[#003366] mb-3">Endoscopic Dilation</h4>
                  <p className="text-gray-700 text-sm">Mechanical dilation procedures</p>
                </div>
                <div className="bg-white p-6 border-2 border-gray-200 hover:border-[#003366] transition-colors duration-200">
                  <h4 className="font-bold text-[#003366] mb-3">Surgical Intervention</h4>
                  <p className="text-gray-700 text-sm">Heller myotomy, POEM</p>
                </div>
                <div className="bg-white p-6 border-2 border-gray-200 hover:border-[#003366] transition-colors duration-200">
                  <h4 className="font-bold text-[#003366] mb-3">Supportive Care</h4>
                  <p className="text-gray-700 text-sm">Symptom management</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8">Key Takeaways</h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-8">
              <h3 className="text-xl font-bold text-green-800 mb-6">Summary Points:</h3>
              <ul className="list-disc list-inside text-green-700 space-y-3 text-lg">
                <li>High-resolution manometry is the gold standard for diagnosing esophageal motility disorders</li>
                <li>Chicago Classification v4.0 provides systematic approach to classification</li>
                <li>HRM guides surgical planning and identifies postoperative risks</li>
                <li>Management is tailored to specific disorder type and patient presentation</li>
                <li>Early diagnosis improves patient outcomes and quality of life</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
