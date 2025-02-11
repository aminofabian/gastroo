import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export async function GET() {
  try {
    const sliderInfo = await db.sliderInfo.findMany({
      orderBy: {
        order: 'asc'
      },
      where: {
        active: true
      }
    });

    return NextResponse.json(sliderInfo);
  } catch (error) {
    console.error("[SLIDER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== UserRole.ADMIN) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { text, link, linkText } = body;

    if (!text) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Get the highest order
    const lastItem = await db.sliderInfo.findFirst({
      orderBy: {
        order: 'desc'
      }
    });

    const newOrder = lastItem ? lastItem.order + 1 : 0;

    const sliderInfo = await db.sliderInfo.create({
      data: {
        text,
        link,
        linkText,
        order: newOrder,
      }
    });

    return NextResponse.json(sliderInfo);
  } catch (error) {
    console.error("[SLIDER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== UserRole.ADMIN) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    
    const updatedItem = await db.sliderInfo.update({
      where: { id },
      data: body
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("[SLIDER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 