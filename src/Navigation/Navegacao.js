import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicial from "../Screens/Inicial";
import Login from "../Screens/Login";
import Cadastro from "../Screens/Cadastro";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TelaInicialUsuario from "../Screens/TelaInicialUsuario";
import Tela2 from "../Screens/Tela2";
import Tela3 from "../Screens/Tela3";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tabs = () => {
  const nav = createBottomTabNavigator();
  return (
    <nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="TelaInicialUsuario"
    >
      <nav.Screen
        name="TelaInicialUsuario"
        component={TelaInicialUsuario}
        options={{
          tabBarLabel: "Desafios",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="flash" color={"#000"} size={size} />
          ),
        }}
      ></nav.Screen>
      <nav.Screen
        name="Tela2"
        component={Tela2}
        options={{
          tabBarLabel: "Notícias",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper-variant"
              color={"#000"}
              size={size}
            />
          ),
        }}
      ></nav.Screen>
      <nav.Screen
        name="Tela3"
        component={Tela3}
        options={{
          tabBarLabel: "Dicas de Saúde",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="head-question"
              color={"#000"}
              size={size}
            />
          ),
        }}
      ></nav.Screen>
    </nav.Navigator>
  );
};

export default () => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="Inicial" component={Inicial}></stack.Screen>
      <stack.Screen name="Login" component={Login}></stack.Screen>
      <stack.Screen name="Cadastro" component={Cadastro}></stack.Screen>
      <stack.Screen name="Tabs" component={Tabs}></stack.Screen>
    </stack.Navigator>
  );
};
