import * as React from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";

export function RegisterScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { container, txtInput } = styles;

  const register = (username, password) => {
    console.log("You can handle api register here");
  };

  return (
    <View style={container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={txtInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={txtInput}
      />
      <Button
        title="Register"
        onPress={() => register({ username, password })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txtInput: {
    height: 50,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 5,
  },
});
