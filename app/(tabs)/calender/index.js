/** @format */

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { API_URL } from "../home";
import axios from "axios";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const index = () => {
  const today = moment().format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);
  const fetchCompletedTodos = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/todos/completed/${selectedDate}`
      );

      const completedTodos = response.data.completedTodos || [];
      setTodos(completedTodos);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchCompletedTodos();
  }, [selectedDate]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#7CB9E8" },
        }}
      />

      <View style={{ marginTop: 20 }}>
        {todos?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: "#e0e0e0",
                padding: 10,
                borderRadius: 7,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}>
                <FontAwesome
                  onPress={() => markTodosCompleted(item?._id)}
                  name="circle"
                  size={18}
                  color="gray"
                />
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    flex: 1,
                    color: "gray",
                  }}>
                  {item?.title}
                </Text>
                <MaterialCommunityIcons
                  name="flag-variant"
                  size={18}
                  color="gray"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
