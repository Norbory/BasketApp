import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/routes/AppNavigator";
import { SocketProvider } from './src/context/SocketContext';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#faf6f4",
  },
};

export default function App() {
  
  return (
    <SocketProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </SocketProvider>
  );
}
