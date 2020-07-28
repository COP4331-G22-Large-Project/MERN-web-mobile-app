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
  RefreshControl,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getAllStools } from "../api/stool";
import Card from "../components/Card";
import Header from "../components/Header";
import Colors from "../constants/colors";
import { set } from "react-native-reanimated";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export function Logs() {
  const { container } = styles;

  const [stools, setStools] = useState([]);

  // const Log = (props) => (
  //   <View>
  //     <Text>{props.log.type}</Text>
  //     <Text>{props.log.amount}</Text>
  //     <Text>{props.log.foods.map((foods) => foods.name).join(", ")}</Text>
  //     <Text>
  //       {props.log.exercises.map((exercises) => exercises.name).join(", ")}
  //     </Text>
  //   </View>
  // );

  //----------- Some coded that I (Raj) add -------------  -------------
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
      getAllStools()
        .then((res) => {
          setStools(res.data);
          // setRefreshing(false);
        })
        .catch((err) => {
          console.log(err);
        });
    // console.log('page refreshed')
    wait(800).then(() => setRefreshing(false));
    
  }, [refreshing]);

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

  const renderItem = (data) => {
    return (
      <Card style={styles.innerCardContainer}>
        <View style={styles.logView}>
          <Text style={styles.logText}>Rating: </Text>
          <Text style={styles.logText}>{data.item.type}</Text>
        </View>
        <View style={styles.logBodyView}>
          <Text style={styles.subHeadingText}>Amount: </Text>
          <Text>{data.item.amount}</Text>
        </View>
        <View style={styles.logBodyView}>
          <Text>
            <Text style={styles.subHeadingText}>Food: </Text>
            {data.item.foods &&
              data.item.foods.map((foods) => {
                return <Text> ({foods.name}) </Text>;
              })}
            ;
          </Text>
        </View>
        <View style={styles.logBodyView}>
          <Text>
            <Text style={styles.subHeadingText}>Exercises: </Text>
            {data.item.exercises &&
              data.item.exercises.map((exercises) => {
                return (
                  <Text>
                    ({exercises.name}, {exercises.duration} min)
                  </Text>
                );
              })}
            ;
          </Text>
        </View>
      </Card>
    );
  };

  //-----------  -------------  -------------  -------------  -------------

  const pressHandler = () => {
    alert("Thank you for submitting!");
    // this.logList();
  };

  return (
    <View style={container}>
      <Header title="Your Personal Logs" />
      <Card style={styles.CardContainer}>
        <FlatList
          // TODO: add a key property here
          // keyExtractor={(item, index) => item._id}
          style={styles.flatListView}
          data={stools}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  CardContainer: {
    alignItems: "center",
    width: 340,
    marginVertical: 30,
    marginBottom: 20,
    paddingBottom: 20,
    height: "80%",
    backgroundColor: Colors.primary,
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
  innerCardContainer: {
    marginBottom: 20,
    width: "100%",
  },
  logView: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logBodyView: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "black",
    alignItems: "center",
  },
  logText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subHeadingText: {
    fontWeight: "bold",
  },
});
