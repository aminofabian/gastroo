import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { getUserStatistics } from '@/app/actions/statistics';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch actual statistics from the database
    const userStats = await getUserStatistics();
    
    if (!userStats) {
      return NextResponse.json({ error: 'Failed to fetch user statistics' }, { status: 500 });
    }

    // Transform the data to match the expected format for the sidebar
    const stats = [
      { 
        label: "CPD Points", 
        value: `${userStats.cpdPoints.value}/${userStats.cpdPoints.target}`, 
        icon: "🎯",
        description: "Annual Target"
      },
      { 
        label: "Member Status", 
        value: session.user?.role || "Member", 
        icon: "🏅",
        description: "MMed (Medicine)"
      },
      { 
        label: "Research", 
        value: userStats.documents.value.toString(), 
        icon: "🔬",
        description: "Publications"
      },
      { 
        label: "Procedures", 
        value: userStats.eventsAttended.value.toString(), 
        icon: "⚕️",
        description: "This Year"
      },
    ];

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 