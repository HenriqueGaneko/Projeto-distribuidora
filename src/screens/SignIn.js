import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/useAuth";
import Logo from "../assets/logoNova.png";


export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();


  async function handleSubmit() {
    try {
      setError("");
      await signIn({ email, password });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Falha no login. Verifique suas credenciais.");
      }
    }
  }


  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={32} color="#8a8787" marginLeft={-190} />
      </TouchableOpacity>
      <Image source={Logo} style={style.image} />
      <View>
        <Text style={style.title}>GooDrink</Text>
        <Text style={style.subtitle}>Distribuidora</Text>
      </View>
      <View style={{ gap: 16 }}>
        <View style={style.inputBox}>
          <Feather name="mail" size={24} color="#8a8787" />
          <TextInput
            style={style.input}
            placeholder="Digite aqui o email"
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
            placeholder="Digite aqui a senha"
            placeholderTextColor="#8a8787"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {error && <Text>{error}</Text>}
        <MyButton
          onPress={handleSubmit}
          text="Login"
          style={{ width: "100%", marginLeft: 150, marginTop: 20 }}
        />
      </View>
    </View>
  );
}


const style = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    color: "#E0B201",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 26,
  },


  title: {
    fontSize: 50,
    fontWeight: "700",
    width: 240,
    color: "#E0B201",
    marginLeft: 55,
  },


  subtitle: {
    fontSize: 40,
    fontWeight: "700",
    width: 280,
    marginTop: 2,
    marginLeft: 55,
    color: "#E0B201",
  },


  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0B201",
    backgroundColor: "#3E3216",
    borderRadius: 4,
    width: "100%",
  },


  input: {
    flex: 1,
    fontSize: 18,
    placeholder: "#E0B201",
    color: "#ffffff",
  },

  erro: {
    color: "#DC1637",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 16,
  },
});
