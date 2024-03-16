/** @format */

import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "home",
          tabBarLabelStyle: {
            color: "#7cB9E8",
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            focused ? (
              <FontAwesome5 name="tasks" size={24} color="#7cB9E8" />
            ) : (
              <FontAwesome5 name="tasks" size={24} color="black" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="calender"
        options={{
          tabBarLabel: "calender",
          tabBarLabelStyle: {
            color: "#7cB9E8",
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            focused ? (
              <AntDesign name="calendar" size={24} color="#7cB9E8" />
            ) : (
              <AntDesign name="calendar" size={24} color="black" />
            );
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "profile",
          tabBarLabelStyle: {
            color: "#7cB9E8",
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            focused ? (
              <AntDesign name="user" size={24} color="#7cB9E8" />
            ) : (
              <AntDesign name="user" size={24} color="black" />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default Layout;
