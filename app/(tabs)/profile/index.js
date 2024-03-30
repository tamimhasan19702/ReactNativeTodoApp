/** @format */

import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL } from "../home";
import axios from "axios";

const index = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const fetchTaskData = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos/count`);
      const { totalCompletedTodos, totalPendingTodos } = response.data;
      setCompletedTasks(totalCompletedTodos);
      setPendingTasks(totalPendingTodos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTaskData();
  });
  console.log("comp", completedTasks);
  console.log("pen", pendingTasks);
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
        />
        <View>
          <Text>Keep Plans for 15 days</Text>
          <Text>select Categories</Text>
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
