import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Alert } from "react-native";
import NavBarHeader from "../components/NavBarHeader/NavBarHeader";
import { Picker } from "@react-native-picker/picker"
import { useState, useEffect } from "react";
import { api } from '../services/api'
import MyButton from "../components/MyButton";
import {
    MaterialCommunityIcons,
    Fontisto
} from "@expo/vector-icons";

const EditProdutos = ({ route }) => {
    const { id } = route.params;
    const [produtoNome, setProdutoNome] = useState("");
    const [produtoCategoria, setProdutoCategoria] = useState("");
    const [produtoQuantidade, setProdutoQuantidade] = useState("");
    const [produtoPreco, setProdutoPreco] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategories();
        fetchProdutos();
    }, []);

    async function fetchCategories() {
        try {
            const response = await api.get('categories');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }
    async function fetchProdutos() {
        try {
            const response = await api.get(`products/${id}`);
            setProdutoNome(response.data.name);
            setProdutoQuantidade(String(response.data.amount));
            setProdutoPreco(String(response.data.value));
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }
    async function handleSubmit() {
        setError("");
        if (!produtoNome.trim() || !produtoQuantidade.trim() || !produtoPreco.trim()) {
            setError("Por favor, preencha todos os campos!");
            return;
        }
        if (produtoCategoria == []) {
            setError("Por favor, preencha o campo categoria!");
            return;
        }
        try {
            await api.patch(`products/${id}`, {
                name: produtoNome,
                amount: Number(produtoQuantidade),
                value: Number(produtoPreco),
                categoryId: Number(produtoCategoria)
            });
            Alert.alert("Sucesso", "Produto atualizado com sucesso!");
            setProdutoNome("");
            setProdutoQuantidade("");
            setProdutoPreco("");
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
                <Text style={{ fontSize: 18, fontWeight: 600 }}>Edite seu produto</Text>
            </View>
            <View style={{ justifyContent: "space-between", height: "75%", padding: 20 }}>
                <View style={{ gap: 15 }}>
                    <View style={style.inputBox}>
                        <MaterialCommunityIcons name="pencil" size={28} color="#000" />
                        <TextInput
                            style={style.input}
                            placeholder="Nome do produto"
                            placeholderTextColor="#8a8787"
                            value={produtoNome}
                            onChangeText={(text) => setProdutoNome(text)}
                        />
                    </View>
                    <View style={style.inputBox}>
                        <MaterialCommunityIcons name="toolbox" size={28} color="#000" />
                        <TextInput
                            style={style.input}
                            placeholder="Quantidade"
                            placeholderTextColor="#8a8787"
                            value={produtoQuantidade}
                            onChangeText={(text) => setProdutoQuantidade(text)}
                        />
                    </View>
                    <View style={style.inputBox}>
                        <Fontisto name="dollar" size={28} color="#000" />
                        <TextInput
                            style={style.input}
                            placeholder="Preço"
                            placeholderTextColor="#8a8787"
                            value={produtoPreco}
                            onChangeText={(text) => setProdutoPreco(text)}
                        />
                    </View>
                    <View style={style.inputPicker}>
                        <MaterialCommunityIcons name="shopping-outline" size={28} color="#000" />
                        <Picker style={style.picker} selectedValue={produtoCategoria} onValueChange={(itemValue) => setProdutoCategoria(itemValue)} >
                            <Picker.Item label="Selecione uma categoria" value="" />
                            {categorias.map((categoria, index) => (
                                <Picker.Item key={index} label={categoria.name} value={categoria.id} />
                            ))}
                        </Picker>
                    </View>
                    {error && <Text>{error}</Text>}
                </View>
                <TouchableOpacity style={{backgroundColor:"#E0B201", padding: 24, alignItems:'center', borderRadius: 12, justifyContent: 'center'}} onPress={() => handleSubmit()}>
                    <Text>
                        Adicionar produto
                    </Text>
                </TouchableOpacity>
                {/* <MyButton

                    text="Adicionar produto"
                    style={{ width: "100%" }}
                    backgroundColor="#E0B201"
                /> */}

            </View>
        </View>
    )
}
export default EditProdutos;

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
    picker: {
        width: "95%"
    },
    inputPicker: {
        backgroundColor: "#D9D9D9",
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 4,
        width: "100%",
    }
});
