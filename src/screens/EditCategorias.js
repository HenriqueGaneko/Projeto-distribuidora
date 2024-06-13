import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, StatusBar } from "react-native";
import NavBarHeader from "../components/NavBarHeader/NavBarHeader";
import { useState, useEffect } from "react";
import { api } from '../services/api'
import MyButton from "../components/MyButton";
import {
    MaterialCommunityIcons,
  } from "@expo/vector-icons";

const EditCategorias = ({ route }) => {
    const { id } = route.params;
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState("");
    async function handleSubmit() {
        setError("");
        if (!categoria.trim()) {
            setError("Por favor, preencha o campo nome!");
            return;
        }
        try {
            await api.patch(`categories/${id}`, {
                name: categoria,
            });
                Alert.alert("Sucesso", "Categoria atualizada com sucesso!");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Não foi possível se conectar com o servidor");
            }
        }
    }
    return (
        <View>
            <StatusBar backgroundColor="#000000" barStyle="light-content" />
            <NavBarHeader />
            <View style={{ justifyContent: "center", alignItems: "center", padding: 40 }}>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>Renomeie sua categoria</Text>
            </View>
            <View style={{ justifyContent: "space-between", height: "75%", padding: 20 }}>
                <View>
                    <View style={style.inputBox}>
                        <MaterialCommunityIcons name="pencil" size={28} color="#000000" />
                        <TextInput
                            style={style.input}
                            placeholder="Nome da categoria"
                            placeholderTextColor="#8a8787"
                            value={categoria}
                            onChangeText={(text) => setCategoria(text)}
                        />
                    </View>
                    {error && <Text>{error}</Text>}
                </View>
                <MyButton
                    onPress={() => handleSubmit()}
                    text="Salvar categoria"
                    style={{ width: "100%" }}
                    backgroundColor="#E0B201"
                    color="#FFF"
                />
                
            </View>
        </View>
    )
}
export default EditCategorias;


const style = StyleSheet.create({
    cabecalho: {
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#000000",
        padding: 16,
        width: "100%",
        height: 180,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15
    },
    image: {
        height: 128,
        width: 124
    },
    input: {
        fontSize: 18,
    },
    inputBox: {
        backgroundColor: "#D9D9D9",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        padding: 16,
        borderRadius: 4,
        width: "100%",
    },
    addProduct: {
        padding: 10,
    },
});
