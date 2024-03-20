/** @format */

import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginView}>
        <Text style={styles.loginText}>TODO LIST TRACKER</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={styles.loginAvoidView}>
          <Text style={styles.loginAvoidText}>Register To you account</Text>
        </View>

        <View style={styles.textInputContainer}>
          <View style={styles.textInputView}>
            <MaterialIcons
              name="email"
              size={18}
              style={{ marginLeft: 15, color: "Gray" }}
            />
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your Email"
            />
          </View>
          <View style={styles.textInputView}>
            <MaterialIcons
              name="lock"
              size={18}
              style={{ marginLeft: 15, color: "Gray" }}
            />
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
            />
          </View>
          <View style={styles.textInputView}>
            <MaterialIcons
              name="lock"
              size={18}
              style={{ marginLeft: 15, color: "Gray" }}
            />
            <TextInput
              style={styles.textInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <Pressable
              style={{
                width: 200,
                backgroundColor: "#6699cc",
                padding: 15,
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Text style={styles.signUptext}>
              Don't have an account?
              <Pressable onPress={() => router.push("/register")}>
                <Text
                  style={{
                    color: "#007fff",
                    marginLeft: 8,
                    textAlign: "center",
                    fontSize: 18,
                  }}>
                  Sign up
                </Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
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
    marginTop: 10,
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
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  signUptext: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    color: "gray",
  },
});
