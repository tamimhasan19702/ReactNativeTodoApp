/** @format */

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";

const index = () => {
  const todos = [];
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.press}>
          <Text style={styles.text}>All</Text>
        </Pressable>
        <Pressable style={styles.press}>
          <Text style={styles.text}>Work</Text>
        </Pressable>
        <Pressable style={[styles.press, { marginRight: "auto" }]}>
          <Text style={styles.text}>Personal</Text>
        </Pressable>
        <Pressable>
          <AntDesign name="pluscircle" size={30} color="#007fff" />
        </Pressable>
      </View>

      <ScrollView style={styles.scroller}>
        <View style={styles.scrollContainer}>
          {todos?.length > 0 ? (
            <View></View>
          ) : (
            <View style={styles.noTodoContainer}>
              <Image
                style={styles.noTodo}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                }}
              />
              <Text style={styles.noTodoText}>
                No Task added for today!! add a task
              </Text>
              <Pressable>
                <AntDesign name="pluscircle" size={30} color="#007fff" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  press: {
    backgroundColor: "#7cb9e8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  scroller: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    padding: 10,
  },
  noTodoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 130,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 10,
  },
  noTodo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  noTodoText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
});
