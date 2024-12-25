import React from "react";
import { View, StyleSheet } from "react-native";

const ProgressBar = ({ currentStage }) => {
  return (
    <View style={styles.progressBarContainer}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.line,
            { backgroundColor: index < currentStage ? "#2E8982" : "gray" },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20, // Space above the progress bar
  },
  line: {
    width: "22%", // 4 lines, each taking 22% width
    height: 4,
    borderRadius: 2, // Rounded edges for the lines
  },
});

export default ProgressBar;
