"use client";

import { useState, useEffect, useCallback } from "react";
import { useUserStore } from "@/store/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { CameraIcon, Trash2Icon, PlusCircleIcon, XCircleIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const profileSchema = z.object({
  image: z.string().optional(),
  title: z.string().optional(),
  bio: z.string().optional(),
  specialization: z.string().optional(),
  hospital: z.string().optional(),
  profileSlug: z.string().min(3, "Slug must be at least 3 characters").optional(),
  namePrefix: z.string().optional(),
  fullName: z.string().optional(),
  designation: z.string().optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url("Must be a valid URL")
  })),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    startYear: z.number().min(1900).max(new Date().getFullYear()),
    endYear: z.number().min(1900).max(new Date().getFullYear()).optional()
  })),
  achievements: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    year: z.number().min(1900).max(new Date().getFullYear()).optional()
  }))
});

const SOCIAL_PLATFORMS = {
  LINKEDIN: "LinkedIn",
  TWITTER: "Twitter",
  RESEARCHGATE: "ResearchGate",
  GOOGLESCHOLAR: "Google Scholar",
  ORCID: "ORCID",
  WEBSITE: "Website",
  OTHER: "Other"
} as const;

export default function EditProfilePage() {
  const { user } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.image || null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/profile/current");
        if (!response.ok) throw new Error("Failed to fetch profile");
        const userData = await response.json();
        
        return {
          image: userData.image || "",
          title: userData.title || "",
          bio: userData.bio || "",
          specialization: userData.specialization || "",
          hospital: userData.hospital || "",
          profileSlug: userData.profileSlug || "",
          namePrefix: userData.namePrefix || "",
          fullName: userData.fullName || "",
          designation: userData.designation || "",
          socialLinks: userData.socialLinks || [],
          education: userData.education?.map((edu: any) => ({
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field,
            startYear: edu.startYear,
            endYear: edu.endYear
          })) || [],
          achievements: userData.achievements?.map((achievement: any) => ({
            title: achievement.title,
            description: achievement.description,
            year: achievement.year
          })) || [],
        };
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
        // Fallback to user store data
        return {
          image: user?.image || "",
          title: user?.title || "",
          bio: user?.bio || "",
          specialization: user?.specialization || "",
          hospital: user?.hospital || "",
          profileSlug: user?.profileSlug || "",
          namePrefix: user?.namePrefix || "",
          fullName: user?.fullName || "",
          designation: user?.designation || "",
          socialLinks: user?.socialLinks || [],
          education: user?.education || [],
          achievements: user?.achievements || [],
        };
      } finally {
        setIsLoading(false);
      }
    }
  });

  const updateProfileSlug = useCallback((prefix: string | undefined, name: string | undefined, designation: string | undefined) => {
    if (!name) return;
    
    // Convert to lowercase and remove special characters
    let slug = name.toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, '') // Remove special characters
      .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove hyphens from start and end

    // Add prefix if it exists (e.g., dr, prof)
    if (prefix) {
      const cleanPrefix = prefix.toLowerCase()
        .trim()
        .replace(/\./g, '')     // Remove dots
        .replace(/\s+/g, '')    // Remove spaces
        .replace(/[^a-z]/g, ''); // Keep only letters
      if (cleanPrefix) {
        slug = `${cleanPrefix}-${slug}`;
      }
    }

    // Add designation if it exists (e.g., md, phd)
    if (designation) {
      const cleanDesignation = designation.toLowerCase()
        .trim()
        .replace(/\./g, '')     // Remove dots
        .replace(/\s+/g, '')    // Remove spaces
        .replace(/[^a-z]/g, ''); // Keep only letters
      if (cleanDesignation) {
        slug = `${slug}-${cleanDesignation}`;
      }
    }

    // Ensure slug is at least 3 characters
    if (slug.length < 3) {
      slug = slug.padEnd(3, '0');
    }

    console.log('Generated slug:', slug); // For debugging
    form.setValue("profileSlug", slug);
  }, [form]);

  // Call updateProfileSlug whenever relevant fields change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'fullName' || name === 'namePrefix' || name === 'designation') {
        const values = form.getValues();
        updateProfileSlug(values.namePrefix, values.fullName, values.designation);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateProfileSlug]);

  // Initial slug generation
  useEffect(() => {
    const values = form.getValues();
    if (values.fullName) {
      updateProfileSlug(values.namePrefix, values.fullName, values.designation);
    }
  }, [updateProfileSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-gray-500">Loading profile data...</p>
        </div>
      </div>
    );
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      form.setValue("image", url);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    form.setValue("image", "");
  };

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    // Ensure slug is set before submitting
    if (!values.profileSlug && values.fullName) {
      updateProfileSlug(values.namePrefix, values.fullName, values.designation);
      values.profileSlug = form.getValues("profileSlug");
    }

    setIsSubmitting(true);
    try {
      // Handle image upload first if there's a new image
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadResponse.ok) throw new Error("Failed to upload image");
        const { url } = await uploadResponse.json();
        values.image = url;
      }

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error("Failed to update profile");

      // Refresh user data in store
      await useUserStore.getState().fetchUserData();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
            <p className="mt-1 text-sm text-gray-500">
              Update your profile information and manage your professional presence.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Profile Image Section */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={previewUrl || ""} />
                        <AvatarFallback>
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <label
                        htmlFor="image-upload"
                        className="absolute bottom-0 right-0 -mb-2 -mr-2 bg-white rounded-full p-1 shadow-lg cursor-pointer hover:bg-gray-100"
                      >
                        <CameraIcon className="h-5 w-5 text-gray-600" />
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium">Profile Photo</h3>
                      <p className="text-sm text-gray-500">
                        Upload a professional photo for your profile.
                      </p>
                      <div className="flex space-x-2">
                        <label
                          htmlFor="image-upload-btn"
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer"
                        >
                          Change
                          <input
                            id="image-upload-btn"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                        {previewUrl && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={removeImage}
                            className="inline-flex items-center text-red-600 hover:text-red-700"
                          >
                            <Trash2Icon className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="namePrefix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <select
                              className="w-full px-3 py-2 border rounded-md"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                updateProfileSlug(e.target.value, form.getValues("fullName"), form.getValues("designation"));
                              }}
                            >
                              <option value="">None</option>
                              <option value="DR">Dr</option>
                              <option value="PROF">Prof</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                updateProfileSlug(form.getValues("namePrefix"), e.target.value, form.getValues("designation"));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Designation</FormLabel>
                          <FormControl>
                            <select
                              className="w-full px-3 py-2 border rounded-md"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                updateProfileSlug(form.getValues("namePrefix"), form.getValues("fullName"), e.target.value);
                              }}
                            >
                              <option value="">None</option>
                              <option value="MD">MD</option>
                              <option value="MBBS">MBBS</option>
                              <option value="PHD">PhD</option>
                              <option value="MPH">MPH</option>
                              <option value="MRCP">MRCP</option>
                              <option value="FRCP">FRCP</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialization</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Gastroenterology" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hospital"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hospital/Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="Where do you practice?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="profileSlug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile URL</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-2">gastro.or.ke/profile/</span>
                              <Input 
                                placeholder="your-name" 
                                {...field}
                                readOnly
                                className="bg-gray-50"
                              />
                            </div>
                          </FormControl>
                          <div className="mt-2">
                            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                              <span className="text-sm text-gray-600 truncate flex-1">
                                {`https://gastro.or.ke/profile/${field.value || ''}`}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                className="h-8 px-2 text-gray-600 hover:text-gray-900"
                                onClick={() => {
                                  navigator.clipboard.writeText(`https://gastro.or.ke/profile/${field.value || ''}`);
                                  toast.success("Profile link copied to clipboard!");
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                </svg>
                              </Button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              This is your public profile link that you can share with others
                            </p>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about yourself..."
                                className="resize-none h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links Section */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Social Links</h2>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const currentLinks = form.getValues("socialLinks");
                        form.setValue("socialLinks", [...currentLinks, { platform: "LINKEDIN", url: "" }]);
                      }}
                      className="inline-flex items-center"
                    >
                      <PlusCircleIcon className="h-4 w-4 mr-2" />
                      Add Link
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {(form.watch("socialLinks") || []).map((_, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <FormField
                          control={form.control}
                          name={`socialLinks.${index}.platform`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Platform</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select platform" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.entries(SOCIAL_PLATFORMS).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>
                                      {label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`socialLinks.${index}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="mt-8"
                          onClick={() => {
                            const currentLinks = form.getValues("socialLinks");
                            form.setValue(
                              "socialLinks",
                              currentLinks.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <XCircleIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#003366] hover:bg-[#004488] text-white px-8 min-w-[150px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <Spinner size="sm" className="border-white" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Save Profile"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}