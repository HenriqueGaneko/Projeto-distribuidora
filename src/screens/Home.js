import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import gd from "../assets/GD.png";
import banner from "../assets/banner.png";


export default function Home() {

    const { user, signOut } = useAuth();
    const [query, SetQuery] = useState("");
    const navigation = useNavigation();

    return (
        <View style={style.container}>
            <View style={style.cabeçalho}>
               <Image source={gd} style={style.gd} />
            </View>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <Text style={style.title}>GooDrink</Text>
            <TextInput
            style={style.searchInput}
            placeholder="Pesquisar Produtos e Categorias"
            placeholderTextColor="#000000"
            value={query}
            onChangeText={(text) => SetQuery(text)}
            />
             <Image source={banner} style={style.banner} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "#000000",
      alignItems:"flex-end"
    },
    gd :{
        marginStart: -400,
        marginTop: 15,
    },
    banner:{
        height: 236,
        width: 430,
    },
    title: {
        fontSize: 50,
        fontWeight: "bold",
        marginTop: -700,
        marginRight: 80,
        color: "#ffffff",
      },

    searchInput: {
        width:300,
        fontSize: 16,
        backgroundColor:"#E0B201",
        borderRadius: 15,
        padding: 5,
        borderWidth: 1,
        marginTop: -370,
        marginRight: 40,
      },
})