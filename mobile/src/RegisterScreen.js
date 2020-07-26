import * as React from "react";
import axios from 'axios'
import { Button, TextInput, View, StyleSheet } from "react-native";

export function RegisterScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { container, txtInput } = styles;

  let state;
  state = {
    username : '',
    firstName : '',
    lastName : '',
    email : '',
    password :'',
    confirmPassword : ''
  }
    const user = {
        username: state.username,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword
    }

  const register = (username, password) => {
    axios.post('/api/auth/register',user)
        .then(res => window.location.href = 'Home')

  };

  return (
    <View style={container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={txtInput}
      />
        <TextInput
            placeholder="firstName"
            value={firstName}
            onChangeText={setFirstName}
            secureTextEntry
            style={txtInput}
        />
        <TextInput
            placeholder="confirmPassword"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={txtInput}
        />
      <Button
        title="Register"
        onPress={() => register({ username, password })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txtInput: {
    height: 50,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 5,
  },
});
