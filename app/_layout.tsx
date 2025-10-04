import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { CrimeProvider } from "../context/CrimeContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <CrimeProvider>  {/* ✅ wrap the whole app so crimes are shared */}
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#6A0DAD" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          {/* Index screen (crime list) */}
          <Stack.Screen
            name="index"
            options={{
              title: "Criminal Intent",
            }}
          />

          {/* Crime detail screen */}
          <Stack.Screen
            name="[id]"
            options={{
              title: "Crime Detail",
            }}
          />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </CrimeProvider>
  );
}

