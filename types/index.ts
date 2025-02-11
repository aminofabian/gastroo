export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  emailVerified?: Date;
  image?: string;
  role: string;
  bio?: string;
  hospital?: string;
  profileSlug?: string;
  specialization?: string;
  title?: string;
  namePrefix?: string;
  fullName?: string;
  designation?: string;
  yearsOfExperience?: number;
  languages?: string[];
  certifications?: string[];
  researchInterests?: string[];
  publicationCount?: number;
  lastActive?: Date;
  profileCompleteness?: number;
  isProfilePublic?: boolean;
  hasActiveSubscription?: boolean;
  subscriptionEndDate?: Date;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    field: string;
    startYear: number;
    endYear?: number;
  }>;
  achievements?: Array<{
    title: string;
    description?: string;
    year?: number;
  }>;
}

export type Banner = {
  id: string;
  image: string;
  title: string;
  link: string;
  cta: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
} 