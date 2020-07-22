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

const CreateAccount = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.outtermost}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bris-Stool </Text>
          <Text style={styles.headerText}>Your Personal Health Log</Text>
        </View>
        <View style={styles.inputBox}>
          <Text style={{ fontSize: 17, margin: 10 }}>Username: </Text>
          <TextInput style={styles.inputTextBox} placeholder="Enter Username" />
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
        </View>
        <View style={{ width: "50%" }}>
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
    height: "50%",
    justifyContent: "center",
    backgroundColor: "#FCF8D6",
    marginHorizontal: "10%",
    borderColor: "#FCF8D6",
    borderWidth: 1,
    padding: 10,
    width: "80%",
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
  button: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    borderColor: "#84ABB0",
    borderWidth: 1,
    backgroundColor: "#84ABB0",
    marginTop: "5%",
  },
  header: {
    marginVertical: 40,
    marginHorizontal: 0,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: '#84ABB0'
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#84ABB0",
  },
});

export default CreateAccount;
