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

const Login = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.outtermost}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bris-Stool </Text>
          <Text style={styles.headerText}>Your Personal Health Log</Text>
        </View>
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

          <View style={styles.button}>
            <Button color="white" title="Login" onPress={props.onLogin} />
          </View>
          <View style={styles.button}>
            <Button
              color="white"
              title="Back to Home"
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
    backgroundColor: "#FDF8DB",
  },
  inputBox: {
    width: "80%",
    height: "50%",
    justifyContent: "center",
    backgroundColor: "#FDF8DB",
    marginHorizontal: "10%",
    borderColor: "#FDF8DB",
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  inputTextBox: {
    width: "100%",
    height: 50,
    borderColor: "#FDF8DB",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    height: "13%",
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

export default Login;
