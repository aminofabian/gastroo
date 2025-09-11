import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Calendar, User, MapPin, Target, Heart, Brain, Activity, Stethoscope, Zap, Scissors } from "lucide-react";

export const metadata: Metadata = {
  title: "Surgical Management of Gastric Cancer - Clinical Study | GSK",
  description: "Comprehensive study on surgical approaches and techniques for gastric cancer treatment. Preoperative evaluation, surgical procedures, and postoperative care.",
};

export default function GastricCancerSurgeryPage() {
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
              Surgical Oncology
            </span>
            <h1 className="text-5xl font-bold text-[#003366] mb-6 leading-tight">
              Surgical Management of Gastric Cancer
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
              Comprehensive surgical approaches and techniques for gastric cancer treatment. Preoperative evaluation, surgical procedures, and postoperative care.
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
              href="/presentations/Surgical Management of Gastric Cancer.pptx"
              download
              className="inline-flex items-center px-8 py-4 bg-[#003366] text-white hover:bg-[#002347] transition-colors duration-200 font-semibold text-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              Download PowerPoint File
            </a>
            <a
              href="/presentations/Surgical Management of Gastric Cancer.pptx"
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
                Gastric cancer remains a significant global health challenge. Surgical resection is the cornerstone of curative treatment, 
                with outcomes dependent on proper patient selection, surgical technique, and comprehensive perioperative care.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-8 mb-8">
                <h3 className="text-xl font-bold text-blue-800 mb-6">Surgical Principles:</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-3 text-lg">
                  <li>Complete tumor resection with negative margins</li>
                  <li>Adequate lymph node dissection</li>
                  <li>Preservation of organ function when possible</li>
                  <li>Minimization of surgical morbidity</li>
                  <li>Multidisciplinary approach to care</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Preoperative Evaluation */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Stethoscope className="w-8 h-8 mr-4 text-green-500" />
              Preoperative Evaluation
            </h2>
            <div className="space-y-8">
              <div className="bg-green-50 border-l-4 border-green-500 p-8">
                <h3 className="text-xl font-bold text-green-800 mb-6">Staging Assessment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-4">Imaging Studies</h4>
                    <ul className="space-y-2 text-green-700 text-lg">
                      <li>• CT scan with contrast</li>
                      <li>• Endoscopic ultrasound (EUS)</li>
                      <li>• PET-CT scan</li>
                      <li>• MRI imaging</li>
                      <li>• Laparoscopic staging</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-4">Laboratory Tests</h4>
                    <ul className="space-y-2 text-green-700 text-lg">
                      <li>• Complete blood count</li>
                      <li>• Comprehensive metabolic panel</li>
                      <li>• Tumor markers (CEA, CA 19-9)</li>
                      <li>• Nutritional assessment</li>
                      <li>• Cardiac evaluation</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-6">Patient Selection Criteria</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• Resectable disease without distant metastasis</li>
                  <li>• Adequate performance status (ECOG 0-2)</li>
                  <li>• Acceptable cardiac and pulmonary function</li>
                  <li>• Nutritional optimization when possible</li>
                  <li>• Patient understanding and consent</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Surgical Approaches */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Scissors className="w-8 h-8 mr-4 text-red-500" />
              Surgical Approaches
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-red-50 border-l-4 border-red-500 p-8">
                <h3 className="text-xl font-bold text-red-800 mb-6">Open Surgery</h3>
                <ul className="space-y-4 text-red-700 text-lg">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Total Gastrectomy</strong>
                      <p className="text-sm text-red-600 mt-1">Complete removal of stomach with reconstruction</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Subtotal Gastrectomy</strong>
                      <p className="text-sm text-red-600 mt-1">Partial gastric resection preserving gastric function</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Extended Resection</strong>
                      <p className="text-sm text-red-600 mt-1">Including adjacent organs when involved</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-8">
                <h3 className="text-xl font-bold text-blue-800 mb-6">Minimally Invasive Surgery</h3>
                <ul className="space-y-4 text-blue-700 text-lg">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Laparoscopic Gastrectomy</strong>
                      <p className="text-sm text-blue-600 mt-1">Reduced morbidity with comparable oncologic outcomes</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Robotic-Assisted Surgery</strong>
                      <p className="text-sm text-blue-600 mt-1">Enhanced precision and visualization</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 mr-3 mt-2"></div>
                    <div>
                      <strong>Hybrid Approaches</strong>
                      <p className="text-sm text-blue-600 mt-1">Combining laparoscopic and open techniques</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Lymph Node Dissection */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Brain className="w-8 h-8 mr-4 text-purple-500" />
              Lymph Node Dissection
            </h2>
            <div className="space-y-8">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-8">
                <h3 className="text-xl font-bold text-purple-800 mb-6">D1 vs D2 Dissection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 border border-purple-200">
                    <h4 className="font-bold text-purple-800 mb-3">D1 Dissection</h4>
                    <ul className="space-y-2 text-purple-700 text-sm">
                      <li>• Perigastric lymph nodes only</li>
                      <li>• Less extensive procedure</li>
                      <li>• Lower morbidity</li>
                      <li>• May be appropriate for early-stage disease</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 border border-purple-200">
                    <h4 className="font-bold text-purple-800 mb-3">D2 Dissection</h4>
                    <ul className="space-y-2 text-purple-700 text-sm">
                      <li>• Perigastric + regional lymph nodes</li>
                      <li>• More comprehensive staging</li>
                      <li>• Better oncologic outcomes</li>
                      <li>• Standard for advanced disease</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Lymph Node Stations</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Station 1-6: Perigastric nodes</li>
                    <li>• Station 7-11: Regional nodes</li>
                    <li>• Station 12-16: Distant nodes</li>
                    <li>• Minimum 15 nodes recommended</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Sentinel Node Mapping</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Emerging technique for early-stage disease</li>
                    <li>• Reduced morbidity</li>
                    <li>• Requires specialized expertise</li>
                    <li>• Still investigational</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Reconstruction Techniques */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Activity className="w-8 h-8 mr-4 text-orange-500" />
              Reconstruction Techniques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-8">
                <h3 className="text-xl font-bold text-orange-800 mb-6">After Total Gastrectomy</h3>
                <ul className="space-y-3 text-orange-700 text-lg">
                  <li>• Roux-en-Y esophagojejunostomy</li>
                  <li>• Jejunal pouch reconstruction</li>
                  <li>• Double tract reconstruction</li>
                  <li>• Jejunal interposition</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8">
                <h3 className="text-xl font-bold text-yellow-800 mb-6">After Subtotal Gastrectomy</h3>
                <ul className="space-y-3 text-yellow-700 text-lg">
                  <li>• Billroth I reconstruction</li>
                  <li>• Billroth II reconstruction</li>
                  <li>• Roux-en-Y gastrojejunostomy</li>
                  <li>• Jejunal interposition</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Perioperative Care */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Heart className="w-8 h-8 mr-4 text-green-500" />
              Perioperative Care
            </h2>
            <div className="space-y-8">
              <div className="bg-green-50 border-l-4 border-green-500 p-8">
                <h3 className="text-xl font-bold text-green-800 mb-6">Enhanced Recovery After Surgery (ERAS)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 border border-green-200">
                    <h4 className="font-bold text-green-800 mb-2">Preoperative</h4>
                    <ul className="space-y-1 text-green-700 text-sm">
                      <li>• Patient education</li>
                      <li>• Nutritional optimization</li>
                      <li>• Prehabilitation</li>
                      <li>• Smoking cessation</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 border border-green-200">
                    <h4 className="font-bold text-green-800 mb-2">Intraoperative</h4>
                    <ul className="space-y-1 text-green-700 text-sm">
                      <li>• Minimally invasive techniques</li>
                      <li>• Optimal pain management</li>
                      <li>• Fluid management</li>
                      <li>• Normothermia maintenance</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 border border-green-200">
                    <h4 className="font-bold text-green-800 mb-2">Postoperative</h4>
                    <ul className="space-y-1 text-green-700 text-sm">
                      <li>• Early mobilization</li>
                      <li>• Early enteral nutrition</li>
                      <li>• Multimodal analgesia</li>
                      <li>• Discharge planning</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Complications Management</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Anastomotic leak</li>
                    <li>• Bleeding</li>
                    <li>• Infection</li>
                    <li>• Dumping syndrome</li>
                    <li>• Nutritional deficiencies</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Quality Metrics</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• 30-day mortality</li>
                    <li>• Readmission rates</li>
                    <li>• Complication rates</li>
                    <li>• Length of stay</li>
                    <li>• Patient satisfaction</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Outcomes & Prognosis */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Zap className="w-8 h-8 mr-4 text-blue-500" />
              Outcomes & Prognosis
            </h2>
            <div className="space-y-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-8">
                <h3 className="text-xl font-bold text-blue-800 mb-6">Survival Outcomes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 border border-blue-200 text-center">
                    <div className="text-3xl font-bold text-blue-700 mb-2">60-80%</div>
                    <div className="text-sm text-blue-600">5-year survival (Stage I)</div>
                  </div>
                  <div className="bg-white p-4 border border-blue-200 text-center">
                    <div className="text-3xl font-bold text-blue-700 mb-2">30-50%</div>
                    <div className="text-sm text-blue-600">5-year survival (Stage II)</div>
                  </div>
                  <div className="bg-white p-4 border border-blue-200 text-center">
                    <div className="text-3xl font-bold text-blue-700 mb-2">10-30%</div>
                    <div className="text-sm text-blue-600">5-year survival (Stage III)</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Prognostic Factors</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Tumor stage (TNM)</li>
                    <li>• Lymph node involvement</li>
                    <li>• Surgical margin status</li>
                    <li>• Histologic grade</li>
                    <li>• Patient performance status</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Quality of Life</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Nutritional status</li>
                    <li>• Eating function</li>
                    <li>• Gastrointestinal symptoms</li>
                    <li>• Psychological well-being</li>
                    <li>• Social functioning</li>
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
                <li>Surgical resection remains the cornerstone of curative treatment</li>
                <li>Proper staging and patient selection are crucial for outcomes</li>
                <li>D2 lymph node dissection improves survival in advanced disease</li>
                <li>Minimally invasive techniques reduce morbidity without compromising oncologic outcomes</li>
                <li>ERAS protocols improve recovery and reduce complications</li>
                <li>Multidisciplinary approach ensures optimal patient care</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
