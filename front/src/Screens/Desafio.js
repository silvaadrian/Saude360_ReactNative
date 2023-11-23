import React, { useEffect, useState } from "react";
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
import api from "../../services/Api";

export default (props) => {
  const userData = props.route.params?.userData;
  const [userDados, setUserDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

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
    <ScrollView>
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>{userDados?.usuarioNome || ''}</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Perfil", { userDados })}>
            <Image source={User} />
          </TouchableOpacity>
        </View>
        <View style={styles.container_conteudo}>
          <View style={styles.container_conteudo_titulo}>
            <Text style={styles.text}>Incentivos</Text>
          </View>
          <View style={styles.divEstilo1}>
            <Text>
              Corra 5km <Image source={Runner} />
            </Text>
          </View>
          <View style={styles.divEstilo2}>
            <Text>
              Caminhe 5km <Image source={TakeAWalk} />
            </Text>
          </View>
          <View style={styles.divEstilo1}>
            <Text>
              Corra 10km <Image source={Runner} />
            </Text>
          </View>
          <View style={styles.divEstilo2}>
            <Text>
              Caminhe 20km <Image source={TakeAWalk} />
            </Text>
          </View>
          <View style={styles.divEstilo1}>
            <Text>
              Corra 20km <Image source={Runner} />
            </Text>
          </View>
          <View style={styles.divEstilo2}>
            <Text>
              Caminhe 30km <Image source={TakeAWalk} />
            </Text>
          </View>
          <View style={styles.divEstilo1}>
            <Text>
              Corra 30km <Image source={Runner} />
            </Text>
          </View>
          <View style={styles.divEstilo2}>
            <Text>
              Caminhe 40km <Image source={TakeAWalk} />
            </Text>
          </View>
          <View style={styles.divEstilo1}>
            <Text>
              Corra 40km <Image source={Runner} />
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
