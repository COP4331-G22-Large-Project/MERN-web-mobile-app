import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Splash from "../screens/splash.js";
import Login from "../screens/login.js";
import Create from "../screens/create_account.js";
import ForgotPassword from "../screens/forgot.js";
import CheckEmail from "../screens/check_email.js";

const screens = {
  Splash: {
    screen: Splash,
  },
  Create: {
    screen: Create,
  },
  Login: {
    screen: Login,
  },
  Forgot: {
    screen: ForgotPassword,
  },
  CheckEmail: {
    screen: CheckEmail,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
