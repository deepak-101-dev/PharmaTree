import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    document: null,
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = async () => {
    console.log("inside handle");

    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setFormData({ ...formData, document: result });
      Alert.alert("File Selected", `You selected: ${result[0].name}`);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        Alert.alert("Cancelled", "File selection was cancelled.");
      } else {
        console.error("File Upload Error:", error);
      }
    }
  };

  const handleRegister = () => {
    const payload = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key];
      return acc;
    }, {});
    console.log("Payload:", payload);
    Alert.alert("Register", "Registration payload logged to console.");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(value) => handleInputChange("firstName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(value) => handleInputChange("lastName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        onChangeText={(value) => handleInputChange("mobileNumber", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address Line 1"
        onChangeText={(value) => handleInputChange("addressLine1", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address Line 2"
        onChangeText={(value) => handleInputChange("addressLine2", value)}
      />
      <Button title="Upload Document" onPress={handleFileUpload} />
      <View style={{ marginTop: 20 }}>
        <Button title="Register" color="#2E8982" onPress={handleRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    fontSize: 16,
    padding: 10,
  },
});

export default RegisterPage;
