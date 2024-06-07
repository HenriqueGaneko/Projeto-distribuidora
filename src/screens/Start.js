import React from "react";
import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/logoNova.png";
import MyButton from "../components/MyButton";

export default function Start() {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <StatusBar backgroundColor="#1b1b1f" barStyle="light-content" />
      <Image source={Logo} style={style.image} />
      <View style={{alignItems: "center"}}>
        <Text style={style.title}>GooDrink</Text>
        <Text style={style.title}>Distribuidora</Text>
      </View>
      <View style={style.texts}>
        <MyButton text="Login" onPress={() => navigation.navigate("SignIn")} style={{flex: 1}}/>
        <MyButton text="Cadastro" onPress={() => navigation.navigate("SignUp")} style={{flex: 1}}/>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#000000",
    padding: 20,
  },
  image: {
    height: "100%",
    height: 215,
    marginBottom: -40,
  },
  texts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 26,
  },
  title: {
    fontSize: 50,
    fontWeight: "900",
    width: "100%",
    color: "#E0B201",
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "400",
    color: "#000000",
    marginTop: 16,
  },
});
