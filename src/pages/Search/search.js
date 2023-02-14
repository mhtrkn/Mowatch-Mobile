import {
  ImageBackground,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { posterAPI } from "../../API/api";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

let imageBG = "../../../assets/bground.png";

export default function Home() {
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const handleReset = () => {
    setSearchData([]);
    setInput("");
  };
  const handleRoute = (film) => {
    navigation.navigate("Detail", { film });
  };
  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=8348c82cbf0c00dd0954a8fd1cc70035&query=${input}`
      )
      .then((res) => {
        setSearchData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [input]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={require(imageBG)} style={styles.image}>
          <View style={styles.searchTop}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              onChangeText={(e) => setInput(e)}
              defaultValue={input}
            />
            {input && input.length > 0 ? (
              <TouchableOpacity onPress={handleReset} style={styles.searchIcon}>
                <AntDesign name="close" size={20} color="#999999" />
              </TouchableOpacity>
            ) : (
              <Feather
                name="search"
                size={20}
                color="#999999"
                style={styles.searchIcon}
              />
            )}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20%",
              }}
            >
              {searchData &&
                searchData.map((movie, key) => {
                  return (
                    <View key={key} style={{ paddingHorizontal: 10 }}>
                      <TouchableOpacity
                        style={{
                          width: 160,
                          height: 220,
                          position: "relative",
                          marginVertical: 10,
                        }}
                        onPress={() => handleRoute(movie)}
                      >
                        <Image
                          source={{
                            uri: `${posterAPI}${movie?.poster_path}`,
                          }}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 24,
                            borderWidth: 1,
                            borderColor: "#33333390",
                            resizeMode: "fill",
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  searchTop: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "12%",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#eeeeee25",
    marginBottom: 12,
  },
  image: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    resizeMode: "cover",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    borderRadius: "12px",
    paddingVertical: 10,
    backgroundColor: "#33333350",
    borderWidth: 1,
    borderColor: "#FFFFFF50",
    color: "white",
    paddingHorizontal: 16,
  },
  searchIcon: {
    position: "absolute",
    right: "8%",
  },
});
