import React, { useState } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { color } from "react-native-reanimated";
import Login from "./screens/Login";
import CreateAccount from "./screens/CreateAccount";
import Header from "./components/Header";
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
      <Header title="Bris-Tool" name="Your Personal Health Log" />

      <View style={styles.mainContainer}>
        <View style={styles.loginBox}>
          <View style = {{alignItems:'center'}}>
            <View style={styles.button}>
              <Button
                color="#F07B7A"
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
                color="#F07B7A"
                title="Create Account"
                onPress={() => setCreateAccountModal(true)}
              />
              <CreateAccount
                visible={createAccountModal}
                onClose={createAccountModalClose}
              />
            </View>
            <View style={styles.button}>
              <Button color="#F07B7A" title="Forgot Password" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  mainContainer: {
    margin: 40,
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  loginBox: {
    height: "50%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#F07B7A",
    marginTop: 120,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.26,
    borderRadius: 20,
    opacity:0.8
  },
  button: {
    width: "80%",
    height: 50,
    borderColor: "#F07B7A",
    borderWidth: 1,
    backgroundColor: "white",
    marginVertical: "5%",
    padding: 2,
    borderRadius: 10,
  },
});
