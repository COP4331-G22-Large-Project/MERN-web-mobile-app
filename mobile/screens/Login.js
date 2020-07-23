import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TextInput,
} from "react-native";
import Header from "../components/Header";

const Login = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <Header title="Bris-Tool" name= 'Your Personal Health Log' />
      <View style={styles.outtermost}>
        <View style={styles.inputBox}>
          <Text style={{ fontSize: 17, margin: 10 }}>Username: </Text>
          <TextInput
            style={styles.inputTextBox}
            placeholder="Enter Your Username..."
          />
          <Text style={{ fontSize: 17, margin: 10 }}>Password: </Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputTextBox}
            placeholder="Enter Your Password..."
          />

          <View style={styles.buttonView}>
            <View style={styles.button}>
              <Button color="white" title="Login" onPress={props.onLogin} />
            </View>
            <View style={styles.button}>
              <Button
                color="black"
                title="Back to Home"
                onPress={props.onClose}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  outtermost: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FCF8D6",
    justifyContent: "center",
  },
  inputBox: {
    height: "50%",
    width: "80%",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    borderColor: "#FCF8D6",
    borderWidth: 1,
    padding: 10,
    marginHorizontal: "10%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.26,
    borderRadius: 20,
  },
  inputTextBox: {
    width: "100%",
    height: 50,
    borderColor: "#FCF8D6",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  buttonView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    height: 40,
    borderColor: "#84ABB0",
    borderWidth: 1,
    backgroundColor: "#84ABB0",
    marginTop: "10%",
    borderRadius: 10
  },
});

export default Login;
