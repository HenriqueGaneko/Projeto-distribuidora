import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Logo from '../assets/logoNova.png';
import CategoriasItem from '../components/CategoriaItem';
import { api } from '../services/api';

export default function Home() {
    const navigation = useNavigation();
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchCategories(); 
        }, [])
    );

    async function fetchCategories() {
        try {
            const response = await api.get('categories');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }

    return (
        <ScrollView>
            <StatusBar backgroundColor="#000000" barStyle="light-content" />
            <View style={style.cabecalho}>
                <Image source={Logo} style={style.image} />
            </View>
            <View style={style.addProduct}>
                <TouchableOpacity onPress={() => navigation.navigate('cadastroCategoria')}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Adicionar categoria +</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 25, gap: 10 }}>
                {categorias.map((categoria, index) => (
                    <CategoriasItem data={categoria} key={index} updateCategories={() => fetchCategories()}/>
                ))}
            </View>
        </ScrollView>
    );
}


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
      marginStart: -300,
      marginTop: -35,
      height: 86,
      width: 80
    },
    input: {
        fontSize: 18,
    },
    inputBox: {
        backgroundColor: "#E0B201",
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
        alignItems: "center"
    },
});
