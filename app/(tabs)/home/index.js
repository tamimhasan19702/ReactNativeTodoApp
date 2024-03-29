/** @format */

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import axios from "axios";
import moment from "moment";
import { Entypo, Feather } from "@expo/vector-icons";

export const API_URL = "http://192.168.1.106:1200/api/";

const index = () => {
  const [todos, setTodos] = useState([]);
  const today = moment().format("MMM Do");
  const [isVisible, setIsVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState({});
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const suggestions = [
    { id: 1, todo: "Take out the trash" },
    { id: 2, todo: "Pay rent" },
    { id: 3, todo: "Go to the gym" },
    { id: 4, todo: "Buy groceries" },
    { id: 5, todo: "Finish course work" },
    { id: 6, todo: "Do laundry" },
  ];

  const getUserTodo = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/users/660190701a989a15d2916822/todos`
      );
      console.log(response.data.todos);
      setTodos(response.data.todos);

      const fetchedTodos = response.data.todos || [];

      const pending = fetchedTodos.filter(
        (todo) => todo.status !== "completed"
      );

      const completed = fetchedTodos.filter(
        (todo) => todo.status === "completed"
      );
      setPendingTodos(pending);
      setCompletedTodos(completed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserTodo();
  }, []);

  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      };

      await axios
        .post(`${API_URL}todos/660190701a989a15d2916822`, todoData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error, "here");
        });

      setIsVisible(false);
      setTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  const markTodosCompleted = async (todoId) => {
    try {
      setMarked(true);
      const response = await axios.patch(`${API_URL}/todos/${todoId}/complete`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("completed todos", completedTodos);
  console.log("pending todos", pendingTodos);
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.press}>
          <Text style={styles.text}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.press}>
          <Text style={styles.text}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.press, { marginRight: "auto" }]}>
          <Text style={styles.text}>Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
          <AntDesign name="pluscircle" size={30} color="#007fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroller}>
        <View style={styles.scrollContainer}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && <Text>tasks to Do! {today}</Text>}

              {pendingTodos?.map((item, index) => {
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
                      <Entypo name="circle" size={18} color="black" />
                      <Text>{item?.title}</Text>
                      <Feather name="flag" size={18} color="black" />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
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
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <AntDesign name="pluscircle" size={30} color="#007fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomModal
        onBackdropPress={() => setIsVisible(false)}
        onHardwareBackPress={() => setIsVisible(false)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a Todo Task" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isVisible}
        onTouchOutside={() => setIsVisible(false)}>
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}>
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Enter a new Todo here"
              style={{
                padding: 10,
                borderColor: "#7cb9e8",
                borderWidth: 1.5,
                borderRadius: 5,
                flex: 1,
              }}
            />
            <TouchableOpacity onPress={addTodo}>
              <Ionicons name="send" size={28} color="#7cb9e8" />
            </TouchableOpacity>
          </View>

          <Text>Choose Category</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => setCategory("work")}
              style={{
                borderWidth: 1.5,
                paddingHorizontal: 14,
                borderColor: "#7cb9e8",
                paddingVertical: 6,
                padding: 10,
                borderRadius: 5,
              }}>
              <Text>Work</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCategory("personal")}
              style={{
                borderWidth: 1.5,
                paddingHorizontal: 14,
                borderColor: "#7cb9e8",
                paddingVertical: 6,
                padding: 10,
                borderRadius: 5,
              }}>
              <Text>Personal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCategory("wishlist")}
              style={{
                borderWidth: 1.5,
                paddingHorizontal: 14,
                borderColor: "#7cb9e8",
                paddingVertical: 6,
                padding: 10,
                borderRadius: 5,
              }}>
              <Text>Wishlist</Text>
            </TouchableOpacity>
          </View>

          <Text>Some Suggestions</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
              marginVertical: 10,
            }}>
            {suggestions?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setTodo(item?.todo)}
                  key={index}
                  style={{
                    borderWidth: 1.5,
                    paddingHorizontal: 14,
                    borderColor: "#7cb9e8",
                    paddingVertical: 6,
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text>{item?.todo}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ModalContent>
      </BottomModal>
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
