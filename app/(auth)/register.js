/** @format */

import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    // Reset password match error if passwords match
    setPasswordMatchError("");

    const user = {
      username: username,
      email: email,
      password: password,
    };

    axios
      .post(`http://192.168.1.106:1200/api//register`, user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration Successful",
          "You have successfully registered your account"
        );
        router.replace("(auth)/login");
        setEmail("");
        setPassword("");
        setUsername("");
        setConfirmPassword("");
      })
      .catch((error) => {
        Alert.alert("Registration Failed", "Failed to register your account");
        console.log("regi error", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginView}>
        <Text style={styles.loginText}>TODO LIST TRACKER</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={styles.loginAvoidView}>
          <Text style={styles.loginAvoidText}>Register To your account</Text>
        </View>

        <View style={styles.textInputContainer}>
          <View style={styles.textInputView}>
            <MaterialIcons
              name="person"
              size={18}
              style={{ marginLeft: 15, color: "gray" }}
            />
            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your Username"
            />
          </View>
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
          <View style={styles.textInputView}>
            <MaterialIcons
              name="lock"
              size={18}
              style={{ marginLeft: 15, color: "gray" }}
            />
            <TextInput
              style={styles.textInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
            />
          </View>

          {passwordMatchError ? (
            <Text style={styles.errorText}>{passwordMatchError}</Text>
          ) : null}

          <View style={{ marginTop: 30 }}>
            <Pressable
              style={{
                width: 200,
                backgroundColor: "#6699cc",
                padding: 15,
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>

            <Text style={styles.signUptext}>
              Already have an account?
              <Pressable onPress={() => router.push("/login")}>
                <Text
                  style={{
                    color: "#007fff",
                    marginLeft: 8,
                    textAlign: "center",
                    fontSize: 18,
                    alignSelf: "center",
                  }}>
                  Sign in
                </Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

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
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
