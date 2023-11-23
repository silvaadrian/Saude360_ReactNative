import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicial from "../Screens/Inicial";
import Login from "../Screens/Login";
import Cadastro from "../Screens/Cadastro";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TelaInicialUsuario from "../Screens/TelaInicialUsuario";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Perfil from "../Screens/Perfil";
import Desafio from "../Screens/Desafio";
import DicasSaude from "../Screens/DicasSaude";
import CadastroAtividades from "../Screens/CadastroAtividades";
import CadastroAtividadesFisica from "../Screens/CadastroAtividadesFisica";
import CadastroAtividadeAlimentacao from "../Screens/CadastroAtividadeAlimentacao";
import CadastroAtividadeEmocao from "../Screens/CadastroAtividadeEmocao";
import NoticiasSaudePublica from "../Screens/NoticiasSaudePublica";
import api from "../../services/Api";
import { useEffect, useState } from "react";

const Tabs = (props) => {
  const nav = createBottomTabNavigator();
  const userData = props.route.params?.userData;
  const [userDados, setUserDados] = useState(null);

  const recuperar = async () => {
    try {
      const response = await api.get(`/Usuario/Recuperar?id=${userData?.usuarioId}`);
      setUserDados(response.data);
    } catch (error) {
      Alert.alert(
        'Falha ao Recuperar Usuário:',
        error.message || 'Erro desconhecido'
      );
    }
  }

  useEffect(() => {
    const onFocusListener = props.navigation.addListener('focus', () => {
      recuperar();
    });

    return () => {
      onFocusListener();
    };
  }, [props.navigation, userData?.usuarioId]);

  return (
    <nav.Navigator
      screenOptions={{
        activeTintColor: "#000",
        activeBackgroundColor: "#000",
        inactiveBackgroundColor: "#000",
        inactiveTintColor: "#000",
        headerShown: false,
        labelStyle: {
          fontSize: 40,
        },
      }}
      initialRouteName={TelaInicialUsuario}
    >
      <nav.Screen
        name="TelaInicialUsuario"
        component={TelaInicialUsuario}
        initialParams={{ userData }}
        options={{
          tabBarLabel: "Ínicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      ></nav.Screen>
      <nav.Screen
        name="Desafios"
        component={Desafio}
        initialParams={{ userData }}
        options={{
          tabBarLabel: "Incentivos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="flash" color={color} size={size} />
          ),
        }}
      ></nav.Screen>
      <nav.Screen
        name="DicasSaude"
        component={DicasSaude}
        options={{
          tabBarLabel: "Dicas de Saúde",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="head-question"
              color={color}
              size={size}
            />
          ),
        }}
      ></nav.Screen>
      <nav.Screen
        name="Perfil"
        component={Perfil}
        initialParams={{ userDados: userData }}
        options={{
          tabBarLabel: "Meu Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-edit"
              color={color}
              size={size}
            />
          ),
        }}
      ></nav.Screen>
      <nav.Screen
        name="NoticiasSaudePublica"
        component={NoticiasSaudePublica}
        options={{
          tabBarLabel: "Noticias",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="new-box"
              color={color}
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
      <stack.Screen name="Perfil" component={Perfil}></stack.Screen>
      <stack.Screen name="Desafio" component={Desafio}></stack.Screen>
      <stack.Screen name="TelaInicialUsuario" component={Tabs}></stack.Screen>
      <stack.Screen
        name="CadastroAtividadeAlimentacao"
        component={CadastroAtividadeAlimentacao}
      ></stack.Screen>
      <stack.Screen
        name="CadastroAtividadeEmocao"
        component={CadastroAtividadeEmocao}
      ></stack.Screen>
      <stack.Screen
        name="CadastroAtividades"
        component={CadastroAtividades}
      ></stack.Screen>
      <stack.Screen
        name="CadastroAtividadesFisica"
        component={CadastroAtividadesFisica}
      ></stack.Screen>
      <stack.Screen name="Tabs" component={Tabs}></stack.Screen>
      <stack.Screen
        name="NoticiasSaudePublica"
        component={NoticiasSaudePublica}
      ></stack.Screen>
    </stack.Navigator>
  );
};
