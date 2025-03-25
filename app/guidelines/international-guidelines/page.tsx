import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "International Guidelines | GSK - Gastroenterology Society of Kenya",
  description: "Links to relevant international gastroenterology guidelines and resources",
};

export default function InternationalGuidelinesPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-playfair font-bold mb-2">International Guidelines</h1>
          <p className="text-muted-foreground">Regularly updated resources</p>
        </div>
        <Button variant="outline">
          <Link href="/guidelines">
            Back to Guidelines
          </Link>
        </Button>
      </div>

      <div className="prose prose-slate max-w-none mb-6">
        <p className="text-xl">
          The Gastroenterology Society of Kenya (GSK) recognizes the importance of international best 
          practices in gastroenterology. This page provides links to key international guidelines that 
          may be relevant to practice in Kenya.
        </p>
        <p>
          While these guidelines provide valuable evidence-based recommendations, practitioners should 
          consider local context, resource availability, and patient factors when applying them. Where 
          available, GSK's adapted guidelines should be consulted for recommendations specific to the 
          Kenyan context.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Key International Guidelines</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GuidelineCard 
          title="Management of Helicobacter pylori Infection"
          organization="American College of Gastroenterology (ACG)"
          year="2022"
          description="Evidence-based recommendations for testing and treatment of H. pylori infection"
          link="https://gi.org/guideline/treatment-of-helicobacter-pylori-infection/"
        />
        
        <GuidelineCard 
          title="Diagnosis and Management of GERD"
          organization="American Gastroenterological Association (AGA)"
          year="2022"
          description="Updated clinical practice guidelines for GERD management"
          link="https://www.gastrojournal.org/article/S0016-5085(21)04077-3/fulltext"
        />
        
        <GuidelineCard 
          title="Management of Acute Pancreatitis"
          organization="International Association of Pancreatology"
          year="2019"
          description="Evidence-based guidelines for the management of acute pancreatitis"
          link="https://journals.lww.com/pancreasjournal/Fulltext/2019/06000/American_Pancreatic_Association_Practice_Guidelines.4.aspx"
        />
        
        <GuidelineCard 
          title="Prevention and Treatment of Viral Hepatitis"
          organization="World Health Organization (WHO)"
          year="2022"
          description="Consolidated guidelines on viral hepatitis focusing on low and middle-income countries"
          link="https://www.who.int/publications/i/item/9789240027077"
        />
        
        <GuidelineCard 
          title="Management of Cirrhosis Complications"
          organization="European Association for the Study of the Liver"
          year="2018"
          description="Clinical practice guidelines for complications of cirrhosis"
          link="https://www.journal-of-hepatology.eu/article/S0168-8278(18)31884-2/fulltext"
        />
        
        <GuidelineCard 
          title="Management of Ulcerative Colitis"
          organization="American College of Gastroenterology (ACG)"
          year="2019"
          description="Clinical guidelines for the management of adult ulcerative colitis"
          link="https://gi.org/guideline/ulcerative-colitis-in-adults/"
        />
        
        <GuidelineCard 
          title="Management of Crohn's Disease"
          organization="European Crohn's and Colitis Organisation"
          year="2020"
          description="Guidelines for medical management of adult Crohn's disease"
          link="https://academic.oup.com/ecco-jcc/article/14/1/4/5631084"
        />
        
        <GuidelineCard 
          title="Quality Indicators for Colonoscopy"
          organization="European Society of Gastrointestinal Endoscopy"
          year="2020"
          description="Performance measures for colonoscopy procedures"
          link="https://www.esge.com/performance-measures-for-colonoscopy-european-society-of-gastrointestinal-endoscopy-esge-quality-improvement-initiative/"
        />
        
        <GuidelineCard 
          title="GERD Management in Resource-Limited Settings"
          organization="World Gastroenterology Organisation"
          year="2022"
          description="Global guidelines for GERD with cascade options for different resource levels"
          link="https://www.worldgastroenterology.org/guidelines/gerd/gerd-and-erosive-esophagitis"
        />
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-6">Major Gastroenterology Organizations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OrganizationCard 
          title="World Gastroenterology Organisation (WGO)"
          description="Global organization focused on improving digestive health worldwide, with special attention to developing regions"
          link="https://www.worldgastroenterology.org/"
        />
        
        <OrganizationCard 
          title="American College of Gastroenterology (ACG)"
          description="Professional organization providing evidence-based guidelines for digestive health"
          link="https://gi.org/"
        />
        
        <OrganizationCard 
          title="European Society of Gastrointestinal Endoscopy (ESGE)"
          description="European society focused on high-quality endoscopy practice and training"
          link="https://www.esge.com/"
        />
        
        <OrganizationCard 
          title="African Middle East Association of Gastroenterology"
          description="Regional association representing gastroenterologists from Africa and the Middle East"
          link="https://amage-online.com/"
        />
      </div>

      <div className="bg-muted p-6 rounded-lg mt-12">
        <h2 className="text-2xl font-semibold mb-4">Contextualizing International Guidelines</h2>
        <p className="mb-4">
          When adapting international guidelines to the Kenyan context, consider the following factors:
        </p>
        <ul className="space-y-2">
          <li><strong>Resource availability:</strong> Equipment, medications, and trained personnel may differ from those assumed in international guidelines.</li>
          <li><strong>Epidemiology:</strong> Disease prevalence and patterns may vary in the Kenyan population.</li>
          <li><strong>Cost considerations:</strong> Cost-effectiveness may differ in the Kenyan healthcare system.</li>
          <li><strong>Cultural factors:</strong> Patient preferences, beliefs, and barriers to care should be considered.</li>
          <li><strong>Healthcare system:</strong> Recommendations should be feasible within the structure of the Kenyan healthcare system.</li>
        </ul>
        <p className="mt-4">
          The GSK is committed to developing locally relevant, evidence-based guidelines that consider these factors. 
          When GSK guidelines are not available, we recommend applying international guidelines with appropriate contextualization.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">Suggest Additional Resources</h3>
        <p>
          If you have suggestions for additional international guidelines or resources that should be included on this page, 
          please contact <a href="mailto:guidelines@gsk.or.ke" className="text-primary hover:underline">guidelines@gsk.or.ke</a>.
        </p>
      </div>
    </div>
  );
}

function GuidelineCard({ 
  title, 
  organization, 
  year, 
  description, 
  link 
}: { 
  title: string; 
  organization: string; 
  year: string;
  description: string;
  link: string;
}) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{organization} ({year})</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">{description}</p>
        <Button variant="outline" size="sm" className="w-full">
          <ExternalLink className="h-4 w-4 mr-2" />
          <a href={link} target="_blank" rel="noreferrer" className="w-full text-center">
            View Guideline
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

function OrganizationCard({ 
  title, 
  description, 
  link
}: { 
  title: string; 
  description: string; 
  link: string;
}) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">{description}</p>
        <Button variant="outline" size="sm" className="w-full">
          <ExternalLink className="h-4 w-4 mr-2" />
          <a href={link} target="_blank" rel="noreferrer" className="w-full text-center">
            Visit Website
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}