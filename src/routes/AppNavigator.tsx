import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens";
import { MainTabNavigator } from "./MainTabNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (
    <Stack.Navigator initialRouteName="MainTab">
        <Stack.Screen
            name="MainTab"
            component={MainTabNavigator}
            options={{ headerShown: true }}
        />
    </Stack.Navigator>
  );
};

export default AppNavigator;
