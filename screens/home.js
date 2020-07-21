import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Navigator from "../routes/homestack";

export default function Splash({ navigation }) {
  const pressHandler1 = () => {
    navigation.navigate("Consumable");
  };

  const pressHandler2 = () => {
    navigation.navigate("Exercise");
  };

  const pressHandler3 = () => {
    navigation.navigate("Stool");
  };

  const pressHandler4 = () => {
    navigation.navigate("Logs");
  };

  return (
    <View style={StyleSheet.container}>
      <Text>Bris-Tool</Text>
      <Text>Your Personal Health Journal</Text>

      <Button title="Consumable" onPress={pressHandler1} />

      <Button title="Exercise" onPress={pressHandler2} />

      <Button title="Bris-tool Stool" onPress={pressHandler3} />

      <Button title="View Logs" onPress={pressHandler4} />
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
