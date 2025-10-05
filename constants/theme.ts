export const themes = {
  white: {
    background: "#ffffff",
    text: "#000000",
    header: "#e9e9e9ff", 
    shadow: "#6A0DAD55",
  },
  black: {
    background: "#121212",
    text: "#ffffff",
    header: "#6A0DAD",
    shadow: "#ffffff88", 
  },
  purple: {
    background: "#e1ccf8ff",
    text: "#fff",
    header: "#6A0DAD",
    shadow: "#6A0DAD55",
  },
  red: {
    background: "#FFE5E5",
    text: "#5A0000",
    header: "#B00020",
    shadow: "#B0002055",
  },
  green: {
    background: "#E8F5E9",
    text: "#003300",
    header: "#2E7D32",
    shadow: "#2E7D3255",
  },
  blue: {
    background: "#bad0dfff",
    text: "#ffffffff",
    header: "#1565C0",
    shadow: "#1565C055",
  },
};

export type ThemeName = keyof typeof themes;
export const getThemeColors = (theme: ThemeName) => themes[theme];
