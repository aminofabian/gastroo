import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Endoscopy Standards | GSK - Gastroenterology Society of Kenya",
  description: "Quality indicators and best practices for upper GI endoscopy in Kenya",
};

export default function EndoscopyStandardsPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-playfair font-bold mb-2">Endoscopy Standards</h1>
          <p className="text-muted-foreground">Last updated: January 2023</p>
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
          Upper gastrointestinal (GI) endoscopy is one of the most commonly performed endoscopic procedures in Kenya. 
          These guidelines provide a framework for performing high-quality, safe, and effective upper GI endoscopy procedures 
          adapted to the Kenyan healthcare context while aligning with international standards.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Preprocedural Considerations</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Indications</h3>
        <p>
          Upper GI endoscopy is indicated for evaluation and management of:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Persistent upper abdominal symptoms despite appropriate therapy</li>
          <li>Upper abdominal symptoms associated with alarm features (e.g., weight loss, anemia, dysphagia)</li>
          <li>Dysphagia or odynophagia</li>
          <li>Persistent reflux symptoms despite appropriate therapy</li>
          <li>Persistent vomiting of unknown cause</li>
          <li>Other diseases in which the presence of upper GI pathology might modify treatment (e.g., in patients with history of ulcer or GI bleeding)</li>
          <li>Confirmation and specific histological diagnosis of radiologically demonstrated lesions</li>
          <li>Management of acute upper GI bleeding</li>
          <li>Selected cases of suspected portal hypertension for assessment of varices</li>
          <li>Assessment of signs or symptoms suggesting malabsorption or celiac disease</li>
          <li>For tissue sampling from duodenum or jejunum</li>
          <li>Suspected malignancy</li>
          <li>For surveillance procedures (e.g., Barrett's esophagus, polyposis syndromes)</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">Contraindications</h3>
        <p>
          Absolute contraindications include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Unstable cardiorespiratory status</li>
          <li>Suspected perforation</li>
          <li>Uncooperative patient in absence of adequate sedation</li>
        </ul>
        <p className="mt-4">
          Relative contraindications include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Recent myocardial infarction or pulmonary embolism</li>
          <li>Severe thrombocytopenia</li>
          <li>Coagulopathy</li>
          <li>Large aortic aneurysm</li>
          <li>Severe obstructive pulmonary disease</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Quality Indicators</h2>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-3">Preprocedure Quality Indicators</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Appropriate documentation of indication</li>
              <li>Informed consent obtained and documented</li>
              <li>Risk assessment for anticoagulation/antiplatelet therapy management</li>
              <li>Prophylactic antibiotics given when indicated</li>
              <li>History of adverse reactions to sedation or anesthesia documented</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-3">Intraprocedure Quality Indicators</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Complete examination of esophagus, stomach, and duodenum to the second portion</li>
              <li>Photo documentation of normal landmarks and abnormal findings</li>
              <li>Biopsy specimens obtained in appropriate clinical scenarios</li>
              <li>Adequate tissue sampling (≥4 biopsies) in cases of suspected Barrett's esophagus</li>
              <li>At least 7 minutes examination time for normal upper endoscopy</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-3">Postprocedure Quality Indicators</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Procedure report completed within 1 day</li>
              <li>Documentation of adverse events</li>
              <li>Follow-up recommendations documented</li>
              <li>Pathology results communicated to patients within 2 weeks</li>
              <li>Patient satisfaction assessment performed</li>
            </ul>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Adaptations for Resource-Limited Settings</h2>
        <p>
          These guidelines recognize the variability in resource availability across different Kenyan healthcare settings.
          Where standard resources are limited, the following adaptations are recommended:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Prioritize essential equipment maintenance over acquisition of advanced technologies</li>
          <li>Implement a reprocessing protocol that aligns with available resources while maintaining minimum standards</li>
          <li>Develop regional referral networks for complex cases</li>
          <li>Utilize telemedicine for specialist consultation when local expertise is limited</li>
          <li>Implement risk stratification to prioritize urgent cases in settings with limited endoscopy capacity</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Training and Competency</h2>
        <p>
          Minimum recommended training for performing upper GI endoscopy in Kenya includes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Completion of at least 130 supervised upper GI endoscopy procedures</li>
          <li>Ongoing assessment of competency by direct observation</li>
          <li>Regular participation in quality improvement activities</li>
          <li>Maintenance of a logbook documenting procedures and complications</li>
          <li>Ongoing continuing medical education in endoscopy</li>
        </ul>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-medium mb-3">Citation</h3>
          <p>
            Gastroenterology Society of Kenya. (2023). Clinical Practice Guideline for Upper Gastrointestinal Endoscopy. 
            GSK Guidelines 2023. Nairobi, Kenya.
          </p>
        </div>
      </div>
    </div>
  );
} 