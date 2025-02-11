import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const headersList = headers();
  
  // Set up SSE headers
  const response = new Response(
    new ReadableStream({
      async start(controller) {
        try {
          // Initial data fetch
          const events = await db.event.findMany({
            orderBy: {
              startDate: 'asc',
            },
            include: {
              attendees: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          });

          // Send initial data
          controller.enqueue(`data: ${JSON.stringify(events)}\n\n`);

          // Keep connection alive with a heartbeat
          const heartbeat = setInterval(() => {
            controller.enqueue(': heartbeat\n\n');
          }, 30000);

          // Clean up on close
          req.signal.addEventListener('abort', () => {
            clearInterval(heartbeat);
            controller.close();
          });
        } catch (error) {
          console.error('SSE Error:', error);
          controller.error(error);
        }
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    }
  );

  return response;
}
