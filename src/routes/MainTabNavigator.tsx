import React from "react";
import { HomeScreen } from "../screens";
import NotificationsHomeScreen from "../components/notifications";
import { 
    View,
    StyleSheet
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                    backgroundColor: "#070236"
                    },
                    tabBarActiveTintColor: "#DADCDE",
                    tabBarInactiveTintColor: "#ededed",
                }}
                initialRouteName="Home"
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <View
                                style={[
                                    styles.tabIconContainer,
                                    {
                                        backgroundColor: focused ? "#070236" : "transparent",
                                        marginTop: focused ? -45 : 0,
                                    },
                                ]}
                            >
                                <Ionicons
                                    name="home"
                                    color={color}
                                    size={focused ? size + 15 : size}
                                />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notifications"
                    component={NotificationsHomeScreen}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <View
                                style={[
                                    styles.tabIconContainer,
                                    {
                                        backgroundColor: focused ? "#070236" : "transparent",
                                        marginTop: focused ? -45 : 0,
                                    },
                                ]}
                            >
                                <Ionicons
                                    name="notifications"
                                    color={color}
                                    size={focused ? size + 15 : size}
                                />
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    tabIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
    },
});