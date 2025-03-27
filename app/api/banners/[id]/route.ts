import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { uploadToS3 } from "@/lib/s3";

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

    // Check content type to determine how to handle the request
    const contentType = req.headers.get("content-type") || "";

    let updateData: any = {};

    if (contentType.includes("multipart/form-data")) {
      // Handle FormData for file uploads
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const title = formData.get("title") as string;
      const link = formData.get("link") as string;
      const cta = formData.get("cta") as string;
      
      if (title) updateData.title = title;
      if (link) updateData.link = link;
      if (cta) updateData.cta = cta;
      
      if (file) {
        console.log("Uploading new file for banner...");
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `banners/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const imageUrl = await uploadToS3(buffer, fileName, file.type);
        updateData.image = imageUrl;
        console.log("File uploaded successfully:", imageUrl);
      }
    } else {
      // Handle JSON data for regular updates
      const data = await req.json();
      const { title, image, link, cta, order, active } = data;

      if (title) updateData.title = title;
      if (image) updateData.image = image;
      if (link) updateData.link = link;
      if (cta) updateData.cta = cta;
      if (typeof order === 'number') updateData.order = order;
      if (typeof active === 'boolean') updateData.active = active;
    }

    console.log("Updating banner with ID:", params.id);
    const banner = await prisma.banner.update({
      where: { id: params.id },
      data: updateData,
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