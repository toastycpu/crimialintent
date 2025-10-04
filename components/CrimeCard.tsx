import { StyleSheet, View, Text } from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

interface Crime {
  id: string;
  title: string;
  date: string;
  solved: boolean;
}

export default function CrimeCard({ crime }: { crime: Crime }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{crime.title}</Text>
        <Text style={styles.date}>{crime.date}</Text>
      </View>

      {/* If solved, show handcuff icon */}
      {crime.solved && (
        <MaterialCommunityIcons
          name="handcuffs"
          size={22}
          color="gray"
          style={styles.icon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#555",
  },
  icon: {
    marginLeft: 10,
  },
});
