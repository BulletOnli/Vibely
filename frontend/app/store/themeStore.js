import { create } from "zustand";

const themeStore = (set, get) => ({
    isDarked: true,
    toggleTheme: () => {
        set({ isDarked: !get().isDarked });
    },
});

export const useThemeStore = create(themeStore);
