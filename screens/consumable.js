import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [consumable, set_consumable] = useState("");

  const pressHandler = () => {
    alert("Thank you for submitting!");
  };

  return (
    <View style={StyleSheet.container}>
      <Text>Bris-Tool</Text>
      <Text>Your Personal Health Journal</Text>

      <Text>
        This is where you can keep track of things you've had to eat or drink.
      </Text>
      <Text>Enter a consumable: </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Gas station nachos"
        onChangeText={(val) => set_consumable(val)}
      />

      <Text>Stored consumable: {consumable}</Text>
      <Button title="Submit" onPress={pressHandler} />
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
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    margin: 10,
    width: 200,
  },
});
