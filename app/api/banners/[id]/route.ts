import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Updating banner...");
    const session = await auth();
    if (!session?.user) {
      console.log("Unauthorized attempt to update banner");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { title, image, link, cta, order, active } = data;

    console.log("Updating banner with ID:", params.id);
    const banner = await prisma.banner.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(image && { image }),
        ...(link && { link }),
        ...(cta && { cta }),
        ...(typeof order === 'number' && { order }),
        ...(typeof active === 'boolean' && { active }),
      },
    });
    
    console.log("Banner updated successfully");
    return NextResponse.json(banner);
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json({ error: "Failed to update banner" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.banner.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting banner:", error);
    return NextResponse.json({ error: "Failed to delete banner" }, { status: 500 });
  }
} 