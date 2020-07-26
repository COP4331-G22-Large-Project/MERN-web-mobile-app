import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

export function CheckEmail() {
  return (
    <View style={styles.container}>
      <Text>
        Please check your email and click the link to reset your password.
      </Text>
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
