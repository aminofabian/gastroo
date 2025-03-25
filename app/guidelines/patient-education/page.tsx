import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Patient Education Materials | GSK - Gastroenterology Society of Kenya",
  description: "Downloadable resources for patient education on common gastrointestinal conditions",
};

export default function PatientEducationPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-playfair font-bold mb-2">Patient Education Materials</h1>
          <p className="text-muted-foreground">Regularly updated resources</p>
        </div>
        <Button variant="outline">
          <Link href="/guidelines">
            Back to Guidelines
          </Link>
        </Button>
      </div>

      <div className="prose prose-slate max-w-none mb-8">
        <p className="text-xl">
          These patient education materials have been developed by the Gastroenterology Society of Kenya to help patients 
          better understand common gastrointestinal conditions, diagnostic procedures, and treatment options. These resources 
          are designed to supplement, not replace, discussions with healthcare providers.
        </p>
        <p>
          Healthcare providers are encouraged to use these materials in their practice to enhance patient knowledge and 
          improve health outcomes. All materials are available in both English and Swahili, and are regularly reviewed 
          and updated to reflect current best practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResourceCard
          title="Understanding GERD"
          description="Patient guide to gastroesophageal reflux disease, symptoms, and management options"
          lastUpdated="January 2023"
          fileSize="2.5MB"
          languages={["English", "Swahili"]}
          pdfLink="/guidelines/patient-education/gerd-guide.pdf"
        />
        
        <ResourceCard
          title="Preparing for Your Colonoscopy"
          description="Step-by-step instructions for bowel preparation and what to expect during a colonoscopy"
          lastUpdated="February 2023"
          fileSize="3.1MB"
          languages={["English", "Swahili"]}
          pdfLink="/guidelines/patient-education/colonoscopy-prep.pdf"
        />
        
        <ResourceCard
          title="Living with Inflammatory Bowel Disease"
          description="Guide for patients with Crohn's disease or ulcerative colitis"
          lastUpdated="March 2023"
          fileSize="4.2MB"
          languages={["English", "Swahili"]}
          pdfLink="/guidelines/patient-education/ibd-guide.pdf"
        />
        
        <ResourceCard
          title="Understanding Hepatitis B & C"
          description="Information on viral hepatitis transmission, screening, and treatment options"
          lastUpdated="December 2022"
          fileSize="3.8MB"
          languages={["English", "Swahili"]}
          pdfLink="/guidelines/patient-education/viral-hepatitis.pdf"
        />
        
        <ResourceCard
          title="Dyspepsia and Stomach Ulcers"
          description="Guide to understanding indigestion, peptic ulcers, and H. pylori infection"
          lastUpdated="January 2023"
          fileSize="2.9MB"
          languages={["English", "Swahili"]}
          pdfLink="/guidelines/patient-education/dyspepsia-guide.pdf"
        />
        
        <ResourceCard
          title="Colorectal Cancer Screening"
          description="Information on screening options, risk factors, and prevention of colorectal cancer"
          lastUpdated="March 2023"
          fileSize="3.4MB"
          languages={["English", "Swahili"]}
          pdfLink="/guidelines/patient-education/crc-screening.pdf"
        />
        
        <ResourceCard
          title="Understanding Pancreatitis"
          description="Guide to acute and chronic pancreatitis causes, symptoms, and management"
          lastUpdated="November 2022"
          fileSize="2.7MB"
          languages={["English", "Swahili"]}
          pdfLink="/guidelines/patient-education/pancreatitis.pdf"
        />
        
        <ResourceCard
          title="Managing Irritable Bowel Syndrome"
          description="Practical advice for patients living with IBS"
          lastUpdated="February 2023"
          fileSize="3.2MB"
          languages={["English", "Swahili"]}
          pdfLink="/guidelines/patient-education/ibs-management.pdf"
        />
        
        <ResourceCard
          title="Low FODMAP Diet Guide"
          description="Dietary guidance for patients with IBS and other functional GI disorders"
          lastUpdated="January 2023"
          fileSize="4.5MB"
          languages={["English", "Swahili"]}
          pdfLink="/guidelines/patient-education/low-fodmap.pdf"
        />
      </div>

      <div className="bg-muted p-6 rounded-lg mt-12">
        <h2 className="text-2xl font-semibold mb-4">For Healthcare Providers</h2>
        <p className="mb-4">
          GSK members can access additional resources, including customizable versions of these patient education 
          materials, presentation slides, and high-resolution graphics for patient counseling.
        </p>
        <Button>
          <Link href="/login">
            Login to Access Provider Resources
          </Link>
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">Feedback and Resource Requests</h3>
        <p>
          The GSK welcomes feedback on these materials and suggestions for additional patient education resources. 
          Please contact <a href="mailto:education@gsk.or.ke" className="text-primary hover:underline">education@gsk.or.ke</a> with 
          your comments or to request specific materials not currently available.
        </p>
      </div>
    </div>
  );
}

function ResourceCard({ 
  title, 
  description, 
  lastUpdated, 
  fileSize, 
  languages, 
  pdfLink 
}: { 
  title: string; 
  description: string; 
  lastUpdated: string;
  fileSize: string;
  languages: string[];
  pdfLink: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader>
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
          <div className="flex justify-between">
            <span className="text-muted-foreground">Available in:</span>
            <span>{languages.join(", ")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 