import * as React from "react";
import { Button, TextInput, View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import Header from "../components/Header";
import Card from "../components/Card";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";
import { AntDesign } from "@expo/vector-icons";

export function ForgotScreen({ navigation }) {
  const [email, setEmail] = React.useState("");

  const { container, txtInput } = styles;

  const forgot = (email) => {
    console.log("You can handle api for forgot here");
    navigation.navigate("CheckEmail");
  };

  return (
    <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss()}}>
    <View style={container}>
      <View style={styles.innerContainer}>
        <Card style={styles.CardContainer}>
          <Text style = {{fontSize: 18, fontWeight: 'bold'}}>Please enter your email:</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.inputBox}
          />
          <View style={styles.buttonView}>
            <MainButton onPress={() => navigation.navigate("CheckEmail")}>
              Submit
            </MainButton>
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
  inputBox: {
    textAlign: "center",
    height: 50,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  innerContainer: {
    marginTop: 200,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  CardContainer: {
    paddingVertical: 30,
    width: "88%",
    alignItems: "center",
  },
  buttonView: {
    marginTop: 25,
    width: "45%",
    height: 50,
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
});
