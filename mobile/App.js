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
} from "./src";
import { AuthContext } from "./src/utils";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-community/async-storage";

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
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen} /*component={HomeStack}*/
      />
      <Tab.Screen
        name="Consumables"
        component={Consumables} /*component={SettingStack}*/
      />
      <Tab.Screen name="Exercise" component={Exercise} />
      <Tab.Screen name="Stool" component={Stool} />
      <Tab.Screen name="Logs" component={Logs} />
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
          headerStyle: { backgroundColor: "teal" },
          headerTitleStyle: { fontWeight: "bold" , fontSize: 25},
        }}
        component={SignInScreen}
      />
      <StackAuth.Screen name="Register" component={RegisterScreen} />
      <StackAuth.Screen name="Forgot" component={ForgotScreen} />
    </StackAuth.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          if (action.token) {
            AsyncStorage.setItem("userToken", action.token);
          }
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          AsyncStorage.removeItem("userToken");
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // We need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        console.log("SignIn Data: ", data);

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // We need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
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
