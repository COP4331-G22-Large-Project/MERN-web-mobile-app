import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Splash from "../screens/splash.js";
import Login from "../screens/login.js";
import Create from "../screens/create_account.js";
import Forgot from "../screens/forgot.js";
import CheckEmail from "../screens/check_email.js";

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
      headerStyle: { backgroundcolor: "#eee" },
    },
  },
  Create: {
    screen: Create,
    navigationOptions: {
      title: "Create A New Account",
      headerStyle: { backgroundcolor: "#eee" },
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login",
      headerStyle: { backgroundcolor: "#eee" },
    },
  },
  CheckEmail: {
    screen: CheckEmail,
    navigationOptions: {
      title: "Check Your Email",
      headerStyle: { backgroundcolor: "#eee" },
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
