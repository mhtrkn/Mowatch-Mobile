import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { photoAPI, popularMovies, topratedMovies } from "../../API/api";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const imageBG = "../../../assets/bground.png";

export default function Home() {
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const navigation = useNavigation();
  const handleRoute = (film) => {
    navigation.navigate("Detail", { film });
  };

  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  useEffect(() => {
    axios
      .get(popularMovies)
      .then((res) => {
        setPopular(res?.data?.results);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(topratedMovies)
      .then((res) => {
        setTopRated(res?.data?.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={require(imageBG)} style={styles.image}>
          <View style={styles.headerContainer}>
            <TouchableOpacity>
              <Image
                source={require("../../../assets/menu_icon.png")}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <Image
              source={require("../../../assets/logo.png")}
              style={{
                width: 70,
                height: 70,
                resizeMode: "contain",
                marginLeft: 20,
              }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Feather name="user" size={28} color="white" />
            </TouchableOpacity>
          </View>
          {/*Trending Movies*/}
          <SafeAreaView
            style={{
              width: "100%",
              marginTop: "10%",
            }}
          >
            <Text
              style={{
                position: "relative",
                marginLeft: "2.5%",
                color: "#e1e1e1",
                fontWeight: "200",
                fontSize: 24,
              }}
            >
              Trending Movies
            </Text>
            <View
              style={{
                position: "absolute",
                top: "12%",
                height: 2,
                width: "45%",
                backgroundColor: "#800000",
              }}
            />
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{
                marginTop: "5%",
              }}
            >
              {popular.map((item, i) => {
                return (
                  <View key={i} style={{ paddingHorizontal: 10 }}>
                    <TouchableOpacity
                      style={{
                        width: 240,
                        height: 180,
                        position: "relative",
                        borderRadius: 20,
                      }}
                      onPress={() => handleRoute(item)}
                    >
                      <ImageBackground
                        source={{
                          uri: `${photoAPI}${item.backdrop_path}`,
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "relative",
                        }}
                        imageStyle={{
                          borderRadius: 20,
                        }}
                      >
                        <LinearGradient
                          colors={["#00000000", "#000000"]}
                          style={{
                            height: "100%",
                            width: "100%",
                            borderWidth: 0.5,
                            borderRadius: 20,
                            borderColor: "#99999990",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "200",
                              color: "#eee",
                              fontSize: 20,
                              paddingHorizontal: 12,
                              paddingVertical: 6,
                            }}
                          >
                            {item?.title}
                          </Text>
                          <Text
                            style={{
                              color: "#eee",
                              fontSize: 12,
                              paddingHorizontal: 12,
                              paddingBottom: 8,
                            }}
                          >
                            {item?.release_date}
                          </Text>
                        </LinearGradient>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>

          {/*Top Rated Movies*/}
          <SafeAreaView
            style={{
              width: "100%",
              marginTop: "10%",
            }}
          >
            <Text
              style={{
                position: "relative",
                marginLeft: "2.5%",
                color: "#e1e1e1",
                fontWeight: "200",
                fontSize: 24,
              }}
            >
              Top rated Movies
            </Text>
            <View
              style={{
                position: "absolute",
                top: "12%",
                height: 2,
                width: "45%",
                backgroundColor: "#800000",
              }}
            />
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{
                marginTop: "5%",
              }}
            >
              {topRated.map((item, key) => {
                return (
                  <View key={key} style={{ paddingHorizontal: 10 }}>
                    <TouchableOpacity
                      style={{
                        width: 140,
                        height: 200,
                        position: "relative",
                      }}
                      onPress={() => handleRoute(item)}
                    >
                      <View style={styles.topratedStyle}>
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
                              fontSize: 18,
                              fontWeight: "500",
                              color: "white",
                              marginRight: 6,
                            }}
                          >
                            {item?.vote_average}
                          </Text>
                          <AntDesign name="star" size={24} color="#800000" />
                        </View>
                      </View>
                      <Image
                        source={{
                          uri: `${photoAPI}${item.backdrop_path}`,
                        }}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 24,
                          borderWidth: 1,
                          borderColor: "#33333390",
                          resizeMode: "cover",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    resizeMode: "cover",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    backgroundColor: "transparent",
    paddingVertical: 16,
  },
  linearStyle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: "8%",
    borderRadius: 24,
    zIndex: 1,
  },
  topratedStyle: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "8%",
    borderRadius: 24,
    zIndex: 1,
  },
  moviesRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: 250,
  },
  text: {
    color: "white",
  },
});
