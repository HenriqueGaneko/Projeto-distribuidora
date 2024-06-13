import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
  } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { api } from '../../services/api';

export default function ProdutoItem({data, updateProducts}) {
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [data]);
  async function fetchCategories() {
    try {
      const responseData = await api.get('categories');
      const response = responseData.data;
      const category = response.find(a => a.id === data.categoryId);
      if (category) {
        setCategorias(category.name);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }
  const deleteItem = async () => {
    try {
        await api.delete(`products/${data.id}`);
        Alert.alert("Sucesso!", "Produto excluído com sucesso!");
        updateProducts();
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
    }
};

  return (
    <View style={styles.itemCategoria}>
        <View>
          <Text style={{fontWeight: "800", fontSize: 22}}>{data.name}</Text>
          <Text style={{fontWeight: "500", fontSize: 18}}>Quantidade: {data.amount}</Text>
          <Text style={{fontWeight: "500", fontSize: 18}}>Valor: R$ {data.value}</Text>
          <Text style={{fontWeight: "500", fontSize: 18}}>Categoria: {categorias}</Text>
        </View>
        <View style={styles.buttonsCategoria}>
            <TouchableOpacity onPress={() => navigation.navigate("EditProduto", { id: data.id })}>
                <MaterialCommunityIcons name="pencil" size={28} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteItem()}>
                <MaterialCommunityIcons name="trash-can" size={28} color="#000" />
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    alignItems: "center",
    borderRadius: 4,
  },
  itemCategoria:{
    width: "100%",
    height: 140,
    borderWidth: 2,
    borderColor: "#8a8787",
    borderRadius: 4,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonsCategoria:{
    flexDirection: "row"
  }
});
