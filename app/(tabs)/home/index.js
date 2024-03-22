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
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
const index = () => {
  const todos = [];
  const [isVisible, setIsVisible] = useState(false);
  const [todo, setTodo] = useState({});
  const suggestions = [
    { id: 1, todo: "Take out the trash" },
    { id: 2, todo: "Pay rent" },
    { id: 3, todo: "Go to the gym" },
    { id: 4, todo: "Buy groceries" },
    { id: 5, todo: "Finish course work" },
    { id: 6, todo: "Do laundry" },
  ];
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
            <Ionicons name="send" size={28} color="#7cb9e8" />
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
              style={{
                borderWidth: 1.5,
                paddingHorizontal: 14,
                borderColor: "#7cb9e8",
                paddingVertical: 6,
                padding: 10,
                borderRadius: 5,
              }}>
              <Text>personal</Text>
            </TouchableOpacity>
            <TouchableOpacity
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
