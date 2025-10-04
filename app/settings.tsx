import { View, Text, Switch, StyleSheet } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";

export default function SettingsScreen() {

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerStyle: { backgroundColor: "#6A0DAD" },
          headerTintColor: "#fff",
        }}
      />
    </>
  );
}

