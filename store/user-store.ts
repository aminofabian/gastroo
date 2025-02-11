import { create } from 'zustand';

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: string;
  image: string | null;
  title: string | null;
  bio: string | null;
  specialization: string | null;
  hospital: string | null;
  profileSlug: string | null;
  namePrefix: string | null;
  fullName: string | null;
  designation: string | null;
  socialLinks: Array<{ platform: string; url: string; }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startYear: number;
    endYear?: number;
  }>;
  achievements: Array<{
    title: string;
    description?: string;
    year?: number;
  }>;
}

interface UserStore {
  user: User | null;
  notifications: any[];
  setUser: (user: User | null) => void;
  fetchUserData: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  notifications: [],
  setUser: (user) => set({ user }),
  fetchUserData: async () => {
    try {
      const response = await fetch("/api/user");
      if (!response.ok) throw new Error("Failed to fetch user data");
      const userData = await response.json();
      // Initialize arrays if they don't exist
      const user: User = {
        ...userData,
        socialLinks: userData.socialLinks || [],
        education: userData.education || [],
        achievements: userData.achievements || []
      };
      set({ user });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },
})); 