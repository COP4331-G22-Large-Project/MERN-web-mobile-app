import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Splash from "../screens/splash.js";
import Login from "../screens/login.js";
const screens = {
  Splash: {
    screen: Splash,
  },
  Login: {
    screen: Login,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
