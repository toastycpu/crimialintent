import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Alert,
  Platform,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../../context/ThemeContext";
import { getThemeColors } from "@/constants/theme";

interface Crime {
  id: string;
  title: string;
  details: string;
  date: string;
  solved: boolean;
  photoUri?: string;
}

export default function CrimeDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [solved, setSolved] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [allCrimes, setAllCrimes] = useState<Crime[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadCrimes();
  }, []);

  const loadCrimes = async () => {
    try {
      const stored = await AsyncStorage.getItem("crimes");
      const parsed: Crime[] = stored ? JSON.parse(stored) : [];
      setAllCrimes(parsed);

      if (id && id !== "new") {
        const crime = parsed.find((c) => c.id === id);
        if (crime) {
          setTitle(crime.title);
          setDetails(crime.details);
          setDate(new Date(crime.date));
          setSolved(crime.solved);
          setPhotoUri(crime.photoUri || null);
        }
      }
    } catch (err) {
      console.error("Failed to load crimes", err);
    }
  };

  const saveCrime = async () => {
    try {
      let updatedCrimes;
      const dateString = date.toDateString();
      if (id && id !== "new") {
        updatedCrimes = allCrimes.map((c) =>
          c.id === id
            ? { ...c, title, details, date: dateString, solved, photoUri: photoUri ?? undefined }
            : c
        );
      } else {
        const newCrime: Crime = {
          id: Date.now().toString(),
          title,
          details,
          date: dateString,
          solved,
          photoUri: photoUri ?? undefined,
        };
        updatedCrimes = [...allCrimes, newCrime];
      }

      await AsyncStorage.setItem("crimes", JSON.stringify(updatedCrimes));
      setAllCrimes(updatedCrimes);
      Alert.alert("Success", "Crime saved!");
    } catch (err) {
      console.error("Failed to save crime", err);
      Alert.alert("Error", "Failed to save crime.");
    }
  };

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  }

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios"); // keep open on iOS
    if (selectedDate) setDate(selectedDate);
  };

  // --- Theme styling ---
  const isDark = theme === "black";
  const inputBg = isDark ? "#222" : "#f5f5f5";
  const inputText = isDark ? "#fff" : "#000";
  const borderColor = isDark ? "#555" : "#ccc";
  const cameraIconColor = isDark ? "#000" : "#fff";
  const cameraBg = isDark ? "#fff" : "#cacacaff";
  const headerBg = theme === "white" ? "#E5E5E5" : colors.header;
  const buttonBg = isDark ? "#fff" : colors.header;
  const buttonText = isDark ? "#000" : "#fff";

  return (
    <>
      <Stack.Screen
        options={{
          title: "Crime Intent",
          headerStyle: { backgroundColor: headerBg },
          headerTintColor: colors.text,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.photoRow}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <View
              style={[
                styles.photoPlaceholder,
                { backgroundColor: isDark ? "#444" : "#ddd" },
              ]}
            />
          )}
          <Pressable
            style={[styles.cameraButton, { backgroundColor: cameraBg }]}
            onPress={pickImage}
          >
            <Ionicons name="camera" size={28} color={cameraIconColor} />
          </Pressable>
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Title</Text>
        <TextInput
          style={[styles.input, { borderColor, backgroundColor: inputBg, color: inputText }]}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          placeholderTextColor={isDark ? "#bbb" : "#999"}
        />

        <Text style={[styles.label, { color: colors.text }]}>Details</Text>
        <TextInput
          style={[styles.input, styles.multiline, { borderColor, backgroundColor: inputBg, color: inputText }]}
          value={details}
          onChangeText={setDetails}
          multiline
          returnKeyType="done"
          blurOnSubmit
          placeholder="What happened?"
          placeholderTextColor={isDark ? "#bbb" : "#999"}
        />

        <Pressable
          style={[styles.dateButton, { backgroundColor: buttonBg, borderColor }]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={[styles.dateText, { color: buttonText }]}>{date.toDateString()}</Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <View style={styles.checkboxRow}>
          <Checkbox value={solved} onValueChange={setSolved} color={solved ? colors.header : undefined} />
          <Text style={{ marginLeft: 8, color: colors.text }}>Solved</Text>
        </View>

        <Pressable style={[styles.saveButton, { backgroundColor: buttonBg }]} onPress={saveCrime}>
          <Text style={[styles.saveText, { color: buttonText }]}>SAVE</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  photoRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  photo: { width: 80, height: 80, borderRadius: 8 },
  photoPlaceholder: { width: 80, height: 80, borderRadius: 8 },
  cameraButton: { marginLeft: 12, padding: 12, borderRadius: 8, alignItems: "center" },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  input: { borderWidth: 1, borderRadius: 6, padding: 8, marginBottom: 16 },
  multiline: { height: 80, textAlignVertical: "top" },
  dateButton: { padding: 12, borderRadius: 6, marginBottom: 16, borderWidth: 1 },
  dateText: { textAlign: "center", fontWeight: "bold" },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  saveButton: { padding: 14, borderRadius: 6, alignItems: "center" },
  saveText: { fontWeight: "bold" },
});