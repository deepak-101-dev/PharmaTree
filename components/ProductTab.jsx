import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductTab = () => {
  return (
    <View style={styles.card}>
      <Image source={require("../assets/product.jpg")} style={styles.image} />
      <Text style={styles.text}>Sample Text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});

export default ProductTab;
