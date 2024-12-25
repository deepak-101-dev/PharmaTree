import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const DashboardDesigner = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="location-outline" size={24} color="#FF5722" />
        <View>
          <Text style={styles.locationText}>Block F</Text>
          <Text style={styles.subLocationText}>
            Carterpuri Village, Sector 23A, Gurugram
          </Text>
        </View>
        <Icon
          name="notifications-outline"
          size={24}
          color="#FF5722"
          style={styles.notificationIcon}
        />
        <Icon name="cart-outline" size={24} color="#FF5722" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search-outline" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for medicine and health products"
        />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Now Delivering</Text>
        <Text style={styles.bannerSubText}>Medicines in 60 minutes</Text>
      </View>

      {/* Features */}
      <View style={styles.features}>
        <Feature icon="time-outline" title="Rapid Delivery" />
        <Feature icon="document-text-outline" title="Accurate Reports" />
        <Feature icon="pricetag-outline" title="Trusted Brands" />
        <Feature icon="chatbubble-outline" title="Online 24x7" />
      </View>

      {/* Prescription Order */}
      <View style={styles.prescriptionOrder}>
        <Text style={styles.prescriptionText}>Order with prescription</Text>
        <Text style={styles.prescriptionSubText}>Save upto 23%</Text>
        <TouchableOpacity style={styles.orderNowButton}>
          <Text style={styles.orderNowText}>Order now</Text>
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        <Image
          source={{ uri: "https://via.placeholder.com/300x150" }}
          style={styles.carouselImage}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/300x150" }}
          style={styles.carouselImage}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/300x150" }}
          style={styles.carouselImage}
        />
      </ScrollView>

      {/* Popular Categories */}
      <Text style={styles.categoriesHeading}>Popular categories</Text>
      <View style={styles.categories}>
        <CategoryBox title="Vitamins & Supplements" color="#E8DFFF" />
        <CategoryBox title="Healthcare Devices" color="#FDD9DA" />
        <CategoryBox title="Skin Care" color="#FDE8F2" />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <FooterIcon icon="home-outline" label="Home" />
        <FooterIcon icon="heart-outline" label="Health Plans" />
        <FooterIcon icon="medkit-outline" label="Care Plan" />
        <FooterIcon icon="flask-outline" label="Lab Tests" />
        <FooterIcon icon="person-outline" label="Profile" />
      </View>
    </ScrollView>
  );
};

// Feature Component
const Feature = ({ icon, title }) => (
  <View style={styles.feature}>
    <Icon name={icon} size={28} color="#FF5722" />
    <Text style={styles.featureText}>{title}</Text>
  </View>
);

// CategoryBox Component
const CategoryBox = ({ title, color }) => (
  <View style={[styles.categoryBox, { backgroundColor: color }]}>
    <Text style={styles.categoryText}>{title}</Text>
  </View>
);

// FooterIcon Component
const FooterIcon = ({ icon, label }) => (
  <View style={styles.footerIcon}>
    <Icon name={icon} size={24} color="#FF5722" />
    <Text style={styles.footerText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  subLocationText: {
    fontSize: 12,
    color: "#666",
  },
  notificationIcon: {
    marginLeft: "auto",
    marginRight: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  banner: {
    padding: 15,
    backgroundColor: "#E0F7FA",
  },
  bannerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796B",
  },
  bannerSubText: {
    fontSize: 14,
    color: "#00796B",
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  feature: {
    alignItems: "center",
  },
  featureText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
  prescriptionOrder: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#E8F5E9",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  prescriptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  prescriptionSubText: {
    fontSize: 14,
    color: "#388E3C",
    marginVertical: 5,
  },
  orderNowButton: {
    backgroundColor: "#FF5722",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  orderNowText: {
    color: "#fff",
    fontWeight: "bold",
  },
  carousel: {
    marginVertical: 10,
  },
  carouselImage: {
    width: 300,
    height: 150,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  categoriesHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 10,
    marginTop: 10,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  categoryBox: {
    width: "30%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  categoryText: {
    textAlign: "center",
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f1f1f1",
  },
  footerIcon: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    marginTop: 2,
    color: "#333",
  },
});

export default DashboardDesigner;
