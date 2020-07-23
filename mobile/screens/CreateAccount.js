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
const CreateAccount = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <Header title="Bris-Tool" name="Your Personal Health Log" />
        <View style={styles.outtermost}>
          <View style={styles.inputBox}>
            <Text style={{ fontSize: 17, margin: 10 }}>Username: </Text>
            <TextInput
              style={styles.inputTextBox}
              placeholder="Enter Username"
            />
            <Text style={{ fontSize: 17, margin: 10 }}>Email: </Text>
            <TextInput style={styles.inputTextBox} placeholder="Enter Email" />
            <Text style={{ fontSize: 17, margin: 10 }}>Password: </Text>
            <TextInput
              secureTextEntry={true}
              style={styles.inputTextBox}
              placeholder="Enter Password"
            />
            <Text style={{ fontSize: 17, margin: 10 }}>Confirm Password: </Text>
            <TextInput
              secureTextEntry={true}
              style={styles.inputTextBox}
              placeholder="Confirm Password"
            />

            <View style={styles.buttonView}>
              <View style={styles.button}>
                <Button
                  color="white"
                  title="Create Account"
                  onPress={props.onLogin}
                />
              </View>
              <View style={styles.button}>
                <Button
                  color="white"
                  title="Back To Home"
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF8D6",
  },
  inputBox: {
    width: "80%",
    backgroundColor: "white",
    marginHorizontal: "10%",
    borderColor: "#FCF8D6",
    borderWidth: 1,
    padding: 10,
    paddingBottom: 10,
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
    marginBottom: 10,
    backgroundColor: "white",
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  button: {
    width: "80%",
    height: 40,
    borderColor: "#84ABB0",
    borderWidth: 1,
    backgroundColor: "#84ABB0",
    marginTop: "10%",
    borderRadius: 10,
  },
});

export default CreateAccount;
