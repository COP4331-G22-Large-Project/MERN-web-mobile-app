import * as React from "react";
import { useState } from "react";
import { Button, Text, View, StyleSheet, SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export function Stool() {
  const { container } = styles;

  const [rating, set_rating] = useState("");
  const [amount, set_amount] = useState("");

  const pressHandler = () => {
    addStool(rating, amount)
      .then((res) => {})
      .catch((err) => {});
    alert("Thank you for logging a stool!");
  };

  return (
    <SafeAreaView style={container}>
      <Text>Bris-Tool</Text>
      <Text>Your Personal Health Journal</Text>
      <Text>
        This is where you can keep track of bowel movement you have based on the
        Bristol Stool chart.
      </Text>
      <Text>Enter Stool Rating:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 5"
        onChangeText={(val) => set_rating(val)}
      />
      <Text>Enter an amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. A ton"
        onChangeText={(val) => set_amount(val)}
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
