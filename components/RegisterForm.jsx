import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import query from "india-pincode-search";
import DateTimePicker from "@react-native-community/datetimepicker";
import ProgressBar from "./ProgressBar";
import ErrorComponent from "./ErrorComponent";
import bgImg from "../assets/background.png";
import { BASE_URL } from "../utils/variable.js";

const RegisterForm = ({ navigation }) => {
  const [stage, setStage] = useState(1); // Current stage
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    pincode: "",
    city: "",
    state: "",
    drugLicense: "",
    licenseExpiry: "",
    uploadedDoc: null,
    gstNumber: "",
  });
  const [payload, setPayload] = useState({}); // Final payload
  const [showDatePicker, setShowDatePicker] = useState(false); // To control date picker visibility
  const [dateField, setDateField] = useState(""); // To store the selected date field (dob or licenseExpiry)
  const [errors, setErrors] = useState({});

  const requiredFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "drugLicense",
    "licenseExpiry",
  ];

  // Handle file upload
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all file types
        copyToCacheDirectory: true,
      });
      if (result.type === "success") {
        console.log("File URI:", result.uri);
        setFormData({ ...formData, uploadedDoc: result });
      } else {
        console.log("File selection canceled");
      }
    } catch (error) {
      console.error("File Upload Error:", error);
    }
  };

  // Update city and state using pincode
  const handlePincodeChange = (pincode) => {
    setFormData({ ...formData, pincode });
    if (pincode.length === 6) {
      const result = query.search(pincode);
      if (result.length > 0) {
        const { city, state } = result[0];
        setFormData({ ...formData, city, state });
      } else {
        Alert.alert("Error", "Invalid pincode or data not found.");
      }
    }
  };

  const validateFields = () => {
    const stageSpecificFields = {
      1: ["firstName", "lastName", "phoneNumber"],
      2: ["address1", "pincode"],
      3: ["drugLicense", "licenseExpiry"],
      4: ["gstNumber"],
    };

    const newErrors = {};
    const fieldsToValidate = stageSpecificFields[stage];

    fieldsToValidate.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`; // Converts camelCase to readable text
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNext = async () => {
    console.log(bgImg);
    console.log("inside handlenext");

    if (validateFields()) {
      if (stage === 4) {
        updatePayload();
        console.log("Final Payload:", payload); // Logging final payload
        Alert.alert("Success", "Form submitted successfully!");
        try {
          // Making the POST fetch call
          const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log("Response Data:", responseData);

            Alert.alert("Success", "Form submitted successfully!");
            navigation.replace("LoginPage");
          } else {
            const errorData = await response.json();
            console.error("Error Response:", errorData);
            Alert.alert("Error", "Something went wrong. Please try again.");
          }
        } catch (error) {
          console.error("Fetch Error:", error);
          Alert.alert("Network Error", "Failed to connect to the server.");
        }

        navigation.replace("LoginPage");
      } else {
        setStage(stage + 1);
      }
    } else {
      Alert.alert("Validation Error", "Please fill in all required fields.");
    }
  };

  // const renderError = (field) => {
  //   return errors[field] ? (
  //     <Text style={styles.errorText}>{errors[field]}</Text>
  //   ) : null;
  // };

  const renderError = (field) => {
    return <ErrorComponent error={errors[field]} />;
  };

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Clear error for the specific field
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (value.trim() !== "") {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
  };

  // Update payload
  const updatePayload = () => {
    console.log("Form Data before updating Payload:", formData); // Debugging
    // Transforming formData into the desired payload structure
    const updatedPayload = {
      firstName: `${formData.firstName}`,
      lastName: `${formData.lastName}`,
      expirationDate: formData.licenseExpiry, // Assuming licenseExpiry is already in the correct format
      mob: `${formData.phoneNumber}`,
      drugLicenseNumber: `${formData.drugLicense}`,
      email: `${formData.email}`,
      GSTNumber: `${formData.gstNumber}`,
      GSTStateCode: `${formData.gstState}`, // Assuming state represents GST state code
      address: {
        addressLine1: `${formData.address1}`,
        addressLine2: `${formData.address2}`,
        state: `${formData.state}`,
        city: `${formData.city}`,
        pinCode: `${formData.pincode}`,
      },
    };

    setPayload(updatedPayload); // Update the payload state
    console.log("Updated Payload:", updatedPayload); // Debugging
  };

  // Handle date change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate.toLocaleDateString();
      setFormData({ ...formData, [dateField]: currentDate });
    }
  };

  // Render form fields for each stage
  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.firstName}
              // onChangeText={(text) =>
              //   setFormData({ ...formData, firstName: text })
              // }
              onChangeText={(text) => handleInputChange("firstName", text)}
            />
            {renderError("firstName")}
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={formData.lastName}
              // onChangeText={(text) =>
              //   setFormData({ ...formData, lastName: text })
              // }
              onChangeText={(text) => handleInputChange("lastName", text)}
            />
            {renderError("lastName")}
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              // onChangeText={(text) =>
              //   setFormData({ ...formData, phoneNumber: text })
              // }
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
            />
            {renderError("phoneNumber")}

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            {renderError("email")}

            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={formData.dob}
              onFocus={() => {
                setDateField("dob");
                setShowDatePicker(true);
              }}
            />
            {renderError("dob")}
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Address Line 1"
              value={formData.address1}
              onChangeText={(text) =>
                setFormData({ ...formData, address1: text })
              }
            />
            {renderError("address1")}

            <TextInput
              style={styles.input}
              placeholder="Address Line 2"
              value={formData.address2}
              onChangeText={(text) =>
                setFormData({ ...formData, address2: text })
              }
            />
            {renderError("address2")}

            <TextInput
              style={styles.input}
              placeholder="Pincode"
              keyboardType="numeric"
              value={formData.pincode}
              onChangeText={handlePincodeChange}
            />
            {renderError("pincode")}

            <TextInput
              style={styles.input}
              placeholder="City"
              value={formData.city}
              editable={false}
            />
            {renderError("city")}

            <TextInput
              style={styles.input}
              placeholder="State"
              value={formData.state}
              editable={false}
            />
            {renderError("state")}
          </>
        );
      case 3:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Drug License Number"
              value={formData.drugLicense}
              onChangeText={(text) =>
                setFormData({ ...formData, drugLicense: text })
              }
            />
            {renderError("drugLicense")}

            {/* <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>
                {formData.licenseExpiry || "Select Expiry Date"}
              </Text>
            </TouchableOpacity> */}
            <TextInput
              style={styles.input}
              placeholder="Select Expiry Date"
              value={formData.licenseExpiry}
              onFocus={() => {
                setDateField("licenseExpiry");
                setShowDatePicker(true);
              }}
            />
            {renderError("licenseExpiry")}

            <Button title="Upload Document" onPress={handleFileUpload} />
          </>
        );
      case 4:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="GST Number"
              value={formData.gstNumber}
              onChangeText={(text) =>
                setFormData({ ...formData, gstNumber: text })
              }
            />
            {renderError("gstNumber")}

            <TextInput
              style={styles.input}
              placeholder="GST State Code"
              value={formData.gstState}
              onChangeText={(text) =>
                setFormData({ ...formData, gstState: text })
              }
            />
            {renderError("gstState")}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={bgImg}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ProgressBar currentStage={stage} /> {/* Display the ProgressBar */}
        <Text style={styles.heading}>
          {stage === 1
            ? "Introduction"
            : stage === 2
            ? "Address"
            : stage === 3
            ? "Drug License"
            : stage === 4
            ? "GST Info"
            : "Form"}
        </Text>
        {renderStage()}
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.buttonStyle, styles.backButton]}
              onPress={() => setStage(stage - 1)}
              disabled={stage === 1}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.buttonStyle, styles.nextButton]}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>
                {stage === 4 ? "Submit" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1, // Ensures the image covers the entire screen
    justifyContent: "center", // Centers the form vertically
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2E8982",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    right: 20,
    left: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonStyle: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "#fff", // Changed background color
    borderColor: "#2E8982", // Border color set to #2E8982
    borderWidth: 1, // 1px border width
    borderRadius: 5, // Rounded corners
    paddingVertical: 12, // Vertical padding for button height
    paddingHorizontal: 15, // Horizontal padding for button width
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    color: "#2E8982",
  },
  nextButton: {
    backgroundColor: "#2E8982",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  backButtonText: {
    color: "#2E8982",
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: "#2E8982",
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 20,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});

export default RegisterForm;
