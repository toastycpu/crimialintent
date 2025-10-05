import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { getThemeColors } from "@/constants/theme";

const themes = ["white", "black", "purple", "red", "green", "blue"];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Pick a Theme</Text>
      {themes.map((t) => (
        <TouchableOpacity
          key={t}
          style={[
            styles.button,
            {
              backgroundColor: colors.header,
              shadowColor: colors.shadow,
              shadowOpacity: 0.5, // ✅ stronger & consistent across all themes
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
              elevation: 5,
            },
          ]}
          onPress={() => setTheme(t as any)}
        >
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: 200,
    padding: 15,
    marginVertical: 6,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
