import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    const {
      image,
      title,
      bio,
      specialization,
      hospital,
      profileSlug,
      namePrefix,
      fullName,
      designation,
      socialLinks,
      education,
      achievements
    } = data;

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        image,
        title,
        bio,
        specialization,
        hospital,
        profileSlug,
        namePrefix,
        fullName,
        designation,
        socialLinks: {
          deleteMany: {},
          create: socialLinks?.map((link: any) => ({
            platform: link.platform,
            url: link.url
          }))
        },
        education: {
          deleteMany: {},
          create: education?.map((edu: any) => ({
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field,
            startYear: edu.startYear,
            endYear: edu.endYear
          }))
        },
        achievements: {
          deleteMany: {},
          create: achievements?.map((achievement: any) => ({
            title: achievement.title,
            description: achievement.description,
            year: achievement.year
          }))
        }
      },
      include: {
        socialLinks: true,
        education: true,
        achievements: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return new NextResponse("Error updating profile", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        profileSlug: slug,
        isProfilePublic: true
      },
      select: {
        firstName: true,
        lastName: true,
        image: true,
        title: true,
        bio: true,
        specialization: true,
        hospital: true,
        namePrefix: true,
        fullName: true,
        designation: true,
        socialLinks: {
          select: {
            platform: true,
            url: true,
          }
        },
        education: {
          select: {
            institution: true,
            degree: true,
            field: true,
            startYear: true,
            endYear: true,
          },
          orderBy: {
            startYear: 'desc'
          }
        },
        achievements: {
          select: {
            title: true,
            description: true,
            year: true,
          },
          orderBy: {
            year: 'desc'
          }
        }
      }
    });

    if (!user) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new NextResponse("Error fetching profile", { status: 500 });
  }
} 