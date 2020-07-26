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
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { AuthContext } from "./utils";
import Header from "../components/Header";
import Card from "../components/Card";
import Colors from "../constants/colors";

export function SignInScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);
  const { container, txtInput } = styles;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={container}>
        {/* <ImageBackground source = {require('../assets/Background.jpg')} style={container} resizeMode= 'cover'>
         */}
        <View></View>

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
                color="black"
                title="Sign in"
                onPress={() => signIn({ username, password })}
              />
            </View>

            <View style={styles.buttonView}>
              <Button
                color="black"
                title="Register"
                onPress={() => navigation.navigate("Register")}
              />
            </View>
          </View>
          <View style={styles.buttonView}>
            <Button
              color="black"
              title="Forgot Password"
              onPress={() => navigation.navigate("Forgot")}
            />
          </View>
        </Card>

        <View style={styles.footerBox}>
          <View>
            <Text>Created By Group 22.Inc</Text>
          </View>
        </View>
      </ScrollView>
      {/* </ImageBackground>  */}
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  // imageContainer:{
  //   flex: 1,
  //   opacity: .80

  // },
  insideContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "red",
  },
  card: {
    marginVertical: 150,
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
    backgroundColor: Colors.primary,
    marginTop: 10,
    width: "65%",
    borderRadius: 10,
  },
  footerBox: {
    padding: 40,
    width: "100%",
    alignItems: "center",
  
  },
});
