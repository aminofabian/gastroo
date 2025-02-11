import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { banners } = await req.json();

    // Update all banners in a transaction
    await prisma.$transaction(
      banners.map((banner: any) =>
        prisma.banner.update({
          where: { id: banner.id },
          data: { order: banner.order },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering banners:", error);
    return NextResponse.json({ error: "Failed to reorder banners" }, { status: 500 });
  }
} 