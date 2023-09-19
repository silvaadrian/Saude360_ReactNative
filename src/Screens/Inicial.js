import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./../../assets/css/style.inicial";
import logo_inicial from "./../../assets/images/logo_tela_inicial.png";

export default (props) => {
  return (
    <View style={styles.container}>
      <Image source={logo_inicial} style={styles.image} />
      <TouchableOpacity
        style={styles.buttonText}
        onPress={() => props.navigation.navigate("Login")}
      >
        <Text style={styles.btn}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
};
