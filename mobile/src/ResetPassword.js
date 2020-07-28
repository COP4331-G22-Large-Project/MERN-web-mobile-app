import * as React from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";

export function RegisterScreen() {
  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");

  const { container, txtInput } = styles;

  const register = (password, passwordCheck) => {
    console.log("You can handle api register here");
    navigation.navigate("SignInScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={container}>
        <Card style={styles.cardStyle}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={txtInput}
            textAlign="center"
          />
          <TextInput
            placeholder="Confirm Password"
            value={passwordCheck}
            onChangeText={setPasswordCheck}
            secureTextEntry
            style={txtInput}
            textAlign="center"
          />
          <View style={styles.buttonView}>
            <Button
              color="black"
              title="Register"
              onPress={() => register({ username, password })}
            />
          </View>
        </Card>
        <View></View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  cardStyle: {
    marginVertical: 80,
    width: 330,
    alignItems: "center",
  },
  txtInput: {
    height: 60,
    width: "95%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 5,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: "8%",
  },
  buttonView: {
    height: 50,
    margin: 5,
    backgroundColor: Colors.primary,
    marginTop: "8%",
    width: "65%",
    borderRadius: 10,
    justifyContent: "center",
  },
});
