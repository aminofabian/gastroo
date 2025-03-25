import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Medication Formulary | GSK - Gastroenterology Society of Kenya",
  description: "Recommended medications for gastroenterological conditions in Kenya",
};

export default function MedicationFormularyPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-playfair font-bold mb-2">Medication Formulary</h1>
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

      <div className="prose prose-slate max-w-none mb-8">
        <p className="text-xl">
          The GSK Medication Formulary provides evidence-based recommendations for the pharmacological management 
          of common gastroenterological conditions in Kenya. This formulary considers efficacy, safety, cost, 
          and availability in the Kenyan healthcare system.
        </p>
        <p>
          Medications are categorized by therapeutic class and indication. Where multiple options exist, 
          first-line, second-line, and alternative therapies are indicated. Dosing recommendations are provided 
          for adult patients with normal renal and hepatic function.
        </p>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mt-4">
          <p className="font-medium text-amber-800">
            This formulary is intended as a guide for clinicians and does not replace clinical judgment. 
            Medication selection should be individualized based on patient factors, comorbidities, and 
            concurrent medications.
          </p>
        </div>
      </div>

      <Tabs defaultValue="acid" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="acid" className="py-2">Acid-Related Disorders</TabsTrigger>
          <TabsTrigger value="ibd" className="py-2">IBD Treatments</TabsTrigger>
          <TabsTrigger value="liver" className="py-2">Liver Disease</TabsTrigger>
          <TabsTrigger value="functional" className="py-2">Functional GI Disorders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="acid" className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Acid-Related Disorders</h2>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Gastroesophageal Reflux Disease (GERD)</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Adult Dosing</TableHead>
                    <TableHead>Line of Therapy</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Omeprazole</TableCell>
                    <TableCell>PPI</TableCell>
                    <TableCell>20-40mg once daily</TableCell>
                    <TableCell>First-line</TableCell>
                    <TableCell>Take 30-60 minutes before breakfast</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Esomeprazole</TableCell>
                    <TableCell>PPI</TableCell>
                    <TableCell>20-40mg once daily</TableCell>
                    <TableCell>First-line</TableCell>
                    <TableCell>May have slightly better acid control than omeprazole</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pantoprazole</TableCell>
                    <TableCell>PPI</TableCell>
                    <TableCell>40mg once daily</TableCell>
                    <TableCell>First-line</TableCell>
                    <TableCell>Fewer drug interactions than other PPIs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ranitidine</TableCell>
                    <TableCell>H2RA</TableCell>
                    <TableCell>150mg twice daily</TableCell>
                    <TableCell>Second-line</TableCell>
                    <TableCell>Alternative when PPIs are contraindicated</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Antacids (various)</TableCell>
                    <TableCell>Neutralizing agents</TableCell>
                    <TableCell>10-20ml as needed</TableCell>
                    <TableCell>Adjunctive</TableCell>
                    <TableCell>For breakthrough symptoms</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Peptic Ulcer Disease</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Adult Dosing</TableHead>
                    <TableHead>Line of Therapy</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Omeprazole</TableCell>
                    <TableCell>PPI</TableCell>
                    <TableCell>20mg twice daily</TableCell>
                    <TableCell>First-line</TableCell>
                    <TableCell>4-8 weeks treatment duration</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Amoxicillin</TableCell>
                    <TableCell>Antibiotic</TableCell>
                    <TableCell>1g twice daily</TableCell>
                    <TableCell>H. pylori treatment</TableCell>
                    <TableCell>Part of triple therapy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Clarithromycin</TableCell>
                    <TableCell>Antibiotic</TableCell>
                    <TableCell>500mg twice daily</TableCell>
                    <TableCell>H. pylori treatment</TableCell>
                    <TableCell>Part of triple therapy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Metronidazole</TableCell>
                    <TableCell>Antibiotic</TableCell>
                    <TableCell>400mg twice daily</TableCell>
                    <TableCell>H. pylori treatment</TableCell>
                    <TableCell>Alternative to clarithromycin</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bismuth subsalicylate</TableCell>
                    <TableCell>Bismuth compound</TableCell>
                    <TableCell>120mg four times daily</TableCell>
                    <TableCell>Quadruple therapy</TableCell>
                    <TableCell>For areas with high clarithromycin resistance</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ibd" className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Inflammatory Bowel Disease Treatments</h2>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Ulcerative Colitis</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Adult Dosing</TableHead>
                    <TableHead>Line of Therapy</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Mesalazine (5-ASA)</TableCell>
                    <TableCell>Aminosalicylate</TableCell>
                    <TableCell>2-4g once daily</TableCell>
                    <TableCell>First-line for mild-moderate</TableCell>
                    <TableCell>Oral and/or rectal formulations</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Prednisolone</TableCell>
                    <TableCell>Corticosteroid</TableCell>
                    <TableCell>40mg daily, taper over 8 weeks</TableCell>
                    <TableCell>Acute flares</TableCell>
                    <TableCell>Not for maintenance therapy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Azathioprine</TableCell>
                    <TableCell>Immunomodulator</TableCell>
                    <TableCell>2-2.5mg/kg daily</TableCell>
                    <TableCell>Second-line/steroid-sparing</TableCell>
                    <TableCell>Monitor CBC, LFTs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Infliximab</TableCell>
                    <TableCell>Anti-TNF biologic</TableCell>
                    <TableCell>5mg/kg IV at 0, 2, 6 weeks, then q8w</TableCell>
                    <TableCell>Moderate-severe disease</TableCell>
                    <TableCell>TB screening required before initiation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Adalimumab</TableCell>
                    <TableCell>Anti-TNF biologic</TableCell>
                    <TableCell>160mg SC, then 80mg at week 2, then 40mg q2w</TableCell>
                    <TableCell>Moderate-severe disease</TableCell>
                    <TableCell>TB screening required before initiation</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Crohn's Disease</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Adult Dosing</TableHead>
                    <TableHead>Line of Therapy</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Budesonide</TableCell>
                    <TableCell>Topical corticosteroid</TableCell>
                    <TableCell>9mg once daily for 8 weeks</TableCell>
                    <TableCell>First-line for mild-moderate ileal/right colon</TableCell>
                    <TableCell>Fewer systemic effects than prednisolone</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Prednisolone</TableCell>
                    <TableCell>Corticosteroid</TableCell>
                    <TableCell>40mg daily, taper over 8-12 weeks</TableCell>
                    <TableCell>Acute flares</TableCell>
                    <TableCell>Not for maintenance therapy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Azathioprine</TableCell>
                    <TableCell>Immunomodulator</TableCell>
                    <TableCell>2-2.5mg/kg daily</TableCell>
                    <TableCell>Second-line/steroid-sparing</TableCell>
                    <TableCell>Monitor CBC, LFTs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Methotrexate</TableCell>
                    <TableCell>Immunomodulator</TableCell>
                    <TableCell>25mg SC weekly (induction), 15mg weekly (maintenance)</TableCell>
                    <TableCell>Second-line/steroid-sparing</TableCell>
                    <TableCell>Contraindicated in pregnancy; folate supplementation required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Infliximab</TableCell>
                    <TableCell>Anti-TNF biologic</TableCell>
                    <TableCell>5mg/kg IV at 0, 2, 6 weeks, then q8w</TableCell>
                    <TableCell>Moderate-severe disease</TableCell>
                    <TableCell>TB screening required before initiation</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="liver" className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Liver Disease Medications</h2>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Viral Hepatitis</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Indication</TableHead>
                    <TableHead>Adult Dosing</TableHead>
                    <TableHead>Treatment Duration</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Tenofovir disoproxil fumarate</TableCell>
                    <TableCell>Hepatitis B</TableCell>
                    <TableCell>300mg once daily</TableCell>
                    <TableCell>Long-term/indefinite</TableCell>
                    <TableCell>Monitor renal function</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Entecavir</TableCell>
                    <TableCell>Hepatitis B</TableCell>
                    <TableCell>0.5mg once daily</TableCell>
                    <TableCell>Long-term/indefinite</TableCell>
                    <TableCell>1mg daily for lamivudine-resistant cases</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sofosbuvir/Velpatasvir</TableCell>
                    <TableCell>Hepatitis C (all genotypes)</TableCell>
                    <TableCell>400mg/100mg once daily</TableCell>
                    <TableCell>12 weeks</TableCell>
                    <TableCell>Pangenotypic regimen, preferred first-line</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Glecaprevir/Pibrentasvir</TableCell>
                    <TableCell>Hepatitis C (all genotypes)</TableCell>
                    <TableCell>300mg/120mg once daily</TableCell>
                    <TableCell>8-12 weeks</TableCell>
                    <TableCell>Alternative pangenotypic regimen, safe in renal impairment</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Cirrhosis Complications</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Indication</TableHead>
                    <TableHead>Adult Dosing</TableHead>
                    <TableHead>Line of Therapy</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Propranolol</TableCell>
                    <TableCell>Variceal bleeding prophylaxis</TableCell>
                    <TableCell>20-40mg twice daily</TableCell>
                    <TableCell>First-line</TableCell>
                    <TableCell>Titrate to HR 55-60 bpm or maximum tolerated dose</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Carvedilol</TableCell>
                    <TableCell>Variceal bleeding prophylaxis</TableCell>
                    <TableCell>6.25-12.5mg once daily</TableCell>
                    <TableCell>Alternative to propranolol</TableCell>
                    <TableCell>May have higher efficacy but more hypotension</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Furosemide</TableCell>
                    <TableCell>Ascites</TableCell>
                    <TableCell>20-40mg daily</TableCell>
                    <TableCell>First-line with spironolactone</TableCell>
                    <TableCell>Maintain 40mg furosemide:100mg spironolactone ratio</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Spironolactone</TableCell>
                    <TableCell>Ascites</TableCell>
                    <TableCell>100mg daily</TableCell>
                    <TableCell>First-line with furosemide</TableCell>
                    <TableCell>Monitor potassium levels</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lactulose</TableCell>
                    <TableCell>Hepatic encephalopathy</TableCell>
                    <TableCell>25-30ml three times daily</TableCell>
                    <TableCell>First-line</TableCell>
                    <TableCell>Titrate to 2-3 soft bowel movements daily</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Rifaximin</TableCell>
                    <TableCell>Hepatic encephalopathy</TableCell>
                    <TableCell>550mg twice daily</TableCell>
                    <TableCell>Add-on to lactulose</TableCell>
                    <TableCell>For recurrent encephalopathy</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="functional" className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Functional GI Disorders</h2>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Irritable Bowel Syndrome</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>IBS Subtype</TableHead>
                    <TableHead>Adult Dosing</TableHead>
                    <TableHead>Line of Therapy</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Loperamide</TableCell>
                    <TableCell>IBS-D</TableCell>
                    <TableCell>2-4mg as needed</TableCell>
                    <TableCell>First-line for diarrhea</TableCell>
                    <TableCell>Maximum 16mg/day</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Dicyclomine</TableCell>
                    <TableCell>IBS (all subtypes)</TableCell>
                    <TableCell>10-20mg three times daily</TableCell>
                    <TableCell>First-line for pain</TableCell>
                    <TableCell>May cause anticholinergic side effects</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Amitriptyline</TableCell>
                    <TableCell>IBS (all subtypes)</TableCell>
                    <TableCell>10-25mg at bedtime</TableCell>
                    <TableCell>Second-line for pain</TableCell>
                    <TableCell>Start low, may increase to 50mg</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Psyllium husk</TableCell>
                    <TableCell>IBS-C</TableCell>
                    <TableCell>3.5g twice daily</TableCell>
                    <TableCell>First-line for constipation</TableCell>
                    <TableCell>Take with adequate fluid</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Polyethylene glycol</TableCell>
                    <TableCell>IBS-C</TableCell>
                    <TableCell>17g daily</TableCell>
                    <TableCell>First-line for constipation</TableCell>
                    <TableCell>Mix with water</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Functional Dyspepsia</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Adult Dosing</TableHead>
                    <TableHead>Line of Therapy</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Omeprazole</TableCell>
                    <TableCell>PPI</TableCell>
                    <TableCell>20mg once daily</TableCell>
                    <TableCell>First-line</TableCell>
                    <TableCell>Trial for 4-8 weeks</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Domperidone</TableCell>
                    <TableCell>Prokinetic</TableCell>
                    <TableCell>10mg three times daily</TableCell>
                    <TableCell>Second-line</TableCell>
                    <TableCell>Monitor for QT prolongation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Amitriptyline</TableCell>
                    <TableCell>TCA</TableCell>
                    <TableCell>10-25mg at bedtime</TableCell>
                    <TableCell>Second-line</TableCell>
                    <TableCell>For pain-predominant symptoms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mebeverine</TableCell>
                    <TableCell>Antispasmodic</TableCell>
                    <TableCell>135mg three times daily</TableCell>
                    <TableCell>Second-line</TableCell>
                    <TableCell>For pain-predominant symptoms</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-6 rounded-lg mt-12">
        <h2 className="text-2xl font-semibold mb-4">Formulary Usage Notes</h2>
        <ul className="space-y-2">
          <li><strong>Cost considerations:</strong> Where multiple options are available, more affordable medications are preferentially listed when efficacy is comparable.</li>
          <li><strong>Local availability:</strong> This formulary prioritizes medications that are generally available in Kenya.</li>
          <li><strong>Special populations:</strong> Dose adjustments may be necessary for elderly patients, those with renal or hepatic impairment, and during pregnancy or breastfeeding.</li>
          <li><strong>Abbreviations:</strong> PPI = Proton Pump Inhibitor; H2RA = Histamine-2 Receptor Antagonist; 5-ASA = 5-Aminosalicylic Acid; TCA = Tricyclic Antidepressant; CBC = Complete Blood Count; LFTs = Liver Function Tests; IBS-D = IBS with Diarrhea; IBS-C = IBS with Constipation</li>
        </ul>
      </div>
    </div>
  );
} 