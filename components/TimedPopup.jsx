import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const TimedPopup = ({ visible, message, onHide }) => {
  const slideUpAnimation = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideUpAnimation, {
        toValue: 0, // Slide up to its final position
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Automatically hide after 3 seconds
        setTimeout(onHide, 2000);
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.popupContainer,
        { transform: [{ translateY: slideUpAnimation }] },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#4caf50", // Green background for success
    borderRadius: 3,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4, // Shadow for iOS
  },
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TimedPopup;
