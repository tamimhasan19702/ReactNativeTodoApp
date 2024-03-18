/** @format */

import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginView}>
        <Text style={styles.loginText}>TODO LIST TRACKER</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={styles.loginAvoidView}>
          <Text style={styles.loginAvoidText}>Login To you account</Text>
        </View>

        <View style={styles.textInputContainer}>
          <View style={styles.textInputView}>
            <MaterialIcons
              name="email"
              size={24}
              color="Gray"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={[styles.textInput, { fontSize: email ? 17 : 17 }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your Email"
            />
          </View>
          <View style={styles.textInputView}>
            <MaterialIcons
              name="lock"
              size={24}
              color="Gray"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={[styles.textInput, { fontSize: email ? 17 : 17 }]}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
            />
          </View>

          <View style={styles.keepLoginView}>
            <Text>Kepp me Logged in</Text>
            <Text style={{ color: "#007fff" }}>Forgot Password</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  loginView: {
    marginTop: 80,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0066b2",
  },
  loginAvoidView: {
    alignItems: "center",
  },
  loginAvoidText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },
  textInputContainer: {
    marginTop: 70,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  textInput: {
    color: "gray",
    marginVertical: 10,
    width: 300,
  },
  keepLoginView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    justifyContent: "space-between",
  },
});
