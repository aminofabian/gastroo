import { Metadata } from "next";
import Link from "next/link";
import { FileText, Download, Calendar, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Presentations | GSK",
  description: "Educational presentations and clinical case studies from the Gastroenterology Society of Kenya",
};

const presentations = [
  {
    id: "acute-liver-failure",
    title: "Acute Liver Failure",
    description: "A comprehensive case study of 8 patients managed in Kisumu County Referral Hospital and Aga Khan Hospital, Kisumu (2022-2025)",
    author: "GSK Clinical Team",
    date: "2025",
    category: "Hepatology",
    fileName: "Accute Liver Failure.pptx",
    slug: "acute-liver-failure"
  },
  {
    id: "esophageal",
    title: "Esophageal Motility Disorders",
    description: "Diagnosis, classification using Chicago v4.0, and management principles with high-resolution manometry",
    author: "Edna Kamau",
    date: "2025",
    category: "Esophageal",
    fileName: "Esophageal.pptx",
    slug: "esophageal"
  },
  {
    id: "gastroparesis",
    title: "Gastroparesis Management",
    description: "Comprehensive diagnosis and treatment approaches for gastroparesis - delayed gastric emptying and associated symptoms",
    author: "GSK Clinical Team",
    date: "May 2025",
    category: "Gastric",
    fileName: "Gastroparesis may 2025.pptx",
    slug: "gastroparesis"
  },
  {
    id: "premalignant-lesions",
    title: "Premalignant and Malignant Lesions of Upper GI Tract",
    description: "Early detection and management of upper gastrointestinal malignancies. Comprehensive screening, diagnosis, and treatment approaches.",
    author: "GSK Clinical Team",
    date: "2025",
    category: "Oncology",
    fileName: "Premalignant and malignant lesions of the upper G. I tract.pptx",
    slug: "premalignant-lesions"
  },
  {
    id: "gastric-cancer-surgery",
    title: "Surgical Management of Gastric Cancer",
    description: "Comprehensive surgical approaches and techniques for gastric cancer treatment. Preoperative evaluation, surgical procedures, and postoperative care.",
    author: "GSK Clinical Team",
    date: "2025",
    category: "Surgery",
    fileName: "Surgical Management of Gastric Cancer.pptx",
    slug: "gastric-cancer-surgery"
  }
];

export default function PresentationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-20 border-b border-gray-200 pb-12">
          <h1 className="text-5xl font-bold mb-6 text-[#003366] leading-tight">
            Clinical Presentations
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Educational presentations and clinical case studies from the Gastroenterology Society of Kenya. 
            Access our comprehensive collection of clinical materials and research findings.
          </p>
        </div>

        {/* Presentations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {presentations.map((presentation) => (
            <div 
              key={presentation.id}
              className="bg-white shadow-lg overflow-hidden border border-gray-200 
                         transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-[#003366] text-white">
                    {presentation.category}
                  </span>
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-gray-900 line-clamp-2">
                  {presentation.title}
                </h2>
                
                <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">
                  {presentation.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-600 mb-6">
                  <User className="w-5 h-5 mr-2 text-[#003366]" />
                  <span className="mr-6 font-medium">{presentation.author}</span>
                  <Calendar className="w-5 h-5 mr-2 text-[#003366]" />
                  <span className="font-medium">{presentation.date}</span>
                </div>
                
                <div className="flex gap-4">
                  <Link
                    href={`/presentations/${presentation.slug}`}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-[#003366] text-white hover:bg-[#002347] transition-colors duration-200 font-semibold"
                  >
                    View Details
                  </Link>
                  <a
                    href={`/presentations/${presentation.fileName}`}
                    download
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white transition-colors duration-200 font-semibold"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white  shadow-sm border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-[#003366] mb-4">About Our Presentations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Clinical Excellence</h4>
              <p className="text-gray-600">
                Our presentations are developed by experienced gastroenterologists and hepatologists 
                based on real clinical cases and evidence-based medicine.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Educational Value</h4>
              <p className="text-gray-600">
                Each presentation includes comprehensive case studies, diagnostic approaches, 
                treatment protocols, and clinical outcomes to enhance medical education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
