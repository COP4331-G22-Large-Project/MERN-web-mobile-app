import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Button } from "react-native";
import Colors from "../constants/colors";

const MainButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {

    color: "white",
    fontSize: 18,
  },
});

export default MainButton;
