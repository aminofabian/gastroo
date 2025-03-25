import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Colonoscopy Standards | GSK - Gastroenterology Society of Kenya",
  description: "Quality indicators and best practices for colonoscopy procedures in Kenya",
};

export default function ColonoscopyStandardsPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-playfair font-bold mb-2">Colonoscopy Standards</h1>
          <p className="text-muted-foreground">Last updated: February 2023</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Link href="/guidelines">
              Back to Guidelines
            </Link>
          </Button>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
        <p>
          Colonoscopy is a fundamental procedure in gastroenterology for the diagnosis, screening, surveillance, and treatment 
          of colorectal disorders. These guidelines provide a framework for performing high-quality colonoscopy procedures in Kenya, 
          balancing international best practices with local resource considerations.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Preprocedural Considerations</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Indications</h3>
        <p>
          Colonoscopy is indicated for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Evaluation of abnormal colorectal imaging findings</li>
          <li>Evaluation of unexplained gastrointestinal bleeding</li>
          <li>Iron deficiency anemia</li>
          <li>Evaluation of significant diarrhea of unexplained origin</li>
          <li>Evaluation of inflammatory bowel disease</li>
          <li>Clinically significant chronic constipation</li>
          <li>Colorectal cancer screening</li>
          <li>Surveillance after polypectomy</li>
          <li>Surveillance after colorectal cancer resection</li>
          <li>Intraoperative location of a lesion not apparent at surgery</li>
          <li>Treatment of bleeding from lesions such as vascular malformation or ulceration</li>
          <li>Removal of foreign body</li>
          <li>Decompression of acute non-toxic megacolon or sigmoid volvulus</li>
          <li>Balloon dilation of stenotic lesions</li>
          <li>Palliative treatment of neoplastic lesions</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">Contraindications</h3>
        <p>
          Absolute contraindications include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Fulminant colitis</li>
          <li>Suspected perforation</li>
          <li>Acute peritonitis</li>
          <li>Acute diverticulitis</li>
          <li>Recent myocardial infarction or pulmonary embolism (&lt;3 months)</li>
          <li>Inadequate bowel preparation</li>
        </ul>
        <p className="mt-4">
          Relative contraindications include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Large abdominal aortic aneurysm</li>
          <li>Severe thrombocytopenia</li>
          <li>Severe coagulopathy</li>
          <li>Recent colorectal surgery</li>
          <li>Pregnancy (especially third trimester)</li>
          <li>Severe cardiopulmonary disease</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Quality Indicators</h2>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-3">Key Performance Indicators</h3>
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left">Indicator</th>
                  <th className="py-3 px-4 text-left">Minimum Standard</th>
                  <th className="py-3 px-4 text-left">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4">Cecal intubation rate</td>
                  <td className="py-3 px-4">≥90%</td>
                  <td className="py-3 px-4">≥95%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Adenoma detection rate</td>
                  <td className="py-3 px-4">≥25%</td>
                  <td className="py-3 px-4">≥30%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Withdrawal time (normal colonoscopy)</td>
                  <td className="py-3 px-4">≥6 minutes</td>
                  <td className="py-3 px-4">8-10 minutes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Adequate bowel preparation rate</td>
                  <td className="py-3 px-4">≥85%</td>
                  <td className="py-3 px-4">≥90%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Polyp retrieval rate</td>
                  <td className="py-3 px-4">≥90%</td>
                  <td className="py-3 px-4">≥95%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Perforation rate</td>
                  <td className="py-3 px-4">&lt;1:1000</td>
                  <td className="py-3 px-4">&lt;1:2000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Post-polypectomy bleeding rate</td>
                  <td className="py-3 px-4">&lt;1:100</td>
                  <td className="py-3 px-4">&lt;1:200</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Bowel Preparation</h3>
        <p>
          Adequate bowel preparation is essential for a high-quality colonoscopy. Recommended protocols include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Split-dose polyethylene glycol (PEG) regimen (preferred)</li>
          <li>Low-volume PEG plus ascorbic acid</li>
          <li>Sodium picosulfate/magnesium citrate solutions</li>
        </ul>
        <p className="mt-4">
          Special considerations for resource-limited settings:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Mannitol solutions as an alternative when commercial preparations are unavailable</li>
          <li>Modification of diet (clear liquids for 24-48 hours) before procedure</li>
          <li>Education programs for patients to improve compliance with preparation instructions</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Colonoscopic Polypectomy</h2>
        <p>
          Recommendations for polypectomy technique based on polyp characteristics:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Diminutive polyps (1-5mm):</strong> Cold snare polypectomy preferred</li>
          <li><strong>Small polyps (6-9mm):</strong> Cold snare polypectomy</li>
          <li><strong>Large polyps (≥10mm):</strong> Hot snare polypectomy after submucosal injection</li>
          <li><strong>Sessile serrated lesions:</strong> Complete removal with cold techniques preferred</li>
          <li><strong>Pedunculated polyps:</strong> Hot snare polypectomy; consider clip placement or injection for thick stalks</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Colonoscopic Surveillance Intervals</h2>
        <p>
          Recommended surveillance intervals after colonoscopy:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>No polyps:</strong> 10 years</li>
          <li><strong>1-2 small (&lt;10mm) tubular adenomas:</strong> 5-10 years</li>
          <li><strong>3-4 tubular adenomas:</strong> 3 years</li>
          <li><strong>5-10 adenomas:</strong> 1-3 years</li>
          <li><strong>&gt;10 adenomas:</strong> 1 year and consider genetic evaluation</li>
          <li><strong>One or more adenomas ≥10mm:</strong> 3 years</li>
          <li><strong>One or more adenomas with high-grade dysplasia:</strong> 3 years</li>
          <li><strong>One or more villous adenomas:</strong> 3 years</li>
          <li><strong>Serrated lesions &lt;10mm without dysplasia:</strong> 5 years</li>
          <li><strong>Serrated lesions ≥10mm or with dysplasia:</strong> 3 years</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Training and Competency</h2>
        <p>
          Minimum recommended training for performing colonoscopy in Kenya includes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Completion of at least 200 supervised colonoscopy procedures before independent practice</li>
          <li>Demonstrated cecal intubation rate of ≥90% during training</li>
          <li>Demonstrated ability to recognize and describe normal and abnormal findings</li>
          <li>Competence in basic therapeutic techniques (polypectomy, hemostasis)</li>
          <li>Ongoing quality assessment with tracking of key performance indicators</li>
          <li>Regular participation in continuous medical education specific to colonoscopy</li>
        </ul>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-medium mb-3">Citation</h3>
          <p>
            Gastroenterology Society of Kenya. (2023). Clinical Practice Guideline for Quality Colonoscopy. 
            GSK Guidelines 2023. Nairobi, Kenya.
          </p>
        </div>
      </div>
    </div>
  );
} 