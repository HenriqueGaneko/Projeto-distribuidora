import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import addProduto from "../screens/addProduto";
import Profile from "../screens/Profile";
import Categorias from "../screens/categorias";
import cadastroCategoria from "../screens/cadastroCategorias";
import EditCategorias from "../screens/EditCategorias.js";
import EditProduto from "../screens/EditProduto.js";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function ProductStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="addProduto" component={addProduto} />
      <Stack.Screen name="EditProduto" component={EditProduto} />
    </Stack.Navigator>
  )
}

function CategoriaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categorias" component={Categorias} />
      <Stack.Screen name="cadastroCategoria" component={cadastroCategoria} />
      <Stack.Screen name="EditCategorias" component={EditCategorias} />
    </Stack.Navigator>
  )
}
export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveBackgroundColor:"#E0B201",
        tabBarActiveBackgroundColor:"#E0B201",
        tabBarActiveTintColor: "#AC1A1A",
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tab.Screen
        name="ProductStack"
        component={ProductStack}
        options={{
          title: "ProductStack",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CategoriaStack"
        component={CategoriaStack}
        options={{
          title: "CategoriaStack",
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={38} color={color} />
             ),
            }}
          />
      <Tab.Screen
        name="tags"
        component={Profile}
        options={{
          title: "profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

 
