import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import ProductTab from "./ProductTab";

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello User</Text>
        <View style={styles.icons}>
          <FontAwesome
            name="shopping-cart"
            size={24}
            color="#333"
            style={styles.icon}
          />
          <MaterialIcons
            name="notifications"
            size={24}
            color="#333"
            style={styles.icon}
          />
        </View>
      </View>

      {/* Recommended Section */}
      <Section title="Recommended" />
      {/* Bestseller Section */}
      <Section title="Bestseller" />
      {/* New Choices Section */}
      <Section title="New Choices for You" />
      <Section title="Fresh Arivals" />
      <Section title="Best products" />
    </ScrollView>
  );
};

const Section = ({ title }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.products}>
      <ProductTab />
      <ProductTab />
      <ProductTab />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  viewAll: {
    fontSize: 14,
    color: "#2E8982",
  },
  products: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Dashboard;
