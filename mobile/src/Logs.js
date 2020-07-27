import * as React from "react";
//import { Component } from "react";
//import axios from "axios";
import { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
// import { getAllStools} from "../api/stools";
import Card from "../components/Card";
import Header from '../components/Header'
//import { Logs } from "expo";

// ------ API STUFF -------
// const Log = (props) => (
//   <tr>
//     <td>{props.log.userId}</td>
//     <td>{props.log.amount}</td>
//     <td>{props.log.type}</td>
//     <td>{props.log.date}</td>
//   </tr>
// );
export function Logs() {
  const { container } = styles;

  const [consumable, set_consumable] = useState("");
  const [exercise, set_exercise] = useState("");
  const [rating, set_rating] = useState("");

  // ------ API STUFF -------
  // const logList = () => {
  // return this.state.stools.map((currentLog) => {
  //   return (
  //     <Log log={currentLog} deleteLog={this.deleteLog} key={currentLog._id} />
  //     );
  //   });
  // };

  const pressHandler = () => {
    alert("Thank you for submitting!");
    // this.logList();
  };

  // React.useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = () => {
  //     getAllStools()
  //       .then((res) => {
  //         console.log('restore success');
  //         console.log(res.headers);
  //         dispatch({ type: "RESTORE_TOKEN", user: res.data });
  //       })
  //       .catch((err) => {
  //         console.log('restore fail');
  //         console.log(err.response.headers);
  //         dispatch({ type: "RESTORE_TOKEN" });
  //       })
  //   };

    const stoolDisplay = () => {
      return this.getAllStools.map ((currentLog) => {
        return (
          <Log log = {currentLog} key = {currentLog._id} />
        );
      });
    };

  return (
    <ScrollView contentContainerStyle={container}>
      <Header title= 'Your Personal Logs'/>
      <Card style = {styles.CardContainer}>
        <Text>Filter based on rating</Text>
        <Text>Bristol Rating:</Text>
        <TextInput
          style={styles.input}
          placeholder="4"
          onChangeText={(val) => set_rating(val)}
        />
        <Button title="Search" onPress={pressHandler} />
      </Card>

      <Card>
   
      </Card>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  
  },
  CardContainer:{
    alignItems: 'center',
    width: 330,
    marginVertical: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    margin: 10,
    width: 200,
  },
});
