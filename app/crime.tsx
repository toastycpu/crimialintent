import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Pressable,
  Switch,
} from "react-native";
import { useState } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function CrimeDetail() {
  const router = useRouter();
  const createdAt = new Date().toLocaleDateString();
  const [isSolved, setIsSolved] = useState(false);
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [solved, setSolved] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Criminal Intent",
          headerStyle: { backgroundColor: "#6A0DAD" },
          headerTintColor: "#fff",
        }}
      />

      <View style={styles.container}>
        {/* Image Picker */}
        <View style={styles.imageRow}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder} />
          )}
          <Pressable style={styles.iconBtn} onPress={pickImage}>
            <Ionicons name="camera" size={28} />
          </Pressable>
        </View>

        {/* Title */}
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        {/* Details */}
        <Text style={styles.label}>Details</Text>
        <TextInput
          placeholder="What happened?"
          style={[styles.input, { height: 100 }]}
          multiline
          value={details}
          onChangeText={setDetails}
        />

        {/* Solved Checkbox */}
        <View>
          <Text>Solved?</Text>
          <Switch value={isSolved} onValueChange={setIsSolved} />
        </View>

        {/* Save */}
        <Button title="SAVE" color="#6A0DAD" onPress={() => router.push("/")} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff" },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16 },
  placeholder: {
    width: 100,
    height: 100,
    backgroundColor: "#eee" },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6 },
  iconBtn: {
    marginLeft: 12,
    padding: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginVertical: 8,
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4 },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12 },
});
