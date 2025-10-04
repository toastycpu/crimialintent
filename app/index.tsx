import {
  StyleSheet, 
  View, 
  FlatList, 
  Text, 
  Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCrimes } from "../context/CrimeContext";
import CrimeCard from "../components/CrimeCard";


interface Crime {
  id: string;
  title: string;
  date: string;
  solved: boolean;
}

export default function HomeScreen() {
  const router = useRouter();
  const { crimes } = useCrimes();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Criminal Intent",
          headerStyle: { backgroundColor: "#6A0DAD" },
          headerTitleAlign: "left",
          headerLargeTitle: false,
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold"},
          headerRight: () => (
            <Pressable onPress={() => router.push("/crime/new")}>
              <Ionicons name="add" size={28} color="white" />
            </Pressable>
          ),
        }}
      />

      <View style={styles.container}>
        {crimes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No crimes added yet</Text>
          </View>
        ) : (
          <FlatList
            data={crimes}
            keyExtractor={(c) => c.id}
            renderItem={({ item }) => <CrimeCard crime={item} />}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#EEE" },
  emptyState: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" },
  emptyText: { 
    fontSize: 16, 
    color: "#555" },
});




