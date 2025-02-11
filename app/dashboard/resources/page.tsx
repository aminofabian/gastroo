import { Metadata } from 'next';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ResourcesList from '@/components/dashboard/ResourcesList';

export const metadata: Metadata = {
  title: 'Resources | GSK Medical Portal',
  description: 'Access medical resources, guidelines, and educational materials',
};

export default function ResourcesPage() {
  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Medical Resources</h1>
          <p className="mt-2 text-gray-600">
            Access the latest medical guidelines, educational materials, and clinical resources
          </p>
        </div>
        
        <ResourcesList />
      </div>
    </DashboardLayout>
  );
} 