import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  Image, 
  Alert 
} from "react-native";
import Checkbox from "expo-checkbox";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useCrimes } from "../../context/CrimeContext";

interface Crime {
  id: string;
  title: string;
  details: string;
  date: string;
  solved: boolean;
  photoUri?: string;
}

export default function CrimeDetail() {
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const {addCrime} = useCrimes();

    // State for crime fields
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [date, setDate] = useState(new Date().toDateString());
    const [solved, setSolved] = useState(false);
    const [photoUri, setPhotoUri] = useState<string | null>(null);

    // Pick an image from gallery
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
        }
    };

    const saveCrime = () => {
      const newCrime = {
        id: Date.now().toString(),
        title,
        details,
        date,
        solved,
        photoUri: photoUri ?? undefined,
      };

    // Save crime
    addCrime(newCrime);
    router.back();
  };


    return (
        <>
        <Stack.Screen options={{ title: "Crime Intent" }} />
    
        <View style={styles.container}>
        {/* Photo + Pick button */}
        <View style={styles.photoRow}>
            {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
            ) : (
            <View style={styles.photoPlaceholder} />
            )}
            <Pressable style={styles.cameraButton} onPress={pickImage}>
              <Ionicons name="camera" size={28} color="black" />
            </Pressable>
        </View>

        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
        />

        {/* Details */}
        <Text style={styles.label}>Details</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={details}
          onChangeText={setDetails}
          placeholder="What happened?"
          multiline
          returnKeyType="done"
          blurOnSubmit={true}
        />


        {/* Date */}
        <Pressable style={styles.dateButton}>
            <Text style={styles.dateText}>{date}</Text>
        </Pressable>

        {/* Solved checkbox */}
        <View style={styles.checkboxRow}>
            <Checkbox value={solved} onValueChange={setSolved} />
            <Text style={{ marginLeft: 8 }}>Solved</Text>
        </View>

        {/* Save button */}
        <Pressable style={styles.saveButton} onPress={saveCrime}>
            <Text style={styles.saveText}>SAVE</Text>
        </Pressable>
        </View>
    </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16, 
    backgroundColor: "#fff" },
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16 },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#eee" },
  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8, 
    backgroundColor: "#ddd" },
  cameraButton: {
    marginLeft: 12, 
    padding: 12, 
    backgroundColor: "#eee", 
    borderRadius: 8 },
  cameraText: { fontSize: 20 },
  label: {
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 4 },
  input: {
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 6, 
    padding: 8, 
    marginBottom: 16 },
  multiline: { height: 80, textAlignVertical: "top" },
  dateButton: {
    backgroundColor: "#6A0DAD", 
    padding: 12, 
    borderRadius: 6, 
    marginBottom: 16 },
  dateText: {
    color: "#fff", 
    textAlign: "center", 
    fontWeight: "bold" },
  checkboxRow: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 16 },
  saveButton: {
    backgroundColor: "#6A0DAD",
    padding: 14, 
    borderRadius: 6,
    alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "bold" },
});