import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Home from "../pages/Home/home";
import Detail from "../pages/Detail/detail";
import Search from "../pages/Search/search";
import Profile from "../pages/Profile/profile";
import MyFavorites from "../pages/MyFavorites/myFavorites";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [hide, setHide] = useState(true);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgba(20,20,20,0.5)",
          borderRadius: 0,
          height: 98,
          paddingTop: 10,
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={50}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={24} color={focused ? "red" : "white"} />
          ),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Detail}
        options={{
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="search"
              size={24}
              color={focused ? "red" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyFavorites"
        component={MyFavorites}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="favorite"
              size={24}
              color={focused ? "red" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="user" size={24} color={focused ? "red" : "white"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
