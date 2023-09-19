import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicial from "../Screens/Inicial";
import Login from "../Screens/Login";
import Cadastro from "../Screens/Cadastro";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tela1 from "../Screens/Tela1";
import Tela2 from "../Screens/Tela2";
import Tela3 from "../Screens/Tela3";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tabs = () => {
  const nav = createBottomTabNavigator();
  return (
    <nav.Navigator
      screenOptions={{
        activeTintColor: "#FFF",
        activeBackgroundColor: "#000",
        inactiveBackgroundColor: "#FFF",
        inactiveTintColor: "#000",
        headerShown: false,
        labelStyle: {
          fontSize: 30,
        },
      }}
      initialRouteName="Tela1"
    >
      <nav.Screen
        name="Tela1"
        component={Tela1}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      ></nav.Screen>
      <nav.Screen
        name="Tela2"
        component={Tela2}
        options={{
          tabBarLabel: "Tela 2",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-arrow-up-outline"
              color={color}
              size={size}
            />
          ),
        }}
      ></nav.Screen>
      <nav.Screen
        name="Tela3"
        component={Tela3}
        options={{
          tabBarLabel: "Tela 3",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="access-point"
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
      <stack.Screen name="Tabs" component={Tabs}></stack.Screen>
    </stack.Navigator>
  );
};
