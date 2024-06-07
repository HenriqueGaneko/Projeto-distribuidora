import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveBackgroundColor:"#E0B201",
        tabBarActiveBackgroundColor:"#E0B201",
        tabBarActiveTintColor: "#AC1A1A",
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="shoppingcart"
        component={Home}
        options={{
          title: "shoppingcart",
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={38} color={color} />
             ),
            }}
          />
      <Tab.Screen
        name="tags"
        component={Profile}
        options={{
          title: "profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

 
