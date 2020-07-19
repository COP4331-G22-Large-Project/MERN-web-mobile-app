import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Navigator from "../routes/homestack";

export default function forgot({ navigation }) {
  const [email, set_email] = useState("");

  const pressHandler = () => {
    navigation.navigate("CheckEmail");
  };

  return (
    <View style={StyleSheet.container}>
      <Text>Bris-Tool</Text>
      <Text>Your Personal Health Journal</Text>
      <Text>Forgot your password?</Text>
      <Text>Please enter your email: </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. jDoe@hotmail.comm"
        onChangeText={(val) => set_email(val)}
      />
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
