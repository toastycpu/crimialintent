import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

import { ThemeProvider as CustomThemeProvider, useTheme } from "../context/ThemeContext";

// Settings button shown in header
function HeaderRight() {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/settings") return null;

  return (
    <Ionicons
      name="settings-outline"
      size={24}
      color="white"
      style={{ marginRight: 15 }}
      onPress={() => router.push("/settings")}
    />
  );
}

// This wrapper lets us access the theme context inside the Stack
function ThemedStack() {
  const { colors, theme } = useTheme();

  // Keep purple header for "purple" and "black"
  const headerColor =
    theme === "purple" || theme === "black"
      ? "#6A0DAD"
      : colors.header;

  const textColor = theme === "white" ? "black" : "#fff";

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: headerColor },
          headerTintColor: textColor,
          headerTitleStyle: { fontWeight: "bold" },
          headerTitle: "Criminal Intent",
          headerRight: () => <HeaderRight />,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="[id]" />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
          }}
        />
      </Stack>
      <StatusBar style={theme === "white" ? "dark" : "light"} />
    </>
  );
}

export default function RootLayout() {
  return (
    <CustomThemeProvider>
      <ThemedStack />
    </CustomThemeProvider>
  );
}

