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
import { getAllStools } from "../api/stool";
import Card from "../components/Card";
import Header from "../components/Header";

export function Logs() {
  const { container } = styles;

  const [consumable, set_consumable] = useState("");
  const [exercise, set_exercise] = useState("");
  const [rating, set_rating] = useState("");
  const [stools, setStools] = useState([]);

  const Log = (props) => (
    <View>
      <Text>{props.log.type}</Text>
      <Text>{props.log.amount}</Text>
      <Text>{props.log.foods.map((foods) => foods.name).join(", ")}</Text>
      <Text>
        {props.log.exercises.map((exercises) => exercises.name).join(", ")}
      </Text>
    </View>
  );

  //----------- Some coded that I (Raj) add -------------  -------------

  useEffect(() => {
    const bootstrapAsync = () => {
      getAllStools()
        .then((res) => {
          setStools(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    bootstrapAsync();
  }, []);

  //   const refresh = (data) => {
  //     return (
  //       <View>
  //         <Text>Rating: {data.item.type}</Text>
  //         <Text>Amount: {data.item.amount}</Text>
  //         <Text>
  //           Food:
  //           {data.item.foods &&
  //             data.item.foods.map((foods) => {
  //               return <Text> {foods.name} </Text>;
  //             })}
  //         </Text>
  //         <Text>
  //           Exercises:
  //           {data.item.exercises &&
  //             data.item.exercises.map((exercises) => {
  //               return (
  //                 <Text>
  //                   ({exercises.name}, {exercises.duration} min)
  //                 </Text>
  //               );
  //             })}
  //           ;
  //         </Text>
  //       </View>
  //     );
  //   };

  const renderItem = (data) => {
    return setStools(data).map((log) => (
      <Log log={log} deleteLog={this.deleteLog} key={log._id} />

      // {data.item.map(log => (
      //<Log data={data} key={data._id} />
      //   ))}
      //return refresh(data);
    ));
  };

  //-----------  -------------  -------------  -------------  -------------

  const pressHandler = () => {
    alert("Thank you for submitting!");
    // this.logList();
  };

  return (
    <ScrollView contentContainerStyle={container}>
      <Header title="Your Personal Logs" />
      {/* <Card style={styles.CardContainer}>
        <Text>Filter based on rating</Text>
        <Text>Bristol Rating:</Text>
        <TextInput
          style={styles.input}
          placeholder="4"
          onChangeText={(val) => set_rating(val)}
        />
        <Button title="Search" onPress={pressHandler} />
      </Card> */}

      <Card style={styles.CardContainer}>
        <FlatList
          style={styles.flatListView}
          data={stools}
          renderItem={renderItem}
          keyExtractor={(item) => item.userId}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  CardContainer: {
    alignItems: "center",
    width: 330,
    marginVertical: 30,
    height: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    margin: 10,
    width: 200,
  },
  flatListView: {
    width: "100%",
    height: 40,
  },
});
