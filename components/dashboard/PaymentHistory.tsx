import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Payment {
  id: string;
  amount: number;
  status: "ACTIVE" | "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED" | "EXPIRED";
  transactionId: string;
  phoneNumber: string;
  createdAt: string;
  description: string;
}

interface PaymentHistoryProps {
  className?: string;
}

export default function PaymentHistory({ className = "" }: PaymentHistoryProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/payments");
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500 hover:bg-green-600";
      case "ACTIVE":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "PENDING":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "FAILED":
        return "bg-red-500 hover:bg-red-600";
      case "CANCELLED":
        return "bg-gray-500 hover:bg-gray-600";
      case "EXPIRED":
        return "bg-orange-500 hover:bg-orange-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  if (loading) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </Card>
    );
  }

  if (payments.length === 0) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex justify-center items-center h-40 text-gray-500">
          No payment history found
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-4 ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount (KES)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                {format(new Date(payment.createdAt), "MMM d, yyyy HH:mm")}
              </TableCell>
              <TableCell>{payment.transactionId}</TableCell>
              <TableCell>{payment.phoneNumber}</TableCell>
              <TableCell>{payment.description}</TableCell>
              <TableCell>{payment.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(payment.status)}>
                  {payment.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
} 