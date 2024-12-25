import React from "react";
import { Text, StyleSheet } from "react-native";

const ErrorComponent = ({ error }) => {
  if (!error) return null; // If no error, render nothing

  return <Text style={styles.errorText}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
});

export default ErrorComponent;
