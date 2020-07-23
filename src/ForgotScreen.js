import * as React from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";

export function ForgotScreen() {
  const [email, setEmail] = React.useState("");

  const { container, txtInput } = styles;

  const forgot = (email) => {
    console.log("You can handle api for forgot here");
  };

  return (
    <View style={container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={txtInput}
      />
      <Button title="Forgot Password" onPress={() => forgot({ email })} />
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
