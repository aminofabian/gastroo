import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Research Protocols | GSK - Gastroenterology Society of Kenya",
  description: "Standardized protocols for gastroenterology research in Kenya",
};

export default function ResearchProtocolsPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-playfair font-bold mb-2">Research Protocols</h1>
          <p className="text-muted-foreground">Last updated: February 2023</p>
        </div>
        <Button variant="outline">
          <Link href="/guidelines">
            Back to Guidelines
          </Link>
        </Button>
      </div>

      <div className="prose prose-slate max-w-none mb-8">
        <p className="text-xl">
          The Gastroenterology Society of Kenya (GSK) has developed these standardized research protocols 
          to facilitate high-quality gastroenterology research in Kenya. These protocols aim to harmonize 
          research methodologies, improve the quality of gastroenterology research, and facilitate 
          multi-center collaboration.
        </p>
        <p>
          Researchers are encouraged to adapt these protocols to their specific research questions while 
          maintaining the core standardized elements to ensure comparability of results across different studies.
          All protocols have been reviewed by the GSK Research Committee and align with international best practices 
          while considering local resource constraints.
        </p>
      </div>

      <Tabs defaultValue="clinical" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
          <TabsTrigger value="clinical" className="py-2">Clinical Trials</TabsTrigger>
          <TabsTrigger value="epidemiology" className="py-2">Epidemiological Studies</TabsTrigger>
          <TabsTrigger value="templates" className="py-2">Templates & Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="clinical" className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Clinical Trial Protocols</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProtocolCard 
              title="H. pylori Treatment Trials"
              description="Standardized protocol for trials evaluating H. pylori eradication regimens in Kenya"
              lastUpdated="January 2023"
              category="Clinical Trial"
              fileSize="2.4MB"
              downloadLink="/guidelines/research-protocols/hpylori-trial-protocol.pdf"
            />
            
            <ProtocolCard 
              title="IBD Management Trials"
              description="Protocol for trials evaluating therapeutic interventions in inflammatory bowel disease"
              lastUpdated="February 2023"
              category="Clinical Trial"
              fileSize="3.1MB"
              downloadLink="/guidelines/research-protocols/ibd-trial-protocol.pdf"
            />
            
            <ProtocolCard 
              title="Cirrhotic Ascites Management"
              description="Protocol for trials evaluating ascites management in resource-limited settings"
              lastUpdated="November 2022"
              category="Clinical Trial"
              fileSize="2.7MB"
              downloadLink="/guidelines/research-protocols/ascites-trial-protocol.pdf"
            />
            
            <ProtocolCard 
              title="Esophageal Varices Trials"
              description="Protocol for evaluating primary and secondary prophylaxis of variceal bleeding"
              lastUpdated="December 2022"
              category="Clinical Trial"
              fileSize="2.9MB"
              downloadLink="/guidelines/research-protocols/varices-trial-protocol.pdf"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="epidemiology" className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Epidemiological Study Protocols</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProtocolCard 
              title="GI Cancer Surveillance Registry"
              description="Protocol for establishing and maintaining a gastric, esophageal, and colorectal cancer registry"
              lastUpdated="February 2023"
              category="Epidemiological Study"
              fileSize="3.5MB"
              downloadLink="/guidelines/research-protocols/gi-cancer-registry-protocol.pdf"
            />
            
            <ProtocolCard 
              title="Viral Hepatitis Prevalence"
              description="Protocol for cross-sectional and longitudinal studies of viral hepatitis epidemiology"
              lastUpdated="January 2023"
              category="Epidemiological Study"
              fileSize="2.8MB"
              downloadLink="/guidelines/research-protocols/viral-hepatitis-epi-protocol.pdf"
            />
            
            <ProtocolCard 
              title="GERD Prevalence and Risk Factors"
              description="Protocol for population-based assessment of GERD prevalence and associated factors"
              lastUpdated="December 2022"
              category="Epidemiological Study"
              fileSize="2.2MB"
              downloadLink="/guidelines/research-protocols/gerd-epi-protocol.pdf"
            />
            
            <ProtocolCard 
              title="NAFLD/NASH Burden Assessment"
              description="Protocol for evaluating the burden and risk factors of fatty liver disease in Kenya"
              lastUpdated="February 2023"
              category="Epidemiological Study"
              fileSize="3.0MB"
              downloadLink="/guidelines/research-protocols/nafld-epi-protocol.pdf"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Templates & Resources</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Ethics and Regulatory Guidance</CardTitle>
                <CardDescription>Resources for navigating ethical approvals and regulatory requirements for gastroenterology research in Kenya</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">IRB Submission Templates</h4>
                      <p className="text-sm text-muted-foreground">Standard templates for ethics committee submissions, adapted for common gastroenterology study types</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Informed Consent Templates</h4>
                      <p className="text-sm text-muted-foreground">Standardized consent forms in English and Swahili for various gastroenterology procedures and research studies</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Pharmacy and Medicines Control Council Guidelines</h4>
                      <p className="text-sm text-muted-foreground">Guidance for navigating drug-related research requirements in Kenya</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Collection Instruments</CardTitle>
                <CardDescription>Standardized questionnaires, case report forms, and other research instruments</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Validated GI Symptom Questionnaires</h4>
                      <p className="text-sm text-muted-foreground">Culturally validated symptom assessment tools for common GI conditions (GERD-Q, Rome IV, Bristol Stool Chart, etc.)</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Endoscopy and Pathology Reporting Templates</h4>
                      <p className="text-sm text-muted-foreground">Standardized reporting forms for gastroenterology procedures and pathology findings</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">REDCap Database Templates</h4>
                      <p className="text-sm text-muted-foreground">Ready-to-use REDCap database templates for common gastroenterology research designs</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statistical Analysis Resources</CardTitle>
                <CardDescription>Tools to support proper statistical analysis and reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Sample Size Calculators</h4>
                      <p className="text-sm text-muted-foreground">Excel-based tools for calculating appropriate sample sizes for different study designs</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">R and STATA Scripts</h4>
                      <p className="text-sm text-muted-foreground">Analysis scripts for common gastroenterology research questions</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Results Reporting Templates</h4>
                      <p className="text-sm text-muted-foreground">Templates for standardized reporting of results according to CONSORT, STROBE, and other reporting guidelines</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-6 rounded-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">Research Support Services</h2>
        <p className="mb-4">
          The GSK Research Committee offers the following support services to members conducting gastroenterology research:
        </p>
        <ul className="space-y-2 mb-4">
          <li>Protocol review and feedback</li>
          <li>Assistance with IRB submissions</li>
          <li>Statistical consultation</li>
          <li>Mentorship from experienced researchers</li>
          <li>Facilitation of multi-center collaborations</li>
          <li>Grant application support</li>
        </ul>
        <p className="mb-4">
          Members can request these services by contacting <a href="mailto:research@gsk.or.ke" className="text-primary hover:underline">research@gsk.or.ke</a>.
        </p>
        <Button>
          <Link href="/membership">
            Become a GSK Member for Full Access
          </Link>
        </Button>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">Recent GSK-Supported Research Publications</h3>
        <ul className="space-y-4">
          <li className="border-b pb-3">
            <p className="font-medium">Prevalence and Risk Factors for H. pylori Infection in Urban and Rural Kenya</p>
            <p className="text-sm text-muted-foreground">Ogutu, E.O., Kang'ethe, S.K., Nyabola, L.O., et al. (2022). East African Medical Journal, 99(2), 45-52.</p>
          </li>
          <li className="border-b pb-3">
            <p className="font-medium">Patterns of Antibiotic Resistance in Helicobacter pylori Isolates from Nairobi, Kenya</p>
            <p className="text-sm text-muted-foreground">Kimani, R.W., Njoroge, M.W., Ogutu, E.O., et al. (2022). BMC Infectious Diseases, 22(1), 328.</p>
          </li>
          <li className="border-b pb-3">
            <p className="font-medium">Burden of Hepatocellular Carcinoma in Patients with Viral Hepatitis in Kenya: A Multicenter Study</p>
            <p className="text-sm text-muted-foreground">Mwangi, J.K., Karanja, S.C., Gitau, S.N., et al. (2023). Journal of Hepatology, 78(1), 112-119.</p>
          </li>
          <li>
            <p className="font-medium">Quality of Life in Inflammatory Bowel Disease Patients in Kenya: A Cross-Sectional Study</p>
            <p className="text-sm text-muted-foreground">Njoroge, P.K., Waithaka, M.S., Ogutu, E.O., et al. (2023). Inflammatory Bowel Diseases, 29(1), 45-52.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ProtocolCard({ 
  title, 
  description, 
  lastUpdated, 
  category, 
  fileSize, 
  downloadLink 
}: { 
  title: string; 
  description: string; 
  lastUpdated: string;
  category: string;
  fileSize: string;
  downloadLink: string;
}) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="inline-block px-2 py-1 mb-2 text-xs font-medium bg-primary/10 text-primary rounded-md">
          {category}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last updated:</span>
            <span>{lastUpdated}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">File size:</span>
            <span>{fileSize}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 