import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const banner = await prisma.banner.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.error("[BANNER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, subtitle, imageUrl, link } = body;

    const banner = await prisma.banner.update({
      where: { id: params.id },
      data: {
        title,
        subtitle,
        imageUrl,
        link,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.error("[BANNER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const banner = await prisma.banner.delete({
      where: { id: params.id },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.error("[BANNER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 