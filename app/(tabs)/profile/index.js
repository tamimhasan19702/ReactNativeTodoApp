/** @format */

import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL } from "../home";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

const index = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
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
              data: [pendingTasks, completedTasks],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={2} // optional, defaults to 1
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
          borderRadius: 16,
        }}
      />

      <View
        style={{
          backgroundColor: "#89CFF0",
          padding: 10,
          borderRadius: 8,
          marginTop: 15,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
            color: "white",
          }}>
          Tasks for the next seven days
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Image
          style={{ width: 120, height: 120 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/9537/9537221.png",
          }}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
