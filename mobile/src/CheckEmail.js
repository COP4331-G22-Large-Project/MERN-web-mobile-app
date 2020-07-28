import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Colors from "../constants/colors";
import { verifyEmail, retoken } from '../api/auth';

export function CheckEmail({ route, navigation }) {
  const [token, setToken] = React.useState('');
  const [errorTxt, setErrorTxt] = React.useState('');

  const { email } = route.params;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text>
          Please check your email at <Text style={styles.emailText}>{email}</Text> and click the link to reset your password,
          or enter the ID in the box below:
        </Text>
        <TextInput
          value={token}
          onChangeText={setToken}
          style={styles.txtInput}
          placeholder="Token"
          textAlign="center"
        />
        <View style={styles.twoButton}>
          <View style={styles.buttonView}>
            <Button
              color="black"
              title="Verify"
              onPress={() => {
                verifyEmail(token).then((res) => {
                  setErrorTxt('Success');
                  navigation.navigate('Bris-Tool');
                }).catch((err) => {
                  setErrorTxt('Invalid token');
                });
              }}
            />
          </View>
          <View style={styles.buttonView}>
            <Button
              color="black"
              title="Resend email"
              onPress={() => {
                retoken(email).then((res) => {
                  setErrorTxt('New email was sent. Check your inbox.');
                }).catch((err) => {
                  setErrorTxt('Unknown error occured');
                })
              }}
            />
          </View>
        </View>
        <Text style={styles.errorTxt}>
          {errorTxt}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  txtInput: {
    height: 60,
    width: "95%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 5,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: "8%",
  },
  twoButton: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
    margin: 2,
    alignItems: "center",
  },
  buttonView: {
    margin: 5,
    backgroundColor: Colors.primary,
    marginTop: 10,
    width: "65%",
    borderRadius: 10,
  },
  emailText: {
    fontWeight: 'bold'
  },
  errorTxt: {
    color: 'red',
  },
});
