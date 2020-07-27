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
  Keyboard
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Header from "../components/Header";
import Card from "../components/Card";
import { addFood } from "../api/food";
import Colors from "../constants/colors";
import MainButton from '../components/MainButton'
import { AntDesign } from '@expo/vector-icons';

export function Consumables() {
  const { container } = styles;

  const [consumable, set_consumable] = useState("");


  const pressHandler = () => {
    addFood(consumable)
      .then((res) => {})
      .catch((err) => {});
    Alert.alert("Hooray!", "Your Consumable Is Logged", [{ text: "OK" }]);
  };

  return (
    <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss()}}>
    <View style={container}>
      <Header title="Consumables" />
      <View style={styles.container2}>
        <Card style={styles.CardContainer}>
          <View style={styles.textViewContainer}>
            <Text style={styles.textStyling}>
              This is where you can keep track of things you've had to eat or
              drink.
            </Text>

            <View>
              <Text>Enter consumable:</Text>
            </View>

            <TextInput
              style={styles.inputBox}
              placeholder="e.g. Gas station nachos"
              onChangeText={(val) => set_consumable(val)}
            />

            <View style={styles.buttonView}>
            <MainButton onPress={pressHandler}>
                Submit <AntDesign name="checkcircle" size={20} color='white' /> 
                
                </MainButton>
            </View>
          </View>
        </Card>
      </View>
      <View>
        <Text style= {{textAlign: 'left'}}>Hello</Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

// TODO: Finish the logic to log daily logs recent 5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  container2: {
    alignItems: "center",
    paddingVertical: 30,
    width: "90%",
  },
  CardContainer: {
    width: "100%",
  },
  textViewContainer: {
    width: "100%",
    alignItems: "center",
  },
  textStyling: {
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 15,
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
  buttonView: {
    marginTop: 25,
    width: "45%",
    height: 50,
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
});
