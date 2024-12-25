import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import bgImg from "../assets/background.png";
import { useNavigation } from "@react-navigation/native";

const LoginPage = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("bgImg is ", bgImg);

    console.log("Mobile Number:", mobileNumber);
    navigation.navigate("OtpPage", { mobileNumber });
  };

  return (
    <ImageBackground
      source={bgImg}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          onChangeText={setMobileNumber}
        />
        {/* <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      /> */}
        <Button
          title="Login"
          onPress={handleLogin}
          disabled={mobileNumber.length < 10}
        />
        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate("RegisterForm")}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backgroundImage: {
    flex: 1, // Ensures the image covers the entire screen
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  registerLink: {
    marginTop: 10,
  },
  registerText: {
    color: "#2E8982",
    textDecorationLine: "underline",
    fontSize: 16,
    textAlign: "center",
  },
  buttonStyle: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E8982",
  },
});

export default LoginPage;
