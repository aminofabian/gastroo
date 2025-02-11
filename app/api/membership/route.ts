import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const { items = [] } = data; // Provide default empty array

    // Safely handle array operations
    if (!Array.isArray(items)) {
      return new NextResponse("Invalid items format", { status: 400 });
    }

    const result = await prisma.membership.create({
      data: {
        userId: session.user.id,
        items: {
          create: items.map(item => ({
            ...item,
            userId: session.user.id
          }))
        }
      },
      include: {
        items: true
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[MEMBERSHIP_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 