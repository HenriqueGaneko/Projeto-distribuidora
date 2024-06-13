import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert, Image
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { Ionicons } from '@expo/vector-icons';


export default function Categorias() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    if (!name.trim()) {
      setError("Por favor, preencha todos os campos!");
      return;
    }
    try {
      await api.post("categories", {
        name: name,
      });
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
      setName('')
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Não foi possível se conectar com o servidor");
      }
    }
  }


  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={32} color="#8a8787" marginLeft={-190}/>
      </TouchableOpacity>
      <View>
        <Text style={style.title}>Cadastrar categoria</Text>
      </View>
      <Ionicons name="beer" size={100} color="#E0B201" />
      <View style={{ gap: 16 }}>
        <View style={style.inputBox}>
          <Feather name="user" size={24} color="#8a8787" />
          
          <TextInput
            style={style.input}
            placeholder="Digite o nome da categoria "
            placeholderTextColor="#8a8787"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        {error && <Text style={style.erro}>{error}</Text>}
        <MyButton
          onPress={() => handleSubmit()}
          text="Confirmar"
          style={{ width: "100%", marginLeft:150, marginTop:20}}
        />
      </View>
    </View>
  );
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#000000",
  },

  title: {
    marginTop: -50,
    fontSize: 40,
    fontWeight: "400",
    width: 400,
    color: "#E0B201",
   textAlign:"center",
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "300",
    width: 280,
    marginTop: 16,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0B201",
    borderRadius: 4,
    width: "100%",
    backgroundColor:"#3E3216",
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: "#ffffff",
  },
  erro: {
    color: "#DC1637",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 16,
  },
});
