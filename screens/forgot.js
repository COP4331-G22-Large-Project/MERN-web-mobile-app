import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App({ navigation }) {
  const [email, set_email] = useState("");

  const pressHandler4 = () => {
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
      // if email is good, send to check your email page.
      <Button title="Submit" onPress={pressHandler4} />
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
    boraderWidth: 1,
    borderColor: "black",
    padding: 8,
    margin: 10,
    width: 200,
  },
});
