import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [userName, set_userName] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [password_check, set_check] = useState("");

  return (
    <View style={StyleSheet.container}>
      <Text>Bris-Tool</Text>
      <Text>Your Personal Health Journal</Text>

      <Text>Create your account below...</Text>
      <Text>Username: </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. jDoe"
        onChangeText={(val) => set_userName(val)}
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. jDoe@hotmail.com"
        onChangeText={(val) => set_email(val)}
      />

      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. not1234!"
        onChangeText={(val) => set_password(val)}
      />

      <Text>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. not1234!"
        onChangeText={(val) => set_check(val)}
      />

      <Text>Stored Username: {userName}</Text>
      <Text>Stored Email: {email} </Text>
      <Text>Stored Password: {password}</Text>
      <Text>Password Check: {password_check}</Text>
      <Text>Sign In</Text>
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
