import { create } from "zustand";

const userStore = () => ({
    userDetails: [],
});

export const useUserStore = create(userStore);
