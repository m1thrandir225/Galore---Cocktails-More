import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import WelcomeScreen from "../../screens/Welcome/WelcomeScreen";
import { WelcomeStackParamList } from "../navigationTypes";
import AuthNavigation from "../Auth/AuthNavigation";
const WelcomeStack = createNativeStackNavigator<WelcomeStackParamList>();

const WelcomeNavigation = () => {
  return (
    <WelcomeStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <WelcomeStack.Screen name="Welcome" component={WelcomeScreen} />
      <WelcomeStack.Screen name="Auth" component={AuthNavigation} />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeNavigation;
