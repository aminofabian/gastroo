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
  isOnboarded: boolean;
  isMember: boolean;
  profileCompleteness: number;
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
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  fetchUserData: () => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  notifications: [],
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  clearError: () => set({ error: null }),
  fetchUserData: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch("/api/user");
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch user data: ${errorText}`);
      }
      
      const userData = await response.json();
      
      // Initialize arrays if they don't exist and set default values for new fields
      const user: User = {
        ...userData,
        isOnboarded: userData.isOnboarded ?? false,
        isMember: userData.isMember ?? false,
        profileCompleteness: userData.profileCompleteness ?? 0,
        socialLinks: userData.socialLinks || [],
        education: userData.education || [],
        achievements: userData.achievements || []
      };
      
      set({ user, isLoading: false });
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      set({ error: error.message, isLoading: false });
      throw error; // Re-throw to allow components to handle the error
    }
  },
})); 