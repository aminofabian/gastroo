import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Download, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  paymentStatus: string;
  isAttended: boolean;
  createdAt: string;
  payment?: {
    status: string;
    amount: number;
    transactionId: string;
    createdAt: string;
  } | null;
}

interface EventRegistrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
}

export default function EventRegistrationsModal({
  isOpen,
  onClose,
  eventId,
  eventTitle,
}: EventRegistrationsModalProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && eventId) {
      fetchRegistrations();
    }
  }, [isOpen, eventId]);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/admin/events/registrations/${eventId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch registrations");
      }
      
      const data = await response.json();
      setRegistrations(data.registrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch registrations");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch registrations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    // Create CSV content
    const headers = ["First Name", "Last Name", "Email", "Phone", "Payment Method", "Payment Status", "Attended", "Registration Date", "Payment Amount", "Transaction ID"];
    const csvRows = [headers];
    
    registrations.forEach(reg => {
      const row = [
        reg.firstName,
        reg.lastName,
        reg.email,
        reg.phone,
        reg.paymentMethod,
        reg.paymentStatus,
        reg.isAttended ? "Yes" : "No",
        format(new Date(reg.createdAt), "PPp"),
        reg.payment?.amount ? `KES ${reg.payment.amount}` : "N/A",
        reg.payment?.transactionId || "N/A"
      ];
      csvRows.push(row);
    });
    
    // Convert to CSV string
    const csvContent = csvRows.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${eventTitle.replace(/\s+/g, "_")}_registrations_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = registrations.filter(reg => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reg.firstName.toLowerCase().includes(searchLower) ||
      reg.lastName.toLowerCase().includes(searchLower) ||
      reg.email.toLowerCase().includes(searchLower) ||
      reg.phone.toLowerCase().includes(searchLower)
    );
  });

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "FAILED":
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white border-0 shadow-xl">
        <DialogHeader className="bg-[#c22f63] text-white p-6 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            <span>Registrations for {eventTitle}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-white/90 mt-2 text-base">
            {registrations.length} {registrations.length === 1 ? "person" : "people"} registered for this event
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search registrations..."
              className="pl-8 border-gray-300 focus:border-[#c22f63] focus:ring-[#c22f63]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button
            variant="outline"
            onClick={exportToCSV}
            disabled={registrations.length === 0}
            className="flex items-center gap-2 border-[#c22f63] text-[#c22f63] hover:bg-[#c22f63]/10"
          >
            <Download className="h-4 w-4" />
            Export to CSV
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto p-4 bg-white">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#c22f63]" />
              <span className="ml-2 text-gray-700 font-medium">Loading registrations...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-red-500 font-medium">
              <span>{error}</span>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-500 font-medium">
              {searchTerm ? "No registrations match your search" : "No registrations found for this event"}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="sticky top-0 bg-gray-100">
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-700">Name</TableHead>
                    <TableHead className="font-semibold text-gray-700">Email</TableHead>
                    <TableHead className="font-semibold text-gray-700">Phone</TableHead>
                    <TableHead className="font-semibold text-gray-700">Payment Method</TableHead>
                    <TableHead className="font-semibold text-gray-700">Payment Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Attended</TableHead>
                    <TableHead className="font-semibold text-gray-700">Registration Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id} className="hover:bg-gray-50 border-b border-gray-100">
                      <TableCell className="font-medium text-gray-900">
                        {registration.firstName} {registration.lastName}
                      </TableCell>
                      <TableCell className="text-gray-700">{registration.email}</TableCell>
                      <TableCell className="text-gray-700">{registration.phone}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                          {registration.paymentMethod}
                        </span>
                      </TableCell>
                      <TableCell>
                        {registration.paymentStatus === "COMPLETED" ? (
                          <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
                        ) : registration.paymentStatus === "PENDING" ? (
                          <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
                        ) : registration.paymentStatus === "FAILED" ? (
                          <Badge className="bg-red-500 hover:bg-red-600">Failed</Badge>
                        ) : (
                          <Badge className="bg-gray-500 hover:bg-gray-600">{registration.paymentStatus}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {registration.isAttended ? (
                          <Badge className="bg-green-500 hover:bg-green-600">Yes</Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-700 border-gray-400">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {format(new Date(registration.createdAt), "PPp")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 