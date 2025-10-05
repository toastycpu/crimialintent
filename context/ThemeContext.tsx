import React, { createContext, useState, useContext, ReactNode } from "react";
import { themes } from "../constants/theme";

type ThemeName = keyof typeof themes;

interface ThemeContextType {
  theme: ThemeName;
  colors: typeof themes[ThemeName];
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>("purple"); // default theme

  const value = {
    theme,
    colors: themes[theme],
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
