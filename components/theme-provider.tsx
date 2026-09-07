"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

export const themeLogos: Record<Theme, string> = {
  light: "/img/logo/logonerosubianco.svg",
  dark: "/img/logo/logobiancosunero.svg",
};

type ThemeContextValue = {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  logoSrc: string;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "jaderweb-theme";
const THEME_EVENT = "jaderweb:theme";

function normalizeTheme(value: string | null): Theme {
  if (value === "light") return "light";
  return "dark";
}

function subscribeTheme(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_EVENT, onStoreChange);
  };
}

function getThemeSnapshot(): Theme {
  return normalizeTheme(window.localStorage.getItem(STORAGE_KEY));
}

function getThemeServerSnapshot(): Theme {
  return "dark";
}

function subscribeMounted() {
  return () => {};
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "accent") {
      window.localStorage.setItem(STORAGE_KEY, "dark");
      window.dispatchEvent(new Event(THEME_EVENT));
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute("data-theme", next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme =
      normalizeTheme(window.localStorage.getItem(STORAGE_KEY)) === "light"
        ? "dark"
        : "light";
    setTheme(next);
  }, [setTheme]);

  const value = useMemo(
    () => ({
      theme,
      mounted,
      setTheme,
      toggleTheme,
      logoSrc: themeLogos[theme],
    }),
    [theme, mounted, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
