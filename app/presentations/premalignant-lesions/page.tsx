import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Calendar, User, MapPin, Target, Heart, Brain, Activity, Stethoscope, Zap, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Premalignant and Malignant Lesions of Upper GI Tract - Clinical Study | GSK",
  description: "Comprehensive study on early detection and management of upper gastrointestinal malignancies. Screening, diagnosis, and treatment approaches for premalignant and malignant lesions.",
};

export default function PremalignantLesionsPage() {
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
              Oncology
            </span>
            <h1 className="text-5xl font-bold text-[#003366] mb-6 leading-tight">
              Premalignant and Malignant Lesions of Upper GI Tract
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
              Early detection and management of upper gastrointestinal malignancies. Comprehensive screening, diagnosis, and treatment approaches.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3 text-[#003366]" />
              <span className="font-medium">GSK Clinical Team</span>
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
              href="/presentations/Premalignant and malignant lesions of the upper G. I tract.pptx"
              download
              className="inline-flex items-center px-8 py-4 bg-[#003366] text-white hover:bg-[#002347] transition-colors duration-200 font-semibold text-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              Download PowerPoint File
            </a>
            <a
              href="/presentations/Premalignant and malignant lesions of the upper G. I tract.pptx"
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
          {/* Overview */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Target className="w-8 h-8 mr-4 text-blue-500" />
              Overview
            </h2>
            <div className="prose prose-xl max-w-none">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Upper gastrointestinal malignancies represent a significant health burden worldwide. Early detection of premalignant 
                lesions and timely intervention are crucial for improving patient outcomes and survival rates.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-8 mb-8">
                <h3 className="text-xl font-bold text-blue-800 mb-6">Key Focus Areas:</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-3 text-lg">
                  <li>Early detection and screening strategies</li>
                  <li>Classification of premalignant lesions</li>
                  <li>Diagnostic approaches and staging</li>
                  <li>Treatment modalities and outcomes</li>
                  <li>Surveillance and follow-up protocols</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Anatomical Sites */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Stethoscope className="w-8 h-8 mr-4 text-green-500" />
              Anatomical Sites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 border-l-4 border-green-500 p-8">
                <h3 className="text-xl font-bold text-green-800 mb-6">Esophagus</h3>
                <ul className="space-y-3 text-green-700 text-lg">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Squamous Cell Carcinoma</strong>
                      <p className="text-sm text-green-600 mt-1">Most common in upper and middle esophagus</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Adenocarcinoma</strong>
                      <p className="text-sm text-green-600 mt-1">Associated with Barrett's esophagus</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Premalignant: Barrett's Esophagus</strong>
                      <p className="text-sm text-green-600 mt-1">Metaplastic change requiring surveillance</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-8">
                <h3 className="text-xl font-bold text-orange-800 mb-6">Stomach</h3>
                <ul className="space-y-3 text-orange-700 text-lg">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Adenocarcinoma</strong>
                      <p className="text-sm text-orange-600 mt-1">Most common gastric malignancy</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Gastrointestinal Stromal Tumor (GIST)</strong>
                      <p className="text-sm text-orange-600 mt-1">Mesenchymal tumor</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Premalignant: Gastric Atrophy, Intestinal Metaplasia</strong>
                      <p className="text-sm text-orange-600 mt-1">Chronic gastritis progression</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Risk Factors */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <AlertTriangle className="w-8 h-8 mr-4 text-red-500" />
              Risk Factors
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-red-50 border-l-4 border-red-500 p-8">
                <h3 className="text-xl font-bold text-red-800 mb-6">Modifiable Risk Factors</h3>
                <ul className="space-y-3 text-red-700 text-lg">
                  <li>• Tobacco smoking</li>
                  <li>• Alcohol consumption</li>
                  <li>• Dietary factors (processed meats, nitrates)</li>
                  <li>• Obesity and metabolic syndrome</li>
                  <li>• Helicobacter pylori infection</li>
                  <li>• Gastroesophageal reflux disease (GERD)</li>
                </ul>
              </div>
              <div className="bg-gray-50 border-l-4 border-gray-500 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Non-Modifiable Risk Factors</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• Age (increased risk with advancing age)</li>
                  <li>• Male gender</li>
                  <li>• Family history of GI cancers</li>
                  <li>• Genetic predisposition</li>
                  <li>• Previous history of GI malignancies</li>
                  <li>• Certain genetic syndromes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Screening & Early Detection */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Heart className="w-8 h-8 mr-4 text-purple-500" />
              Screening & Early Detection
            </h2>
            <div className="space-y-8">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-8">
                <h3 className="text-xl font-bold text-purple-800 mb-6">Screening Strategies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-4">High-Risk Populations</h4>
                    <ul className="space-y-2 text-purple-700 text-lg">
                      <li>• Barrett's esophagus patients</li>
                      <li>• Chronic GERD symptoms</li>
                      <li>• Family history of esophageal cancer</li>
                      <li>• Previous head/neck cancer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-4">Screening Methods</h4>
                    <ul className="space-y-2 text-purple-700 text-lg">
                      <li>• Upper GI endoscopy</li>
                      <li>• Chromoendoscopy</li>
                      <li>• Narrow-band imaging (NBI)</li>
                      <li>• Confocal laser endomicroscopy</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-6">Early Detection Benefits</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• Improved survival rates with early-stage detection</li>
                  <li>• Less invasive treatment options</li>
                  <li>• Better quality of life outcomes</li>
                  <li>• Reduced healthcare costs</li>
                  <li>• Opportunity for curative treatment</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Diagnostic Approaches */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Brain className="w-8 h-8 mr-4 text-blue-500" />
              Diagnostic Approaches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-8">
                <h3 className="text-xl font-bold text-blue-800 mb-6">Endoscopic Evaluation</h3>
                <ul className="space-y-3 text-blue-700 text-lg">
                  <li>• High-definition white light endoscopy</li>
                  <li>• Narrow-band imaging (NBI)</li>
                  <li>• Chromoendoscopy with dyes</li>
                  <li>• Confocal laser endomicroscopy</li>
                  <li>• Endoscopic ultrasound (EUS)</li>
                  <li>• Optical coherence tomography</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-8">
                <h3 className="text-xl font-bold text-green-800 mb-6">Tissue Sampling</h3>
                <ul className="space-y-3 text-green-700 text-lg">
                  <li>• Targeted biopsies</li>
                  <li>• Random biopsies (surveillance)</li>
                  <li>• Endoscopic mucosal resection (EMR)</li>
                  <li>• Endoscopic submucosal dissection (ESD)</li>
                  <li>• Brush cytology</li>
                  <li>• Liquid biopsy techniques</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Staging & Classification */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Activity className="w-8 h-8 mr-4 text-yellow-500" />
              Staging & Classification
            </h2>
            <div className="space-y-8">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8">
                <h3 className="text-xl font-bold text-yellow-800 mb-6">TNM Staging System</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-2">T (Tumor)</h4>
                    <p className="text-yellow-700 text-sm">Depth of tumor invasion</p>
                  </div>
                  <div className="bg-white p-4 border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-2">N (Nodes)</h4>
                    <p className="text-yellow-700 text-sm">Lymph node involvement</p>
                  </div>
                  <div className="bg-white p-4 border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-2">M (Metastasis)</h4>
                    <p className="text-yellow-700 text-sm">Distant metastasis</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Staging Modalities</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Endoscopic ultrasound (EUS)</li>
                    <li>• CT scan with contrast</li>
                    <li>• PET-CT scan</li>
                    <li>• MRI imaging</li>
                    <li>• Laparoscopic staging</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Histological Classification</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Adenocarcinoma</li>
                    <li>• Squamous cell carcinoma</li>
                    <li>• Neuroendocrine tumors</li>
                    <li>• Gastrointestinal stromal tumors</li>
                    <li>• Lymphomas</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Treatment Modalities */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Zap className="w-8 h-8 mr-4 text-purple-500" />
              Treatment Modalities
            </h2>
            <div className="space-y-8">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-8">
                <h3 className="text-xl font-bold text-purple-800 mb-6">Endoscopic Treatment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-4">Early-Stage Lesions</h4>
                    <ul className="space-y-2 text-purple-700 text-lg">
                      <li>• Endoscopic mucosal resection (EMR)</li>
                      <li>• Endoscopic submucosal dissection (ESD)</li>
                      <li>• Radiofrequency ablation (RFA)</li>
                      <li>• Cryotherapy</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-4">Palliative Procedures</h4>
                    <ul className="space-y-2 text-purple-700 text-lg">
                      <li>• Stent placement</li>
                      <li>• Laser therapy</li>
                      <li>• Photodynamic therapy</li>
                      <li>• Argon plasma coagulation</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Surgical Options</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Esophagectomy</li>
                    <li>• Gastrectomy</li>
                    <li>• Lymph node dissection</li>
                    <li>• Minimally invasive approaches</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Multimodal Therapy</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Neoadjuvant chemotherapy</li>
                    <li>• Adjuvant therapy</li>
                    <li>• Radiation therapy</li>
                    <li>• Targeted therapy</li>
                    <li>• Immunotherapy</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Surveillance & Follow-up */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8">Surveillance & Follow-up</h2>
            <div className="space-y-8">
              <div className="bg-green-50 border-l-4 border-green-500 p-8">
                <h3 className="text-xl font-bold text-green-800 mb-6">Surveillance Protocols</h3>
                <ul className="list-disc list-inside text-green-700 space-y-3 text-lg">
                  <li>Regular endoscopic surveillance for high-risk patients</li>
                  <li>Systematic biopsy protocols for Barrett's esophagus</li>
                  <li>Post-treatment surveillance schedules</li>
                  <li>Risk stratification for surveillance intervals</li>
                  <li>Quality metrics for surveillance programs</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Follow-up Care</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Regular clinical assessments</li>
                    <li>• Imaging surveillance</li>
                    <li>• Nutritional support</li>
                    <li>• Quality of life monitoring</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Outcome Measures</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Survival rates</li>
                    <li>• Disease-free survival</li>
                    <li>• Quality of life scores</li>
                    <li>• Treatment-related complications</li>
                  </ul>
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
                <li>Early detection significantly improves patient outcomes</li>
                <li>Risk stratification guides screening and surveillance protocols</li>
                <li>Multidisciplinary approach is essential for optimal care</li>
                <li>Endoscopic techniques offer minimally invasive treatment options</li>
                <li>Regular surveillance is crucial for high-risk patients</li>
                <li>Quality metrics ensure effective screening programs</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
