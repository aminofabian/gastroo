import Link from "next/link";
import { getRecentUpdates } from "@/app/actions/get-recent-updates";
import UpdateItem from "./UpdateItem";

export default async function RecentUpdatesList() {
  const recentUpdates = await getRecentUpdates();

  return (
    <div className="bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#083c74]"></div>
          <div>
            <h2 className="text-xl font-bold text-[#083c74]">Recent Updates</h2>
            <p className="text-sm text-gray-500">Latest medical updates and announcements</p>
          </div>
        </div>
        <Link href="/dashboard/updates" className="text-sm text-[#083c74] hover:text-[#004488] font-medium">
          View All
        </Link>
      </div>
      <div className="space-y-2.5">
        {recentUpdates.map((update, index) => (
          <UpdateItem key={update.id} update={update} index={index} />
        ))}
      </div>
    </div>
  );
} 