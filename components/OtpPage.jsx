import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import bgImg from "../assets/background.png";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../utils/variable.js";
import TimedPopup from "./TimedPopup";

const OtpPage = ({ route, navigation }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(20);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const { mobileNumber } = route.params;
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    // Show popup upon navigating to this page
    setPopupVisible(true);

    // Auto-hide the popup after 3 seconds
    const popupTimer = setTimeout(() => {
      setPopupVisible(false);
    }, 3000);

    return () => clearTimeout(popupTimer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    console.log("Entered OTP:", otp.join(""));
    const payload = {
      mobile: `${mobileNumber}`,
      otp: `${otp.join("")}`,
      validate: false,
    };
    console.log("Payload to be sent:", payload);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("if response is ok");

        const responseData = await response.json();
        console.log("Response Data:", responseData);

        // Navigate to the Dashboard upon successful request
        navigation.navigate("Dashboard");
      } else {
        console.log("if response is not ok");
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        Alert.alert("Error", "Invalid OTP or Mobile Number. Please try again.");
      }
    } catch (error) {
      console.log("if response is failed ");
      Alert.alert("Network Error", "Failed to connect to the server.");
      console.error("Fetch Error:", error);

      setTimeout(() => {
        // navigation.navigate("DashboardDesigner");
        navigation.navigate("Dashboard");
      }, 2000);
    }
  };

  const handleResendOtp = () => {
    if (!resendDisabled) {
      setTimer(20);
      setResendDisabled(true);
      console.log("OTP Resent!");
    }
  };

  return (
    <ImageBackground
      source={bgImg}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleInputChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </View>
        <Text style={styles.timerText}>
          You can request to resend OTP in {timer} seconds
        </Text>
        <TouchableOpacity
          disabled={resendDisabled}
          onPress={handleResendOtp}
          style={[styles.resendLink, resendDisabled && styles.disabledResend]}
        >
          <Text>Resend OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        {/* TimedPopup Component */}
        <TimedPopup
          visible={isPopupVisible}
          message="OTP sent"
          onHide={() => setPopupVisible(false)}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Ensures the image covers the entire screen
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
  },
  timerText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: "#666",
  },
  resendLink: {
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#2E8982",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  disabledResend: {
    opacity: 0.5,
  },
});

export default OtpPage;

//admin panel
//import product , edit delte prpduict  , license approval , import inventory

// license list -> all with img
// add csv to import *only csv
// add csv for inventory
//get all products -> add delete feature
