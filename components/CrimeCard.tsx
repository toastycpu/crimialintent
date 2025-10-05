import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Crime {
  id: string;
  title: string;
  date: string;
  solved: boolean;
}

export default function CrimeCard({ crime }: { crime: Crime }) {
  return (
    <View style={styles.card}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{crime.title}</Text>
        <Text style={styles.date}>{crime.date}</Text>
      </View>

      {crime.solved && (
        <MaterialCommunityIcons name="handcuffs" size={22} color="gray" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center", // vertical center
    backgroundColor: "white",
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textWrapper: {
    flex: 1,
    paddingRight: 16, // keeps icon spaced from text
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    flexWrap: "wrap",
  },
  date: {
    fontSize: 12,
    color: "#555",
  },
});
