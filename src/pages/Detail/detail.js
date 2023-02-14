import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { photoAPI } from "../../API/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Detail({ route }) {
  const [isLiked, setLiked] = useState(false);
  const navigation = useNavigation();
  const handleRoute = () => {
    navigation.goBack();
  };
  const handleCheck = () => {
    setLiked(!isLiked);
  };

  const { film } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.icons}>
          <TouchableOpacity onPress={handleRoute}>
            <Entypo name="chevron-thin-left" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCheck}>
            {isLiked ? (
              <Ionicons name="heart" size={30} color="red" />
            ) : (
              <Ionicons name="ios-heart-outline" size={30} color="white" />
            )}
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={{
            uri: `${photoAPI}${film?.poster_path}`,
          }}
          style={styles.image}
          alt=""
        >
          <LinearGradient
            colors={["#00000045", "#00000090", "#000000", "#000000"]}
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            <View style={styles.containerInside}>
              <Text style={{ color: "white", fontSize: 24, fontWeight: "400" }}>
                {film.title}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "100",
                }}
              >
                {film.release_date}
              </Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "300",
                    marginTop: 18,
                  }}
                >
                  {film.overview}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginTop: 36,
                  }}
                >
                  <TouchableOpacity style={styles.playBtn}>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "700",
                        fontSize: 18,
                      }}
                    >
                      PLAY NOW
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 28,
                        fontWeight: "700",
                        color: "white",
                        marginRight: 6,
                      }}
                    >
                      {film?.vote_average}
                    </Text>
                    <AntDesign name="star" size={28} color="red" />
                  </View>
                </View>
              </ScrollView>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#000000",
  },
  containerInside: {
    position: "absolute",
    top: "40%",
    left: "10%",
    right: "10%",
    bottom: "8%",
    paddingVertical: 24,
  },
  playBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "red",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.75,
  },
  icons: {
    position: "absolute",
    zIndex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: "10%",
    left: "5%",
  },
});
