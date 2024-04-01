/** @format */

import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL } from "../home";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

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
  }, []);
  console.log("comp", completedTasks);
  2;
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
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            Keep Plans for 15 days
          </Text>
          <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
            select Categories
          </Text>
        </View>
      </View>

      <View style={{ marginVertical: 12 }}>
        <Text>Tasks Overview</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginVertical: 8,
          }}>
          <View
            style={{
              backgroundColor: "#89cff0",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}>
              {completedTasks}
            </Text>
            <Text style={{ marginTop: 5 }}>Completed tasks</Text>
          </View>

          <View
            style={{
              backgroundColor: "#89cff0",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}>
              {pendingTasks}
            </Text>
            <Text style={{ marginTop: 5 }}>Pending tasks</Text>
          </View>
        </View>
      </View>

      <LineChart
        data={{
          labels: ["Pending Tasks", "Completed Tasks"],
          datasets: [
            {
              data: [
                pendingTasks.length > 0 ? pendingTasks[0] : 0,
                completedTasks.length > 0 ? completedTasks[0] : 0,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
