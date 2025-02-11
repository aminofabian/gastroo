import { Metadata } from 'next';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LearningList from '@/components/dashboard/LearningList';

export const metadata: Metadata = {
  title: 'Learning Hub | GSK Medical Portal',
  description: 'Access medical courses, workshops, and educational programs',
};

export default function LearningPage() {
  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Learning Hub</h1>
          <p className="mt-2 text-gray-600">
            Enhance your medical knowledge with our comprehensive learning programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-3">
            <LearningList />
          </div>

          {/* Sidebar with progress and achievements */}
          <div className="space-y-6">
            {/* Learning Progress */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Completed Courses</span>
                    <span className="text-gray-900 font-medium">4/12</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-emerald-500 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">CME Points</span>
                    <span className="text-gray-900 font-medium">24/50</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-lg">🏆</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Early Adopter</p>
                    <p className="text-xs text-gray-600">Completed first course</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 text-lg">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Knowledge Seeker</p>
                    <p className="text-xs text-gray-600">Earned 20+ CME points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 