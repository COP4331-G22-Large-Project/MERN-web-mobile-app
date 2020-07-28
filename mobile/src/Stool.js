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
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { addStool } from "../api/stool";
import Colors from "../constants/colors";
import Header from "../components/Header";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export function Stool() {
  const { container } = styles;

  const [rating, set_rating] = useState("");
  const [amount, set_amount] = useState("");

  const pressHandler = () => {
    addStool(rating, amount)
      .then((res) => {})
      .catch((err) => {});
    alert("Thank you for logging a stool!");
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={container}
      scrollEnabled={false}
    >
      <Header title="Log Your Stool" />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <Card style={styles.CardContainer}>
            <Text style={styles.textStyling}>
              This is where you can keep track of bowel movement you have based
              on the Bristol Stool chart.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/StoolChart.png")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.inputTitle}>
              <Text>Enter Stool Rating:</Text>
            </View>
            <TextInput
              style={styles.inputBox}
              placeholder="e.g. 5"
              onChangeText={(val) => set_rating(val)}
            />
            <View style={styles.inputTitle}>
              <Text>Enter an amount:</Text>
            </View>
            <TextInput
              style={styles.inputBox}
              placeholder="e.g. A ton"
              onChangeText={(val) => set_amount(val)}
            />
            <View style={styles.buttonView}>
              <MainButton onPress={pressHandler}>
                Submit <AntDesign name="checkcircle" size={20} color="white" />
              </MainButton>
            </View>
          </Card>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
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
    width: "95%",
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
    justifyContent: "space-evenly",
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  imageContainer: {
    height: 400,
    width: 280,
    justifyContent: "center",
    marginVertical: 20,
  },
  image: {
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
