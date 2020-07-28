import * as React from "react";
import { useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { addExercise } from "../api/exercise";
import Colors from "../constants/colors";
import Header from "../components/Header";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { AntDesign } from "@expo/vector-icons";

export function Exercise() {
  const { container } = styles;

  const [exercise, set_exercise] = useState("");
  const [duration, set_duration] = useState("");

  const pressHandler = () => {
    addExercise(exercise, duration)
      .then((res) => {})
      .catch((err) => {});
    Alert.alert("Hooray!", "Your Exercise is Logged", [{ text: "OK" }]);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={container}>
        <Header title="Exercise" />
        <Card style={styles.CardContainer}>
          <Text style={styles.textStyling}>
            This is where you can keep track of any exercise or activity.
          </Text>
          <View style={styles.inputTitle}>
            <Text>Enter exercise/movement:</Text>
          </View>
          <TextInput
            style={styles.inputBox}
            placeholder="e.g. 30 flights of stairs"
            onChangeText={(val) => set_exercise(val)}
          />
          <View style={styles.inputTitle}>
            <Text>Enter a duration in minutes:</Text>
          </View>
          <TextInput
            style={styles.inputBox}
            placeholder="e.g. 20"
            onChangeText={(val) => set_duration(val)}
          />
          <View style={styles.buttonView}>
            <MainButton onPress={pressHandler}>
              Submit <AntDesign name="checkcircle" size={20} color="white" />
            </MainButton>
          </View>
        </Card>
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
  },
  CardContainer: {
    width: "90%",
    margin: 10,
    marginTop: 30,
    alignItems: "center",
  },
  textStyling: {
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 15,
  },
  inputTitle: {
    marginVertical: 10,
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
