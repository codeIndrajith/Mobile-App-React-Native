import { Platform } from "react-native";

const Colors = {
  light: {
    text: "#0F172A",
    background: "#F8FAFC",
    tint: "#000000ff",
    icon: "#64748B",
    border: "#E2E8F0",
    tabIconDefault: "#94A3B8",
    tabIconSelected: "#2563EB",
    surface: "#FFFFFF",
  },
  dark: {
    text: "#F1F5F9",
    background: "#000000ff",
    tint: "#60A5FA",
    icon: "#94A3B8",
    border: "#1E293B",
    tabIconDefault: "#475569",
    tabIconSelected: "#60A5FA",
    surface: "#1E293B",
  },
};

const Fonts = Platform.select({
  ios: {
    sans: "System",
    mono: "Menlo",
    rounded: "SF Pro Rounded",
  },
  android: {
    sans: "sans-serif",
    mono: "monospace",
    rounded: "sans-serif",
  },
  web: {
    sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "JetBrains Mono, Fira Code, monospace",
    rounded: "ui-rounded, 'SF Pro Rounded', sans-serif",
  },
});

/**
 * Spacing & Layout Constants
 * Essential for maintaining the "Minimalist" rhythm.
 */
const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export { Colors, Fonts, Spacing };
