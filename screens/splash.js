import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Modal } from "react-native";
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
    // <Modal visible={false}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerText}>
            <Text style={{ fontSize: 25 }}>Bris-Tool</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={{ fontSize: 25 }}>Your Personal Health Journal</Text>
          </View>
        </View>
        <View style={styles.loginBox}>
          <Button title="Login here" onPress={pressHandler1} />

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
    // </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    //justifyContent: "center",
  },
  loginBox: {
    justifyContent: 'center',
    width: "80%",
    marginTop: "45%",
    padding: 8,
  },
  headerContainer: {
    marginTop: 20,
  },
  headerText: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  loginBoxButtons: {
    marginVertical: 10,
    backgroundColor: "red",
    justifyContent: "space-between",
    opacity: 10,
  },
});
