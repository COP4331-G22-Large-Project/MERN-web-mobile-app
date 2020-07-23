import * as React from "react";
import { useState } from "react";
import { Button, Text, View, StyleSheet, SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export function Consumables() {
  const { container } = styles;

  const [consumable, set_consumable] = useState("");

  const pressHandler = () => {
    alert("Thank you for submitting!");
  };

  return (
    <SafeAreaView style={container}>
      <Text>Bris-Tool</Text>
      <Text>Your Personal Health Journal</Text>
      <Text>
        This is where you can keep track of things you've had to eat or drink.
      </Text>
      <Text>Enter a consumable:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Gas station nachos"
        onChangeText={(val) => set_consumable(val)}
      />
      <Button title="Submit" onPress={pressHandler} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
