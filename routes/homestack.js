import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Splash from "../screens/splash.js";
import Login from "../screens/login.js";
import Create from "../screens/create_account.js";
import Forgot from "../screens/forgot.js";
import CheckEmail from "../screens/check_email.js";
import Home from "../screens/home.js";
import Consumable from "../screens/consumable.js";
import Exercise from "../screens/exercise.js";
import Logs from "../screens/logs.js";

const screens = {
  Splash: {
    screen: Splash,
    navigationOptions: {
      title: "Group 22",
    },
  },
  Forgot: {
    screen: Forgot,
    navigationOptions: {
      title: "Forgotten Password",
      headerStyle: { backgroundcolor: "gray" },
    },
  },
  Create: {
    screen: Create,
    navigationOptions: {
      title: "Create A New Account",
      headerStyle: { backgroundcolor: "gray" },
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login",
      headerStyle: { backgroundcolor: "gray" },
    },
  },
  CheckEmail: {
    screen: CheckEmail,
    navigationOptions: {
      title: "Check Your Email",
      headerStyle: { backgroundcolor: "gray" },
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home",
      headerStyle: { backgroundcolor: "gray" },
    },
  },
  Consumable: {
    screen: Consumable,
    navigationOptions: {
      title: "Log Food and Drink",
      headerStyle: { backgroundcolor: "gray" },
    },
  },
  Exercise: {
    screen: Exercise,
    navigationOptions: {
      title: "Log Exercise or Activity",
      headerStyle: { backgroundcolor: "gray" },
    },
  },
  Logs: {
    screen: Logs,
    navigationOptions: {
      title: "Logs Page",
      headerStyle: { backgroundcolor: "gray" },
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
