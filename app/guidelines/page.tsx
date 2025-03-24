import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Guidelines | GSK - Gastroenterology Society of Kenya",
  description: "Clinical practice guidelines and resources for gastroenterology professionals in Kenya",
};

export default function GuidelinesPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-playfair font-bold mb-4">Clinical Practice Guidelines</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Evidence-based recommendations to optimize patient care for gastroenterology professionals in Kenya
        </p>
      </div>

      <Tabs defaultValue="procedural" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="procedural">Procedural Guidelines</TabsTrigger>
          <TabsTrigger value="resources">Additional Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="procedural" className="space-y-6 mt-6">
          <h2 className="text-2xl font-semibold mb-4">Procedural Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GuidelineCard 
              title="Endoscopy Standards"
              description="Quality indicators and best practices for upper GI endoscopy"
              lastUpdated="January 2023"
              link="#"
            />
            
            <GuidelineCard 
              title="Colonoscopy Standards"
              description="Quality indicators and best practices for colonoscopy"
              lastUpdated="February 2023"
              link="#"
            />
            
            <GuidelineCard 
              title="ERCP Guidelines"
              description="Indications, contraindications, and technical considerations for ERCP"
              lastUpdated="November 2022"
              link="#"
            />
            
            <GuidelineCard 
              title="Endoscopic Ultrasound"
              description="Procedural guidelines for diagnostic and therapeutic EUS"
              lastUpdated="March 2023"
              link="#"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6 mt-6">
          <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GuidelineCard 
              title="Patient Education Materials"
              description="Downloadable resources for patient education on common GI conditions"
              lastUpdated="Ongoing updates"
              link="#"
            />
            
            <GuidelineCard 
              title="Medication Formulary"
              description="Recommended medications for gastroenterological conditions in Kenya"
              lastUpdated="January 2023"
              link="#"
            />
            
            <GuidelineCard 
              title="Research Protocols"
              description="Standardized protocols for gastroenterology research in Kenya"
              lastUpdated="February 2023"
              link="#"
            />
            
            <GuidelineCard 
              title="International Guidelines"
              description="Links to relevant international gastroenterology guidelines"
              lastUpdated="Regularly updated"
              link="#"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">About Our Guidelines</h2>
        <p className="mb-4">
          The Gastroenterology Society of Kenya (GSK) develops clinical practice guidelines to assist practitioners 
          in providing high-quality, evidence-based care for patients with digestive disorders. These guidelines 
          are adapted to the Kenyan context while incorporating international best practices.
        </p>
        <p className="mb-4">
          Our guidelines undergo rigorous development and review processes, involving multidisciplinary teams of 
          gastroenterologists, surgeons, primary care physicians, and other healthcare professionals.
        </p>
        <p>
          Guidelines are regularly updated to reflect the latest evidence and clinical advances. The date of the 
          most recent update is indicated for each guideline.
        </p>
      </div>
    </div>
  );
}

function GuidelineCard({ title, description, lastUpdated, link }: { 
  title: string; 
  description: string; 
  lastUpdated: string;
  link: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Last updated: {lastUpdated}</span>
          <a 
            href={link} 
            className="text-primary hover:underline font-medium"
          >
            View guideline →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
