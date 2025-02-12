'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('bank');

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background/80 py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute -left-40 -top-40 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Make a Payment
          </h1>
          <div className="w-20 h-1 bg-primary/20 mx-auto mb-6" />
          <p className="text-xl text-muted-foreground">
            Choose your preferred payment method and follow the instructions below
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-[1fr,2fr]">
          {/* Payment Method Selection */}
          <Card className="h-fit">
            <CardHeader>
              <h2 className="text-xl font-semibold">Payment Method</h2>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue="bank"
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank">Bank Transfer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mpesa" id="mpesa" />
                  <Label htmlFor="mpesa">M-Pesa</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <div className="space-y-8">
            {/* Amount Input */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Payment Amount</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (KES)</Label>
                    <Input
                      id="amount"
                      placeholder="Enter amount"
                      type="number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference">Payment Reference</Label>
                    <Input
                      id="reference"
                      placeholder="e.g., Membership Fee, Event Registration"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Instructions */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">
                  {paymentMethod === 'bank' ? 'Bank Transfer Details' : 'M-Pesa Instructions'}
                </h2>
              </CardHeader>
              <CardContent>
                {paymentMethod === 'bank' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Account Name:</span>
                      <span className="font-medium">GASTROENTEROLOGY SOCIETY OF KENYA</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Account Number:</span>
                      <span className="font-medium">7711630029</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Bank:</span>
                      <span className="font-medium">NCBA</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Branch:</span>
                      <span className="font-medium">YAYA Branch</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">SWIFT Code:</span>
                      <span className="font-medium">CBAFKENX</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Bank Code:</span>
                      <span className="font-medium">07000</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Paybill Number:</span>
                        <span className="font-medium">880100</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Account Number:</span>
                        <span className="font-medium">PAYGSK</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Steps:</h4>
                      <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Go to M-Pesa</li>
                        <li>Select Lipa Na M-Pesa</li>
                        <li>Select Paybill</li>
                        <li>Enter 880100 as business number</li>
                        <li>Enter PAYGSK as account number</li>
                        <li>Enter Amount</li>
                        <li>Enter M-Pesa PIN and confirm</li>
                      </ol>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Need Help?</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    If you need assistance with your payment, please contact our support team:
                  </p>
                  <div className="flex flex-col space-y-2">
                    <span className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      0704373746
                    </span>
                    <span className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      secretarygsk@gmail.com
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30h10v10H30V30zm-10 0h10v10H20V30zm-10 0h10v10H10V30zm30-10h10v10H40V20zm-10 0h10v10H30V20zm-10 0h10v10H20V20zm-10 0h10v10H10V20z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
} 