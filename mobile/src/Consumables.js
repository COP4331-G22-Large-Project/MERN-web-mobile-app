import * as React from "react";
import { useState } from "react";
import { Button, Text, View, StyleSheet, SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Header from "../components/Header";
import Card from "../components/Card";

export function Consumables() {
  const { container } = styles;

  const [consumable, set_consumable] = useState("");

  const pressHandler = () => {
    addFood(consumable)
      .then((res) => {})
      .catch((err) => {});
    alert("Thank you for logging a consumable!");
  };

  return (
    <View style={container}>
      <Header title="Consumables" />
      <View style={styles.container2}>
        <Card style={styles.CardContainer}>
          <View>
            <View>
              <Text>
                This is where you can keep track of things you've had to eat or
                drink.
              </Text>
            </View>
            <View>
              <Text>Enter a consumable:</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="e.g. Gas station nachos"
            onChangeText={(val) => set_consumable(val)}
          />
        </Card>
        <Button title="Submit" onPress={pressHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    margin: 10,
    width: 200,
  },
  container2: {
    alignItems: "center",
    paddingVertical: 30,
  },
  CardContainer: {
    paddingVertical: 30,
    width: "95%",
  },
});
