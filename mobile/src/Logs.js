import * as React from "react";
//import { Component } from "react";
//import axios from "axios";
import { useState, useEffect} from "react";
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
import { getAllStools } from "../api/stool";
import Card from "../components/Card";
import Header from "../components/Header";

export function Logs() {
  const { container } = styles;

  const [consumable, set_consumable] = useState("");
  const [exercise, set_exercise] = useState("");
  const [rating, set_rating] = useState("");
  const [stools, setStools] = useState([]);

  useEffect(()=> {
    const bootstrapAsync = () => {
      getAllStools().then((res) => {
        this.setState({stools: res.data})
      })
     .catch((err) => { console.log(err)});
    }
     bootstrapAsync();

  }, []);


  const renderItem =(data)=> {
    return(
      <View>
        <Text>{data.item.name}</Text>
      </View>
    )

  }
  const pressHandler = () => {
    alert("Thank you for submitting!");
    // this.logList();
  };

  return (
    <ScrollView contentContainerStyle={container}>
      <Header title="Your Personal Logs" />
      <Card style={styles.CardContainer}>
        <Text>Filter based on rating</Text>
        <Text>Bristol Rating:</Text>
        <TextInput
          style={styles.input}
          placeholder="4"
          onChangeText={(val) => set_rating(val)}
        />
        <Button title="Search" onPress={pressHandler} />
      </Card>

      <Card style={styles.CardContainer}>
        <FlatList
        style= {styles.flatListView}
        data={stools}
        renderItem = {renderItem}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  CardContainer: {
    alignItems: "center",
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
  flatListView:{
    width: '100%',
    height: 40
  }
});
