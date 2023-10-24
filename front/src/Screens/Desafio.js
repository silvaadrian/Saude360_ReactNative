import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import Runner from "../../assets/images/cil_running.png";
import TakeAWalk from "../../assets/images/icon_walk_caminhada_5km.png";
import { styles } from "./../../assets/css/style.desafios";
import User from "../../assets/images/user.png";

export default (props) => {
  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>UserName</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Perfil")}>
            <Image source={User} />
          </TouchableOpacity>
        </View>
        <View style={styles.container_conteudo}>
          <View style={styles.container_conteudo_titulo}>
            <Text style={styles.text}>Desafios</Text>
          </View>
          <View style={styles.divEstilo1}>
            <Text>
              Corrida 5km <Image source={Runner} />
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("")}>
              <Text style={styles.btn}>Participar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divEstilo2}>
            <Text>
              Caminhada 5km <Image source={TakeAWalk} />
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("")}>
              <Text style={styles.btn2}>Participar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divEstilo1}>
            <Text>
              Corrida 10km <Image source={Runner} />
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("")}>
              <Text style={styles.btn}>Participar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divEstilo2}>
            <Text>
              Caminhada 10km <Image source={TakeAWalk} />
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("")}>
              <Text style={styles.btn2}>Participar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
