import * as React from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";

export function ForgotScreen({ navigation }) {
  const [email, setEmail] = React.useState("");

  const { container, txtInput } = styles;

  const forgot = (email) => {
    console.log("You can handle api for forgot here");
    navigation.navigate("CheckEmail");
  };

  return (
    <View style={container}>
      <Text>Please enter your email:</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={txtInput}
      />
      <Button
        title="Forgot Password"
        onPress={() => navigation.navigate("CheckEmail")}
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
