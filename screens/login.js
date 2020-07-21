import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Navigator from "../routes/homestack";

export default function App({ navigation }) {
  const [userName, set_userName] = useState("");
  const [password, set_password] = useState("");

  const pressHandler = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={StyleSheet.container}>
      <Text>Bris-Tool</Text>
      <Text>Your Personal Health Journal</Text>

      <Text>Welcome! Please Login below...</Text>
      <Text>Username: </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. jDoe"
        onChangeText={(val) => set_userName(val)}
      />

      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. password"
        onChangeText={(val) => set_password(val)}
      />

      <Text>Below just shows that we are storing user input.</Text>
      <Text>
        This will turn into an if/then that will make a database request and
        either allow or deny access.
      </Text>
      <Text>Stored Username: {userName}</Text>
      <Text>Stored Password: {password}</Text>
      <Button title="Login" onPress={pressHandler} />
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
