import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import { Stack, useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import CrimeCard from "../components/CrimeCard";
import { useState, useCallback } from "react";

interface Crime {
  id: string;
  title: string;
  details?: string;
  date: string;
  solved: boolean;
  photoUri?: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const { theme, colors } = useTheme();
  const [crimes, setCrimes] = useState<Crime[]>([]);

  const loadCrimes = async () => {
    try {
      const stored = await AsyncStorage.getItem("crimes");
      const parsed: Crime[] = stored ? JSON.parse(stored) : [];
      setCrimes(parsed);
    } catch (err) {
      console.error("Failed to load crimes", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCrimes();
    }, [])
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Criminal Intent",
          headerStyle: {
            backgroundColor: theme === "black" || theme === "purple" ? "#6A0DAD" : colors.header,
          },
          headerTitleAlign: "left",
          headerTintColor: theme === "white" ? "#000" : "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 12, marginRight: 8 }}>
              <Pressable onPress={() => router.push("/crime/new")}>
                <Ionicons name="add" size={28} color={theme === "white" ? "#000" : "#fff"} />
              </Pressable>
              <Pressable onPress={() => router.push("/settings")}>
                <Ionicons name="settings-outline" size={24} color={theme === "white" ? "#000" : "#fff"} />
              </Pressable>
            </View>
          ),
        }}
      />

      <View style={[styles.container, { backgroundColor: colors.background || "#EEE" }]}>
        {crimes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.text || "#555" }]}>No crimes added yet</Text>
          </View>
        ) : (
          <FlatList data={crimes} keyExtractor={(c) => c.id} renderItem={({ item }) => <CrimeCard crime={item} />} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyState: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16 },
});

