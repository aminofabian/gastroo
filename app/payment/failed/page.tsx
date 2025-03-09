import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <XCircle className="w-16 h-16 text-red-500 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-8">
          We were unable to process your payment. Please try again or contact support if the problem persists.
        </p>
        <Button asChild className="w-full bg-[#c22f61] hover:bg-[#004488]">
          <Link href="/membership">
            Try Again
          </Link>
        </Button>
      </div>
    </div>
  );
} 