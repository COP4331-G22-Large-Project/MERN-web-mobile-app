import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Navigator from "../routes/homestack";

export default function Splash({ navigation }) {
  const pressHandler1 = () => {
    navigation.navigate("Login");
  };

  const pressHandler2 = () => {
    navigation.navigate("Create");
  };

  const pressHandler3 = () => {
    navigation.navigate("Forgot");
  };

  return (
    <View style={StyleSheet.container}>
      <Text>Bris-Tool</Text>
      <Text>Your Personal Health Journal</Text>

      <Button title="Login Here" onPress={pressHandler1} />

      <Button
        title="New user? Create an account here!"
        onPress={pressHandler2}
      />

      <Button title="Forgot Password" onPress={pressHandler3} />
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
