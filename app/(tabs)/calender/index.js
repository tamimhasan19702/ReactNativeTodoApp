/** @format */

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { API_URL } from "../home/index";
import axios from "axios";

const index = () => {
  const today = moment().format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);
  const fetchCompletedTodos = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.106:1200/api/todos/completed/${selectedDate}`
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
  console.log(todos);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
