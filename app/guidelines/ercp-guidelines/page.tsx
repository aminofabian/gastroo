import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "ERCP Guidelines | GSK - Gastroenterology Society of Kenya",
  description: "Indications, contraindications, and technical considerations for ERCP procedures in Kenya",
};

export default function ERCPGuidelinesPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-playfair font-bold mb-2">ERCP Guidelines</h1>
          <p className="text-muted-foreground">Last updated: November 2022</p>
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
          Endoscopic Retrograde Cholangiopancreatography (ERCP) is an advanced endoscopic procedure used for the diagnosis 
          and treatment of diseases of the biliary tract and pancreas. These guidelines provide recommendations for ERCP practice 
          in Kenya, taking into consideration the availability of resources, training, and expertise.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Indications for ERCP</h2>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-3">Biliary Indications</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Choledocholithiasis</li>
              <li>Biliary obstruction (malignant or benign)</li>
              <li>Bile leak</li>
              <li>Primary sclerosing cholangitis (for dominant strictures)</li>
              <li>Sphincter of Oddi dysfunction (Type I)</li>
              <li>Ampullary adenoma requiring endoscopic ampullectomy</li>
              <li>Biliary stent placement or exchange</li>
              <li>Facilitation of cholangioscopy</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-3">Pancreatic Indications</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acute recurrent pancreatitis of unclear etiology</li>
              <li>Pancreatic duct leaks or disruptions</li>
              <li>Symptomatic pancreatic duct stones or strictures</li>
              <li>Facilitation of pancreatic tissue sampling</li>
              <li>Drainage of symptomatic pancreatic pseudocysts communicating with the main pancreatic duct</li>
              <li>Suspected main pancreatic duct intraductal papillary mucinous neoplasm (IPMN)</li>
            </ul>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contraindications</h2>
        
        <p>
          Absolute contraindications include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Acute pancreatitis (unless caused by gallstones with persistent biliary obstruction)</li>
          <li>Recent myocardial infarction or pulmonary embolism (&lt;3 months)</li>
          <li>Patient refusal after informed consent</li>
          <li>Hemodynamic instability</li>
          <li>Coagulopathy that cannot be corrected</li>
          <li>Inadequate training or local facilities to manage potential complications</li>
        </ul>
        <p className="mt-4">
          Relative contraindications include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Altered surgical anatomy (e.g., Roux-en-Y gastric bypass)</li>
          <li>Large duodenal diverticulum</li>
          <li>Pregnancy (especially first trimester)</li>
          <li>Significant cardiopulmonary disease</li>
          <li>Recent gastrointestinal perforation</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Pre-procedure Considerations</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Informed Consent</h3>
        <p>
          Informed consent should include discussion of:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Indications for the procedure</li>
          <li>Likely benefits and possible alternatives</li>
          <li>Potential complications and their approximate rates:</li>
          <ul className="list-disc pl-6 space-y-1">
            <li>Post-ERCP pancreatitis (3-10%)</li>
            <li>Hemorrhage (1-2%)</li>
            <li>Perforation (&lt;1%)</li>
            <li>Cholangitis (1-3%)</li>
            <li>Adverse effects of sedation/anesthesia</li>
            <li>Death (rare, &lt;0.5%)</li>
          </ul>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Antibiotic Prophylaxis</h3>
        <p>
          Prophylactic antibiotics are recommended for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Suspected or known biliary obstruction where complete drainage may not be achieved</li>
          <li>History of liver transplantation</li>
          <li>Known or suspected pancreatic pseudocyst</li>
          <li>History of endocarditis or prosthetic heart valves</li>
          <li>Patients with severe neutropenia</li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Antithrombotic Management</h3>
        <p>
          Recommendations for managing antithrombotic therapy:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Continue aspirin for all ERCP procedures</li>
          <li>Consider temporary interruption of thienopyridines (e.g., clopidogrel) for high-risk procedures</li>
          <li>For patients on oral anticoagulants, follow guidelines for high-risk procedures:
            <ul className="list-disc pl-6 space-y-1">
              <li>Warfarin: Stop 5 days before procedure and check INR</li>
              <li>Direct oral anticoagulants: Stop 48-72 hours before procedure</li>
            </ul>
          </li>
          <li>Decisions should be made in consultation with the prescribing physician</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Technical Considerations</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Stone Extraction Techniques</h3>
        <p>
          For biliary stone extraction:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Endoscopic sphincterotomy is recommended for most cases</li>
          <li>Balloon dilation of the biliary sphincter may be considered as an alternative or adjunct to sphincterotomy</li>
          <li>Extraction balloons and/or baskets should be selected based on stone size and anatomy</li>
          <li>For stones &gt;1cm, mechanical lithotripsy or electrohydraulic/laser lithotripsy may be necessary</li>
          <li>For multiple or large stones, consider placement of a temporary biliary stent if complete clearance is not achieved</li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Biliary Stenting</h3>
        <p>
          Guidelines for biliary stent selection:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Plastic stents:</strong> Suitable for temporary drainage or benign conditions</li>
          <li><strong>Metal stents:</strong> Preferred for malignant biliary obstruction</li>
          <li><strong>Covered metal stents:</strong> Consider for benign strictures or bile leaks</li>
          <li><strong>Uncovered metal stents:</strong> Preferred for hilar strictures</li>
          <li><strong>Stent diameter:</strong> 10 French plastic stents or 10mm metal stents generally recommended</li>
          <li><strong>Stent length:</strong> Should extend at least 1-2cm beyond the proximal and distal extent of the stricture</li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Prevention of Post-ERCP Pancreatitis</h3>
        <p>
          Recommended measures to prevent post-ERCP pancreatitis:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Rectal NSAIDs (100mg diclofenac or indomethacin) for all average-risk patients</li>
          <li>Pancreatic duct stent placement for high-risk patients (e.g., suspected sphincter of Oddi dysfunction, pancreatic sphincterotomy)</li>
          <li>Wire-guided cannulation technique</li>
          <li>Minimization of contrast injection into the pancreatic duct</li>
          <li>Avoidance of repeated pancreatic duct cannulation</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Training and Competency</h2>
        <p>
          Recommendations for ERCP training and competency in Kenya:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Endoscopists should complete a minimum of 200 supervised ERCP procedures during training</li>
          <li>Selective cannulation rate of ≥90% should be achieved before independent practice</li>
          <li>Endoscopists should perform at least 25 ERCPs per year to maintain competency</li>
          <li>Regular assessment of quality metrics and complication rates</li>
          <li>Participation in continuous professional development specific to ERCP</li>
          <li>Development of referral networks for complex cases beyond local expertise</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Resource-Limited Settings</h2>
        <p>
          Adaptations for resource-limited settings in Kenya:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Concentration of ERCP services in regional centers to ensure adequate procedure volumes</li>
          <li>Development of efficient referral pathways</li>
          <li>Sharing of expensive equipment between institutions where appropriate</li>
          <li>Prioritization of therapeutic over diagnostic ERCP</li>
          <li>Alternative imaging modalities (e.g., EUS, MRCP) for diagnostic purposes when available</li>
          <li>Mentorship programs to increase the number of trained ERCP providers</li>
        </ul>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-medium mb-3">Citation</h3>
          <p>
            Gastroenterology Society of Kenya. (2022). Clinical Practice Guideline for Endoscopic Retrograde 
            Cholangiopancreatography. GSK Guidelines 2022. Nairobi, Kenya.
          </p>
        </div>
      </div>
    </div>
  );
} 