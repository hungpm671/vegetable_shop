import { create } from "zustand";

interface UserState {
  userEmail: string;
  setUserEmail: (email: string) => void;
}

export const useUsersStore = create<UserState>()((set) => ({
  userEmail: "",
  setUserEmail: (email) => set(() => ({ userEmail: email })),
}));
