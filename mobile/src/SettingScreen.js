import * as React from "react";
import { Button, Text, View, StyleSheet, SafeAreaView } from "react-native";

export function SettingScreen() {
  const { container } = styles;
  return (
    <SafeAreaView style={container}>
      <Text>Setting Screen!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
