import React from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { AuthContext } from "./utils";
import Header from "../components/Header";
import Card from "../components/Card";

export function SignInScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);
  const { container, txtInput } = styles;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <View>
          <Header title="Your Personal Health Log" name="Welcome!" />
        </View>
        <View style={styles.insideContainer}>
          <Card style={styles.card}>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={txtInput}
              textAlign="center"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={txtInput}
              textAlign="center"
            />
            <View style={styles.twoButton}>
              <View style={styles.buttonView}>
                <Button
                  color="white"
                  title="Sign in"
                  onPress={() => signIn({ username, password })}
                />
              </View>

              <View style={styles.buttonView}>
                <Button
                  color="white"
                  title="Register"
                  onPress={() => navigation.navigate("Register")}
                />
              </View>
            </View>
            <View style={styles.buttonView}>
              <Button
                color="white"
                title="Forgot Password"
                onPress={() => navigation.navigate("Forgot")}
              />
            </View>
          </Card>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  insideContainer: {
    flex: 0.75,
    justifyContent: "center",
  },
  card: {
    width: 330,
    // maxWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
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
  twoButton: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
    margin: 2,
    alignItems: "center",
  },
  buttonView: {
    margin: 5,
    backgroundColor: "teal",
    marginTop: 10,
    width: "65%",
    borderRadius: 10,
  },
});
