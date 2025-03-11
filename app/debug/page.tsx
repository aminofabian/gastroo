import SessionDebugger from "@/components/debug/SessionDebugger";

export default function DebugPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Session Debug Page</h1>
      <p className="mb-6 text-gray-600">
        This page helps you debug issues with your session and onboarding status.
        If you're being redirected to the membership page even though you've completed onboarding,
        this tool can help identify and fix the issue.
      </p>
      
      <div className="mt-8">
        <SessionDebugger />
      </div>
    </div>
  );
} 