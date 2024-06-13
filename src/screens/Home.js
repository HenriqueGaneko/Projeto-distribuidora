import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, StatusBar, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import Logo from "../assets/logoNova.png";
import { api } from '../services/api'
import ProdutoItem from "../components/ProdutoItem/index";
import { Picker } from '@react-native-picker/picker';

export default function Home() {
    const navigation = useNavigation();
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    useEffect(() => {
      fetchProdutos();
      fetchCategorias();
  }, []);

  useFocusEffect(
      React.useCallback(() => {
        fetchProdutos(); 
      }, [])
  );

  async function fetchProdutos() {
      try {
          const response = await api.get('products');
          setProdutos(response.data);
      } catch (error) {
          console.error('Erro ao buscar produtos:', error);
      }
  }
  async function fetchCategorias() {
    try {
        const response = await api.get('categories');
        setCategorias(response.data);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    }
}

  const filteredProdutos = produtos.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory ? item.categoryId === selectedCategory : true;
    return matchesQuery && matchesCategory;
});

    return (
        <ScrollView>
          <StatusBar backgroundColor="#000000" barStyle="light-content" />
            <View style={style.cabecalho}>
                <Image source={Logo} style={style.image}/>
                <Text style={style.title}>
                    GooDrink
                </Text>
                <View style={style.inputBox}>
                    <FontAwesome name="search" size={24} color="black" />
                    <TextInput
                      style={style.input}
                      placeholder="Digite o nome do produto"
                      placeholderTextColor="#000000"
                      value={query}
                      onChangeText={(text) => setQuery(text)}
                    />
                </View>
                <Picker
                    selectedValue={selectedCategory}
                    style={style.inputBox}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                    <Picker.Item label="Todas as categorias" value="" />
                    {categorias.map((categoria) => (
                        <Picker.Item key={categoria.id} label={categoria.name} value={categoria.id} />
                    ))}
                </Picker>
            </View>
            <View style={style.addProduct}>
              <TouchableOpacity onPress={() => navigation.navigate("addProduto")}>
                <Text style={{ fontSize: 18, fontWeight: 600}}>Adicionar produto +</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding: 10, gap: 10}}>
            {filteredProdutos.map((produtos, index) => (
              <ProdutoItem data={produtos} key={index} updateProducts={() => fetchProdutos()}/>
            ))}
            </View>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    cabecalho: {
      alignItems: "center",
      justifyContent: "space-evenly",
      backgroundColor: "#000000",
      padding: 16,
      width: "100%",
      height: 290,
      borderBottomEndRadius: 15,
      borderBottomStartRadius: 15
    }, 
    image: {
      marginStart: -300,
      marginTop: -35,
      height: 86,
      width: 80
    },
    input: {
        fontSize: 18,
    },
    title: {
        fontSize:35,
        color: "#E0B201",
        marginTop: -95,
    },
    inputBox: {
      backgroundColor: "#D0A80E",
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      padding: 16,
      borderRadius: 4,
      width: "100%",
    },
    addProduct: {
      padding: 10,
      justifyContent: "center", 
      alignItems: "center",
    },
    picker: {
      height: 50,
      width: '100%',
      color: '#000',
      backgroundColor: '#D0A80E',
      borderRadius: 4,
      marginTop: 10,
  },
  });
  