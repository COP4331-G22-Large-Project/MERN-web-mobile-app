import * as React from "react";
import { Button, Text, View, SafeAreaView, StyleSheet } from "react-native";
import { AuthContext } from "./utils";

export function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);
  const { container } = styles;

  return (
    <SafeAreaView style={container}>
      <Text>Bris-Tool</Text>
      <Text>Your Personal Health Journal</Text>
      <Button title="Sign out" onPress={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
