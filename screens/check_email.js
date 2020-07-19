import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  return (
    <View style={StyleSheet.container}>
      <Text>Bris-Tool</Text>
      <Text>Your Personal Health Journal</Text>
      <Text>Please check your email. </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
