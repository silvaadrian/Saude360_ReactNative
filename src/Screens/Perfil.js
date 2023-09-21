import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import Logo_saude from "../../assets/images/saude360_logo.png";
import { styles } from './../../assets/css/style.perfil';

export default (props) => {
  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>Meu Perfil</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("")}>
            <Image source={Logo_saude} />
          </TouchableOpacity>
        </View>
        <View style={styles.container_conteudo}>
          <View style={styles.divEstilo}>
            <Text>Nome:</Text>
            <TextInput style={styles.textInput} placeholder=""></TextInput>
            <Text>E-mail:</Text>
            <TextInput
              style={styles.textInput}
              placeholder=""
              secureTextEntry
            ></TextInput>
            <TouchableOpacity onPress={() => props.navigation.navigate("")}>
              <Text style={styles.btn}>Alterar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
