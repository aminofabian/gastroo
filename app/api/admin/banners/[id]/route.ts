import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== UserRole.ADMIN) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, image, link, cta, active } = body;

    if (!params.id) {
      return new NextResponse("Banner ID required", { status: 400 });
    }

    const banner = await db.banner.update({
      where: {
        id: params.id
      },
      data: {
        title,
        image,
        link,
        cta,
        active,
      }
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.error("[BANNER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== UserRole.ADMIN) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Banner ID required", { status: 400 });
    }

    const banner = await db.banner.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.error("[BANNER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 