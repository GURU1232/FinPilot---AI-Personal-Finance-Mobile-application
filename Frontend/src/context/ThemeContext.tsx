import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeColors {
  isDark: boolean;
  background: string;
  cardBg: string;
  cardBorder: string;
  headerBg: string[];
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSubtle: string;
  inputBg: string;
  inputBorder: string;
  navBg: string;
  navBorder: string;
  modalBg: string;
  radioActive: string;
}

const lightColors: ThemeColors = {
  isDark: false,
  background: "#f8fafc",
  cardBg: "#ffffff",
  cardBorder: "#e2e8f0",
  headerBg: ["#0f172a", "#1e3a5f"],
  textPrimary: "#0f172a",
  textSecondary: "#334155",
  textMuted: "#64748b",
  accent: "#e11d48", // -inspired vibrant red/rose accent
  accentSubtle: "rgba(225, 29, 72, 0.1)",
  inputBg: "#ffffff",
  inputBorder: "#cbd5e1",
  navBg: "#ffffff",
  navBorder: "#e2e8f0",
  modalBg: "#ffffff",
  radioActive: "#e11d48",
};

const darkColors: ThemeColors = {
  isDark: true,
  background: "#121217",
  cardBg: "#1c1c24",
  cardBorder: "#2a2a36",
  headerBg: ["#0f172a", "#1c1c24"],
  textPrimary: "#ffffff",
  textSecondary: "#cbd5e1",
  textMuted: "#94a3b8",
  accent: "#f43f5e",
  accentSubtle: "rgba(244, 63, 94, 0.15)",
  inputBg: "#181820",
  inputBorder: "#333342",
  navBg: "#181820",
  navBorder: "#2a2a36",
  modalBg: "#1c1c24",
  radioActive: "#f43f5e",
};

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: "dark",
  setThemeMode: () => { },
  colors: darkColors,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  const effectiveMode = themeMode === "system" ? (systemScheme === "light" ? "light" : "dark") : themeMode;
  const colors = effectiveMode === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
