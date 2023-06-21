import { create } from "zustand";

const themeStore = (set, get) => ({
    isDarked: false,
    toggleTheme: () => {
        set({ isDarked: !get().isDarked });
    },
});

export const useThemeStore = create(themeStore);
