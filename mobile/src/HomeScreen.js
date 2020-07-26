import * as React from "react";
import {
  Button,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AuthContext } from "./utils";
import Header from "../components/Header";
import Card from "../components/Card";
import Colors from "../constants/colors";

export function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);
  const { container } = styles;

  return (
    <View style={container}>

        <Header title="Home" />
   

      <ScrollView contentContainerStyle={styles.scrollview} >
        <View style={styles.CardContainer}>
          <Card>
            <Text style={styles.introtext}>Hi "UserName"</Text>
            <Text style={styles.introtext}>Welcome to Bris-Tool</Text>
            <Text style={styles.introtext}>Your Personal Health Journal</Text>
            <Text style={styles.bodyText}>
              The Bristol Stool Chart or Bristol Stool Scale is a medical aid
              designed to classify stools (known as ‘faeces’ or ‘poo’) into
              seven groups.
            </Text>
            <Text style={styles.bodyHeader}>ABOUT THE BRISTOL STOOL CHART</Text>
            <Text style={styles.bodyText}>
              The Bristol Stool Chart was developed in 1997 as a clinical
              assessment tool. There are seven types of stools (faeces)
              according to the Bristol Stool Chart. The Bristol Stool Chart or
              Bristol Stool Scale is a medical aid designed to classify faeces
              into seven groups.
            </Text>
          </Card>
        </View>
        <View style={styles.button}>
          <Button color="white" title="Sign out" onPress={signOut} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollview:{
    alignItems:'center'
  },
  CardContainer: {
    paddingVertical: 30,
    width: "95%",
  },
  introbox: {
    width: "100%",
  },
  introtext: {
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: Colors.primary,
    width: "40%",
    height: 50,
    justifyContent: "center",
    borderRadius: 12,
  },
  bodyHeader: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  bodyText: {
    fontSize: 15,
    paddingVertical: 15,
  },
});
