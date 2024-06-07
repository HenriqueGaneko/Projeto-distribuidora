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
import Logo from "../assets/logoNova.png";


export default function SignUp() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  async function handleSubmit() {
    setError("");
    if (!email.trim() || !username.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos!");
      return;
    }
    try {
      await api.post("register", {
        email,
        username,
        password,
      });
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
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
      <Image source={Logo} style={style.image} />
      <View>
        <Text style={style.title}>Realize o seu Cadastro</Text>
      </View>
      <View style={{ gap: 16 }}>
        <View style={style.inputBox}>
          <Feather name="user" size={24} color="#8a8787" />
          <TextInput
            style={style.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#8a8787"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={style.inputBox}>
          <Feather name="mail" size={24} color="#8a8787" />
          <TextInput
            style={style.input}
            placeholder="Digite seu email"
            placeholderTextColor="#8a8787"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={style.inputBox}>
          <Feather name="lock" size={24} color="#8a8787" />
          <TextInput
            style={style.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#8a8787"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {error && <Text style={style.erro}>{error}</Text>}
        <MyButton
          onPress={() => handleSubmit()}
          text="Cadastrar"
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
