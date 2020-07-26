import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from '../constants/colors'

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
      <Text style={styles.headerTitle}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingTop: 50
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default Header;
