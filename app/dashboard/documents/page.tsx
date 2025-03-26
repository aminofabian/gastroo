import { Metadata } from 'next';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DocumentsList from '@/components/dashboard/DocumentsList';

export const metadata: Metadata = {
  title: 'My Documents | GSK Medical Portal',
  description: 'Access your uploaded documents and certificates',
};

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
          <p className="mt-2 text-gray-600">
            Access your uploaded documents, certificates, and other files
          </p>
        </div>
        
        <DocumentsList />
      </div>
    </DashboardLayout>
  );
} 