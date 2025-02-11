"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PaymentHistory from "@/components/dashboard/PaymentHistory";

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Payment History</h1>
        <PaymentHistory />
      </div>
    </DashboardLayout>
  );
} 