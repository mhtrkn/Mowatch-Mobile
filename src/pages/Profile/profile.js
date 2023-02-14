import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#25000050", "#60000075"]}
          style={styles.containerTop}
        >
          <View style={styles.profilePhoto}>
            <FontAwesome name="user" size={64} color="white" />
          </View>
          <Text
            style={{
              color: "white",
              fontWeight: "100",
              fontSize: 24,
              marginTop: 24,
            }}
          >
            Mehmet Türkan
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={["#00000090", "#11111175", "#11111175", "#00000090"]}
          style={styles.containerBottom}
        >
          <TouchableOpacity
            style={{
              maxWidth: "75%",
              minWidth: "100%",
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.menuText}>Homepage</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              maxWidth: "75%",
              minWidth: "100%",
            }}
            onPress={() => navigation.navigate("Search")}
          >
            <Text style={styles.menuText}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              maxWidth: "75%",
              minWidth: "100%",
            }}
            onPress={() => navigation.navigate("MyFavorites")}
          >
            <Text style={styles.menuText}>Favorites</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuText: {
    color: "#999999",
    minWidth: "75%",
    width: "100%",
    paddingVertical: "5%",
    paddingHorizontal: 24,
    fontSize: 24,
    textAlign: "center",
  },
  containerTop: {
    flexDirection: "column",
    minWidth: "100%",
    width: "100%",
    height: "40%",
    borderBottomLeftRadius: "50%",
    borderBottomRightRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerBottom: {
    flexDirection: "column",
    minWidth: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    backgroundColor: "#77777750",
    borderWidth: 1,
    borderColor: "#ffffff75",
    marginTop: -24,
    justifyContent: "center",
    alignItems: "center",
  },
});
