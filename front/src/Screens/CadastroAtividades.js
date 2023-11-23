import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { styles } from "../../assets/css/style.cadastroAtividades";
import User from "../../assets/images/user.png";
import Logo from "../../assets/images/logo_tela_login.png";
import api from "../../services/Api";

export default (props) => {
  const userDados = props.route.params?.userDados;
  const [userData, setUserData] = useState(null);

  const recuperar = async () => {
    try {
      const response = await api.get(`/Usuario/Recuperar?id=${userDados?.usuarioId}`);
      setUserData(response.data);
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
  }, [props.navigation, userDados?.usuarioId]);

  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>{userData?.usuarioNome || ''}</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Perfil", { userDados })}>
            <Image source={User} />
          </TouchableOpacity>
        </View>
        <View style={styles.container_conteudo}>
          <Text style={styles.text}>Registros:</Text>
          <Text styles={styles.text_subsubtitulo}>
            Clique sobre o desejado...
          </Text>
        </View>
        <View style={styles.container_card}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("CadastroAtividadesFisica", { userData })
            }
          >
            <View style={styles.container_conteudo_titulo_card1}>
              <Text style={styles.text_subtitulo}>Atividade Física</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("CadastroAtividadeAlimentacao", { userData })
            }
          >
            <View style={styles.container_conteudo_titulo_card2}>
              <Text style={styles.text_subtitulo}>Alimentação</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CadastroAtividadeEmocao", { userData })}
          >
            <View style={styles.container_conteudo_titulo_card3}>
              <Text style={styles.text_subtitulo}>Emoções</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.img_fundo}>
          <Image source={Logo} />
        </View>
      </View>
    </ScrollView>
  );
};
