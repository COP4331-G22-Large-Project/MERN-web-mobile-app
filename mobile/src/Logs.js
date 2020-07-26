import * as React from "react";
//import { Component } from "react";
//import axios from "axios";
import { useState } from "react";
import { Button, Text, View, StyleSheet, SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
//import { Logs } from "expo";

const Log = (props) => (
  <tr>
    <td>{props.log.userId}</td>
    <td>{props.log.amount}</td>
    <td>{props.log.type}</td>
    <td>{props.log.date}</td>
  </tr>
);
export function Logs() {
  const { container } = styles;

  const [consumable, set_consumable] = useState("");
  const [exercise, set_exercise] = useState("");
  const [rating, set_rating] = useState("");

  const logList = () => {
    return this.state.stools.map((currentLog) => {
      return (
        <Log log={currentLog} deleteLog={this.deleteLog} key={currentLog._id} />
      );
    });
  };

  const pressHandler = () => {
    alert("Thank you for submitting!");
    this.logList();
  };

  return (
    <SafeAreaView style={container}>
      <Text>Bris-Tool</Text>
      <Text>Your Personal Health Journal</Text>
      <Text>This is where you can keep track of any exercise or activity.</Text>
      <Text>Search:</Text>
      <Text>Consumable:</Text>
      <TextInput
        style={styles.input}
        placeholder="Salad"
        onChangeText={(val) => set_consumable(val)}
      />
      <Text>Exercise:</Text>
      <TextInput
        style={styles.input}
        placeholder="Walking"
        onChangeText={(val) => set_exercise(val)}
      />
      <Text>Bristol Rating:</Text>
      <TextInput
        style={styles.input}
        placeholder="4"
        onChangeText={(val) => set_rating(val)}
      />
      <Button title="Search" onPress={pressHandler} />
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
