import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Navigator from "../routes/homestack";

export default function Splash({ navigation }) {
  const pressHandler1 = () => {
    navigation.navigate("Login");
  };

  const pressHandler2 = () => {
    navigation.navigate("Create");
  };

  const pressHandler3 = () => {
    navigation.navigate("Forgot");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Bris-Tool</Text>
        <Text style={styles.headerText}>Your Personal Health Journal</Text>
      </View>
      <View style={styles.loginBox}>
        <Button  title="Login here" onPress={pressHandler1} />

        <Button
          title="New user? Create an account here!"
          onPress={pressHandler2}
        />

        <Button
          title="Forgot Password"
          onPress={() => navigation.push("Forgot")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  loginBox: {
    justifyContent: "center",
    width: '80%',
    marginTop: "45%",
    padding: 8, 
  },
  headerContainer: {
    marginTop: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 25
  },
  loginBoxButtons: {
    marginVertical: 10,
    backgroundColor: 'red',
    justifyContent: 'space-between',
    opacity: 10
  
  }
});
