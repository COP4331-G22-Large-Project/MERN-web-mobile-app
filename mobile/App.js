import React from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  Dimensions,
  TextInput, 
  TouchableOpacity, 
  StatusBar,
  ImageBackground,
  Image
} from 'react-native';
// test 2
import bgImage from './app/img/imagetest.jpg';

const{ width: WIDTH } = Dimensions.get('window')


export default class App extends React.Component {
  render() {
    return (
      <ImageBackground source = { bgImage } style={(styles.backgroundContainer)}>
      <Text style={styles.Welcome}>Login To My APP</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
      />
      
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        />
        

        <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => alert("Login Works")}
          >
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => alert("Signup Works")}
            >
          <Text style={styles.btnTxt}>Signup</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
      
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: '20%',
  },
  Welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    paddingTop: '-50%'
    
  },
  input: {
    width: '90%',

    padding: 15,
    marginBottom: 10
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'

  },
  userBtn:{
    backgroundColor: '#FFD700',
    padding: 15,
    width: '45%'  
  },
  btnTxt: {
    fontSize: 20,
    textAlign: 'center'
  }


});
