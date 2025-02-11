import { Metadata } from 'next';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ResearchList from '@/components/dashboard/ResearchList';

export const metadata: Metadata = {
  title: 'Research Hub | GSK Medical Portal',
  description: 'Access medical research opportunities, publications, and clinical trials',
};

export default function ResearchPage() {
  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Research Hub</h1>
          <p className="mt-2 text-gray-600">
            Explore medical research opportunities, publications, and ongoing clinical trials
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-3">
            <ResearchList />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Research Stats */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Research Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-lg">📚</span>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">12</p>
                    <p className="text-sm text-gray-600">Publications</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <span className="text-emerald-600 text-lg">🔬</span>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">5</p>
                    <p className="text-sm text-gray-600">Active Trials</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-lg">📊</span>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">8</p>
                    <p className="text-sm text-gray-600">Collaborations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-gray-900">Research Guidelines</h4>
                  <p className="text-sm text-gray-600">Access research protocols and guidelines</p>
                </a>
                <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-gray-900">Ethics Committee</h4>
                  <p className="text-sm text-gray-600">Submit protocols for review</p>
                </a>
                <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-gray-900">Grant Opportunities</h4>
                  <p className="text-sm text-gray-600">Browse available research grants</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 