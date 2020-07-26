import * as React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SplashScreen,
  HomeScreen,
  SignInScreen,
  RegisterScreen,
  SettingScreen,
  Consumables,
  Exercise,
  Stool,
  Logs,
  ForgotScreen,
  CheckEmail,
} from "./src";
import { AuthContext } from "./src/utils";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-community/async-storage";
import Colors from "./constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { login, checkLoggedIn, logout, register } from "./api/auth";

//
//const StackHome = createStackNavigator();

//function HomeStack() {
// return (
//    <StackHome.Navigator initialRouteName="SignIn">
//      <StackHome.Screen name="Home" component={HomeScreen} />
//      <StackHome.Screen name="Detail" component={DetailScreen} />
//    </StackHome.Navigator>
//  );
//}

//const StackSetting = createStackNavigator();

//function SettingStack() {
//  return (
//    <StackSetting.Navigator initialRouteName="Setting">
//      <StackSetting.Screen name="Setting" component={SettingScreen} />
//      <StackSetting.Screen name="Detail" component={DetailScreen} />
//    </StackSetting.Navigator>
//  );
//}
//

const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen} /*component={HomeStack}*/
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name="ios-home" color={color} size={24} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Consumables"
        component={Consumables} /*component={SettingStack}*/
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="food"
              size={24}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Exercise"
        component={Exercise}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="md-fitness"
              size={24}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stool"
        component={Stool}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="poop"
              size={24}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Logs"
        component={Logs}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="book"
              size={24}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const StackAuth = createStackNavigator();

// CHECK ME OUT BELOW FOR FOGOT
function AuthStack() {
  return (
    <StackAuth.Navigator initialRouteName="SignIn">
      <StackAuth.Screen
        name="Bris-Tool"
        options={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color: "black",
          },
        }}
        component={SignInScreen}
      />
      <StackAuth.Screen
        name="Register"
        options={{
          title: "Sign up!",
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            color: "black",
          },
          headerTintColor: "black",
        }}
        component={RegisterScreen}
      />
      <StackAuth.Screen name="Forgot" component={ForgotScreen} />
      <StackAuth.Screen name="CheckEmail" component={CheckEmail} />
    </StackAuth.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      console.log('Running ' + action.type);
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            user: action.user,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: true,
      user: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = () => {
      checkLoggedIn()
        .then((res) => {
          dispatch({ type: "RESTORE_TOKEN", user: res.data });
        })
        .catch((err) => {
          dispatch({ type: "RESTORE_TOKEN" });
        });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: (data) => {
        login(data.username, data.password)
          .then((res) => {
            dispatch({ type: "SIGN_IN", user: res.data });
          })
          .catch((err) => {
            // TODO: Invalid username/password
          });
      },
      signOut: () => {
        logout();
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: (data) => {
        register(
          data.username,
          data.password,
          data.email,
          data.firstName,
          data.lastName
        )
          .then((res) => {
            dispatch({ type: "SIGN_IN" });
          })
          .catch((err) => {
            // TODO: Tell user the error that occured
            console.log(err);
          });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={AuthStack}
              options={{
                title: "Sign in",
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? "pop" : "push",
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={HomeTab} /> /*HomeScreen*/
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
