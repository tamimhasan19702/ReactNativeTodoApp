/** @format */

import React, { useState, useEffect } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("(tabs)/home");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    const user = {
      email,
      password,
    };

    axios
      .post("http://192.168.1.102:1200/api/login", user)
      .then((response) => {
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        router.replace("(tabs)/home");
        Alert.alert("Login Successful");
      })
      .catch((error) => {
        Alert.alert("Login Failed", error.response.data.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginView}>
        <Text style={styles.loginText}>TODO LIST TRACKER</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={styles.loginAvoidView}>
          <Text style={styles.loginAvoidText}>Login To your account</Text>
        </View>

        <View style={styles.textInputContainer}>
          <View style={styles.textInputView}>
            <MaterialIcons
              name="email"
              size={18}
              style={{ marginLeft: 15, color: "gray" }}
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
              style={{ marginLeft: 15, color: "gray" }}
            />
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />
          </View>

          <View style={styles.keepLoginView}>
            <Text>Keep me Logged in</Text>
            <Text style={{ color: "#007fff" }}>Forgot Password</Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <Pressable
              onPress={handleLogin}
              style={{
                width: 200,
                backgroundColor: "#6699cc",
                padding: 15,
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
              }}>
              <Text style={styles.buttonText}>Log in</Text>
            </Pressable>

            <Text style={styles.signUpText}>
              Don't have an account?
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text
                  style={{
                    color: "#007fff",
                    marginLeft: 8,
                    textAlign: "center",
                    fontSize: 18,
                  }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

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
  signUpText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    color: "gray",
  },
});
