import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Loader from "./Loader"; // Loader component

const LandingPage = ({ navigation }) => {
  useEffect(() => {
    // Navigate to the LoginPage after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace("LoginPage");
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>PharmaHub</Text>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E8982",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
});

export default LandingPage;
