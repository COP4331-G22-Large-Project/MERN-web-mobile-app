import React, { useState } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { color } from "react-native-reanimated";
import Login from "./screens/Login";
import CreateAccount from "./screens/CreateAccount";
// const instructions = Platform.select({
//   ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
//   android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
// });

export default function App() {
  const [isAddMode, setAddMode] = useState(false);
  const [createAccountModal, setCreateAccountModal] = useState(false);

  const openLoginBox = () => {
    console.log("Login initiated");
  };
  const modalClose = () => {
    setAddMode(false);
  };
  const createAccountModalClose = () => {
    setCreateAccountModal(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bris-Stool </Text>
          <Text style={styles.headerText}>Your Personal Health Log</Text>
        </View>
        <View style={styles.loginBox}>
          <View style={styles.button}>
            <Button
              color="white"
              title="Login"
              onPress={() => setAddMode(true)}
            />
            <Login
              visible={isAddMode}
              onLogin={openLoginBox}
              onClose={modalClose}
            />
          </View>
          <View style={styles.button}>
            <Button
              color="white"
              title="Create Account"
              onPress={() => setCreateAccountModal(true)}
            />
            <CreateAccount
              visible={createAccountModal}
              onClose={createAccountModalClose}
            />
          </View>
          <View style={styles.button}>
            <Button color="white" title="Forgot Password" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex:1,
    backgroundColor: '#FDF8DB'
  },
  mainContainer: {
    margin: 40,
    flex: 1,
    backgroundColor: "#FDF8DB",
  },
  header: {
    alignItems: "center",
    padding: 2,
    borderBottomWidth: 1,
    borderColor: '#84ABB0'
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#84ABB0",
  },
  loginBox: {
    flex: 0.65,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  button: {
    width: "100%",
    height: "12%",
    justifyContent: "center",
    borderColor: "#84ABB0",
    borderWidth: 1,
    backgroundColor: "#84ABB0",
    marginVertical: "5%",
    padding: 2,
  },
});
