import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/routes/AppNavigator";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#faf6f4",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  );
}
