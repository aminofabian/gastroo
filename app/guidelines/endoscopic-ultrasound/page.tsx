import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Endoscopic Ultrasound Guidelines | GSK - Gastroenterology Society of Kenya",
  description: "Procedural guidelines for diagnostic and therapeutic EUS procedures in Kenya",
};

export default function EndoscopicUltrasoundPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-playfair font-bold mb-2">Endoscopic Ultrasound Guidelines</h1>
          <p className="text-muted-foreground">Last updated: March 2023</p>
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
          Endoscopic Ultrasound (EUS) has evolved into an essential tool for diagnosis and therapy in gastroenterology. 
          These guidelines provide recommendations for the application of EUS in Kenya, with consideration for the 
          unique healthcare environment and available resources.
        </p>

        <Tabs defaultValue="diagnostic" className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="diagnostic">Diagnostic EUS</TabsTrigger>
            <TabsTrigger value="therapeutic">Therapeutic EUS</TabsTrigger>
          </TabsList>
          
          <TabsContent value="diagnostic" className="space-y-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4">Diagnostic EUS Applications</h2>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-3">Pancreatobiliary Evaluation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Evaluation of suspected pancreatic tumors</li>
                  <li>Evaluation of pancreatic cystic lesions</li>
                  <li>Diagnosis and staging of pancreatic cancer</li>
                  <li>Evaluation of idiopathic acute pancreatitis</li>
                  <li>Evaluation of suspected chronic pancreatitis</li>
                  <li>Evaluation of bile duct abnormalities when ERCP is contraindicated</li>
                  <li>Evaluation of suspected choledocholithiasis when other imaging is inconclusive</li>
                  <li>Evaluation of suspected gallbladder lesions</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-3">Gastrointestinal Wall and Adjacent Structure Evaluation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>T staging of esophageal, gastric, rectal, and duodenal cancers</li>
                  <li>Evaluation of subepithelial lesions of the GI tract</li>
                  <li>Evaluation of thickened gastric folds</li>
                  <li>Assessment of perianal and perirectal inflammatory conditions</li>
                  <li>Evaluation of mediastinal lymphadenopathy</li>
                  <li>Evaluation of posterior mediastinal masses</li>
                </ul>
              </CardContent>
            </Card>
            
            <h3 className="text-xl font-medium mt-6 mb-3">EUS-Guided Fine Needle Aspiration (FNA) and Biopsy (FNB)</h3>
            <p>
              EUS-guided tissue acquisition is indicated for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Solid pancreatic masses</li>
              <li>Pancreatic cystic lesions when analysis of cyst fluid will impact management</li>
              <li>Lymph nodes when a diagnosis would change management</li>
              <li>Subepithelial lesions ≥2cm or with suspicious features</li>
              <li>Unexplained gastrointestinal wall thickening</li>
              <li>Mediastinal masses or lymphadenopathy of unknown etiology</li>
              <li>Liver lesions that are inaccessible by percutaneous approach</li>
              <li>Left adrenal masses when clinically indicated</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Technical Considerations for EUS-FNA/FNB</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>22G or 25G needles are recommended for routine sampling of pancreatic lesions</li>
              <li>19G needles may be preferable for specific indications (e.g., cystic lesions or core tissue needed)</li>
              <li>At least 3-4 passes are recommended for solid pancreatic lesions without rapid on-site evaluation</li>
              <li>Fewer passes (1-2) may be adequate for lymph nodes</li>
              <li>Use of stylet is optional and based on endoscopist preference</li>
              <li>Consider EUS-FNB over EUS-FNA when histology is required for diagnosis</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="therapeutic" className="space-y-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4">Therapeutic EUS Applications</h2>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-3">EUS-Guided Drainage Procedures</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Pancreatic Fluid Collections:</strong> EUS-guided drainage is indicated for symptomatic pancreatic pseudocysts and walled-off necrosis</li>
                  <li><strong>Gallbladder Drainage:</strong> EUS-guided gallbladder drainage may be considered for patients with acute cholecystitis who are poor surgical candidates</li>
                  <li><strong>Biliary Drainage:</strong> EUS-guided biliary drainage may be considered after failed ERCP for malignant biliary obstruction</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-3">EUS-Guided Therapy and Intervention</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Celiac Plexus Neurolysis/Block:</strong> Indicated for pain management in pancreatic cancer or chronic pancreatitis</li>
                  <li><strong>Vascular Therapy:</strong> EUS-guided treatment of gastric varices with coil embolization and/or cyanoacrylate injection</li>
                  <li><strong>Tumor Ablation:</strong> Emerging application for ablation of pancreatic tumors and other lesions</li>
                  <li><strong>Fiducial Placement:</strong> For image-guided radiation therapy</li>
                </ul>
              </CardContent>
            </Card>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Technical Considerations for Therapeutic EUS</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prophylactic antibiotics are recommended for all EUS-guided drainage procedures</li>
              <li>Use of lumen-apposing metal stents is preferred for drainage of pancreatic fluid collections when available</li>
              <li>Double-pigtail plastic stents are an acceptable alternative when lumen-apposing metal stents are not available</li>
              <li>EUS-guided celiac plexus neurolysis/block should be performed with a dedicated 22G or 19G needle</li>
              <li>CO2 insufflation is preferred over air for complex therapeutic procedures</li>
              <li>Therapeutic procedures should be performed in facilities with surgical backup</li>
            </ul>
          </TabsContent>
        </Tabs>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contraindications</h2>
        
        <p>
          Absolute contraindications to EUS include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Hemodynamic instability</li>
          <li>Severe coagulopathy that cannot be corrected</li>
          <li>Perforated viscus</li>
          <li>Severe respiratory distress</li>
        </ul>
        <p className="mt-4">
          Relative contraindications include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Large hiatal hernia (for transesophageal approaches)</li>
          <li>Severe esophageal or gastric varices (for FNA/FNB)</li>
          <li>Altered upper GI anatomy that prevents endoscope passage</li>
          <li>Pregnancy (especially first trimester)</li>
          <li>Recent myocardial infarction (&lt;3 months)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Complications</h2>
        <p>
          Potential complications of EUS procedures include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Diagnostic EUS:</strong> Similar to upper endoscopy (perforation, bleeding, adverse reaction to sedation)</li>
          <li><strong>EUS-FNA/FNB:</strong> Bleeding (1-2%), infection (&lt;1%), pancreatitis (1-2% for pancreatic FNA), perforation (rare)</li>
          <li><strong>Therapeutic EUS:</strong> Bleeding (5-10%), infection (5-15%), perforation (3-5%), stent migration (5-10%)</li>
        </ul>
        <p className="mt-4">
          Risk of complications is higher for therapeutic compared to diagnostic procedures.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Training and Competency</h2>
        <p>
          Recommendations for EUS training and competency in Kenya:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Endoscopists should be proficient in standard endoscopic procedures before undertaking EUS training</li>
          <li>Minimum of 225 supervised EUS procedures (including 50 EUS-FNA) during training</li>
          <li>Minimum annual volume of 50 EUS cases to maintain competency</li>
          <li>Progression from diagnostic to therapeutic EUS only after achieving competency in diagnostic procedures</li>
          <li>Participation in continuous medical education specific to EUS</li>
          <li>Development of regional centers of excellence for EUS in Kenya to maximize effective use of resources</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Resource Considerations</h2>
        <p>
          Adaptations for implementation of EUS in Kenya:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Concentration of EUS services in regional referral centers to ensure adequate procedure volumes</li>
          <li>Development of telemedicine networks for consultation with international experts when needed</li>
          <li>Collaborative training programs with international partners</li>
          <li>Prioritization of cases where EUS will have highest clinical impact</li>
          <li>Consideration of refurbished equipment to reduce costs where appropriate</li>
          <li>Development of maintenance programs with manufacturer support</li>
        </ul>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-medium mb-3">Citation</h3>
          <p>
            Gastroenterology Society of Kenya. (2023). Clinical Practice Guideline for Endoscopic Ultrasound. 
            GSK Guidelines 2023. Nairobi, Kenya.
          </p>
        </div>
      </div>
    </div>
  );
} 