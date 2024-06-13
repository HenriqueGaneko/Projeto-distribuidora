import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
  } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { api } from '../../services/api';

export default function CategoriaItem({data, updateCategories}) {
  const navigation = useNavigation();
  const deleteItem = async () => {
    try {
        await api.delete(`categories/${data.id}`);
        Alert.alert("Sucesso!", "Categoria excluída com sucesso!");
        updateCategories();
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
    }
};
  return (
    <View style={styles.itemCategoria}>
        <Text style={{fontWeight: "500", fontSize: 18}}>{data.name}</Text>
        <View style={styles.buttonsCategoria}>
            <TouchableOpacity onPress={() => navigation.navigate("EditCategorias", { id: data.id })}>
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
    height: 70,
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
