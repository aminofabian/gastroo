import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3-upload";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching banners...");
    const banners = await prisma.banner.findMany({
      orderBy: { order: "asc" },
      where: { active: true },
    });
    console.log(`Found ${banners.length} active banners`);
    return NextResponse.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log("Creating new banner...");
    const session = await auth();
    if (!session?.user) {
      console.log("Unauthorized attempt to create banner");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string || "New Banner";
    const link = formData.get("link") as string || "/";
    const cta = formData.get("cta") as string || "Learn More";
    
    let image = "/images/placeholder-banner.jpg";
    
    if (file) {
      console.log("Uploading file to S3...");
      image = await uploadToS3(file);
      console.log("File uploaded successfully:", image);
    }
    
    // Get the highest order number
    const highestOrder = await prisma.banner.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });
    
    const newOrder = (highestOrder?.order ?? -1) + 1;
    console.log("Creating banner with order:", newOrder);
    
    // Create new banner
    const banner = await prisma.banner.create({
      data: {
        title,
        image,
        link,
        cta,
        order: newOrder,
        active: true,
      },
    });

    console.log("Banner created successfully:", banner.id);
    return NextResponse.json({ banner });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 });
  }
} 