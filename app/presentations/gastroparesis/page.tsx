import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Calendar, User, MapPin, Target, Heart, Brain, Activity, Stethoscope, Zap, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Gastroparesis Management - Clinical Study | GSK",
  description: "Comprehensive study on gastroparesis diagnosis and treatment approaches. Management strategies for delayed gastric emptying and associated symptoms.",
};

export default function GastroparesisPage() {
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
              Gastric Disorders
            </span>
            <h1 className="text-5xl font-bold text-[#003366] mb-6 leading-tight">
              Gastroparesis Management
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
              Comprehensive diagnosis and treatment approaches for gastroparesis - delayed gastric emptying and associated symptoms
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3 text-[#003366]" />
              <span className="font-medium">GSK Clinical Team</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-[#003366]" />
              <span className="font-medium">May 2025</span>
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
              href="/presentations/Gastroparesis may 2025.pptx"
              download
              className="inline-flex items-center px-8 py-4 bg-[#003366] text-white hover:bg-[#002347] transition-colors duration-200 font-semibold text-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              Download PowerPoint File
            </a>
            <a
              href="/presentations/Gastroparesis may 2025.pptx"
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
          {/* Definition & Overview */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Clock className="w-8 h-8 mr-4 text-blue-500" />
              Definition & Overview
            </h2>
            <div className="prose prose-xl max-w-none">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Gastroparesis is a chronic condition characterized by delayed gastric emptying in the absence of mechanical obstruction. 
                It affects the normal movement of food from the stomach to the small intestine, leading to various gastrointestinal symptoms.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-8 mb-8">
                <h3 className="text-xl font-bold text-blue-800 mb-6">Key Characteristics:</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-3 text-lg">
                  <li>Delayed gastric emptying without mechanical obstruction</li>
                  <li>Chronic condition affecting gastric motility</li>
                  <li>Common in patients with diabetes mellitus</li>
                  <li>Can be idiopathic or secondary to various causes</li>
                  <li>Significantly impacts quality of life</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Etiology & Risk Factors */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Target className="w-8 h-8 mr-4 text-green-500" />
              Etiology & Risk Factors
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-green-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-6">Primary Causes</h3>
                <ul className="space-y-4 text-gray-700 text-lg">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#003366] mr-3 mt-2"></div>
                    <div>
                      <strong>Diabetes Mellitus</strong>
                      <p className="text-sm text-gray-600 mt-1">Most common cause, especially type 1 diabetes</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#003366] mr-3 mt-2"></div>
                    <div>
                      <strong>Idiopathic Gastroparesis</strong>
                      <p className="text-sm text-gray-600 mt-1">Unknown cause, often affects young women</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#003366] mr-3 mt-2"></div>
                    <div>
                      <strong>Post-surgical</strong>
                      <p className="text-sm text-gray-600 mt-1">Following gastric or esophageal surgery</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-6">Secondary Causes</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• Medications (opioids, anticholinergics)</li>
                  <li>• Neurological disorders (Parkinson's, MS)</li>
                  <li>• Connective tissue diseases</li>
                  <li>• Viral infections</li>
                  <li>• Eating disorders</li>
                  <li>• Hypothyroidism</li>
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
              <div className="bg-red-50 border-l-4 border-red-500 p-8">
                <h3 className="text-xl font-bold text-red-800 mb-6">Primary Symptoms</h3>
                <ul className="space-y-3 text-red-700 text-lg">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 mr-3"></div>
                    Nausea and vomiting
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 mr-3"></div>
                    Early satiety
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 mr-3"></div>
                    Postprandial fullness
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 mr-3"></div>
                    Abdominal pain
                  </li>
                </ul>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-8">
                <h3 className="text-xl font-bold text-orange-800 mb-6">Secondary Symptoms</h3>
                <ul className="space-y-3 text-orange-700 text-lg">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-600 mr-3"></div>
                    Weight loss
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-600 mr-3"></div>
                    Malnutrition
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-600 mr-3"></div>
                    Dehydration
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-600 mr-3"></div>
                    Poor glycemic control (in diabetics)
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
                <h3 className="text-xl font-bold text-[#003366] mb-6">Initial Assessment</h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li>• Detailed history and physical examination</li>
                  <li>• Rule out mechanical obstruction</li>
                  <li>• Assess for underlying conditions</li>
                  <li>• Review medication history</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-8">
                <h3 className="text-xl font-bold text-green-800 mb-6">Diagnostic Tests</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-4">Gastric Emptying Scintigraphy</h4>
                    <ul className="space-y-2 text-green-700 text-lg">
                      <li>• Gold standard test</li>
                      <li>• Measures gastric emptying rate</li>
                      <li>• Solid meal with radiolabeled marker</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-4">Other Diagnostic Tools</h4>
                    <ul className="space-y-2 text-green-700 text-lg">
                      <li>• Upper GI endoscopy</li>
                      <li>• Gastric manometry</li>
                      <li>• Breath tests</li>
                      <li>• Wireless motility capsule</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Severity Classification */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Brain className="w-8 h-8 mr-4 text-purple-500" />
              Severity Classification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="text-lg font-bold text-green-800 mb-4">Mild</h3>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Symptoms easily controlled</li>
                  <li>• Normal weight maintenance</li>
                  <li>• Occasional nausea/vomiting</li>
                  <li>• Minimal impact on daily life</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                <h3 className="text-lg font-bold text-yellow-800 mb-4">Moderate</h3>
                <ul className="space-y-2 text-yellow-700 text-sm">
                  <li>• Symptoms partially controlled</li>
                  <li>• Some weight loss</li>
                  <li>• Frequent nausea/vomiting</li>
                  <li>• Moderate impact on daily life</li>
                </ul>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="text-lg font-bold text-red-800 mb-4">Severe</h3>
                <ul className="space-y-2 text-red-700 text-sm">
                  <li>• Symptoms poorly controlled</li>
                  <li>• Significant weight loss</li>
                  <li>• Persistent nausea/vomiting</li>
                  <li>• Major impact on daily life</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Treatment Approaches */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Activity className="w-8 h-8 mr-4 text-blue-500" />
              Treatment Approaches
            </h2>
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-[#003366] mb-6">Multidisciplinary Approach</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Treatment requires a comprehensive, multidisciplinary approach involving dietary modifications, 
                  medications, and in severe cases, procedural interventions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-8">
                  <h3 className="text-xl font-bold text-blue-800 mb-6">Dietary Management</h3>
                  <ul className="space-y-3 text-blue-700 text-lg">
                    <li>• Small, frequent meals</li>
                    <li>• Low-fat, low-fiber diet</li>
                    <li>• Liquid nutrition supplements</li>
                    <li>• Avoid high-fat and high-fiber foods</li>
                    <li>• Adequate hydration</li>
                  </ul>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-8">
                  <h3 className="text-xl font-bold text-green-800 mb-6">Medical Therapy</h3>
                  <ul className="space-y-3 text-green-700 text-lg">
                    <li>• Prokinetic agents (metoclopramide, domperidone)</li>
                    <li>• Antiemetic medications</li>
                    <li>• Pain management</li>
                    <li>• Blood glucose control (in diabetics)</li>
                    <li>• Nutritional support</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Treatment Options */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center">
              <Zap className="w-8 h-8 mr-4 text-purple-500" />
              Advanced Treatment Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-8">
                <h3 className="text-xl font-bold text-purple-800 mb-6">Endoscopic Procedures</h3>
                <ul className="space-y-3 text-purple-700 text-lg">
                  <li>• Botulinum toxin injection</li>
                  <li>• Gastric electrical stimulation</li>
                  <li>• Endoscopic pyloromyotomy</li>
                  <li>• Gastric peroral endoscopic myotomy (G-POEM)</li>
                </ul>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-8">
                <h3 className="text-xl font-bold text-orange-800 mb-6">Surgical Options</h3>
                <ul className="space-y-3 text-orange-700 text-lg">
                  <li>• Gastric bypass surgery</li>
                  <li>• Gastric resection</li>
                  <li>• Feeding tube placement</li>
                  <li>• Gastric pacemaker implantation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Complications & Prognosis */}
          <section className="border-l-4 border-[#003366] pl-8 py-6">
            <h2 className="text-3xl font-bold text-[#003366] mb-8">Complications & Prognosis</h2>
            <div className="space-y-8">
              <div className="bg-red-50 border-l-4 border-red-500 p-8">
                <h3 className="text-xl font-bold text-red-800 mb-6">Potential Complications</h3>
                <ul className="list-disc list-inside text-red-700 space-y-3 text-lg">
                  <li>Malnutrition and weight loss</li>
                  <li>Dehydration and electrolyte imbalances</li>
                  <li>Poor glycemic control in diabetics</li>
                  <li>Bezoar formation</li>
                  <li>Esophageal complications</li>
                  <li>Reduced quality of life</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Prognosis Factors</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Underlying cause</li>
                    <li>• Severity of symptoms</li>
                    <li>• Response to treatment</li>
                    <li>• Patient compliance</li>
                    <li>• Presence of complications</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Long-term Outlook</h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li>• Chronic condition requiring ongoing management</li>
                    <li>• Quality of life improvement with treatment</li>
                    <li>• Regular monitoring required</li>
                    <li>• Multidisciplinary care essential</li>
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
                <li>Gastroparesis is a chronic condition requiring comprehensive management</li>
                <li>Diabetes mellitus is the most common cause</li>
                <li>Gastric emptying scintigraphy is the gold standard for diagnosis</li>
                <li>Treatment involves dietary modifications, medications, and advanced procedures</li>
                <li>Multidisciplinary approach improves patient outcomes</li>
                <li>Early diagnosis and intervention are crucial for quality of life</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
