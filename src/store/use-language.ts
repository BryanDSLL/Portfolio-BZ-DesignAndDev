import { create } from "zustand"

export type Language = "pt" | "en"

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

export const useLanguage = create<LanguageState>((set) => ({
  language: "pt",
  setLanguage: (lang) => set({ language: lang }),
  toggleLanguage: () =>
    set((state) => ({ language: state.language === "pt" ? "en" : "pt" })),
}))
