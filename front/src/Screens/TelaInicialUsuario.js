import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { styles } from "../../assets/css/style.telaInicialUsuario";
import User from "../../assets/images/user.png";
import New from "../../assets/images/btn_novo_rastreamento.png";
import Intensidade from "../../assets/images/icon_rel_intensidade.png";
import Duracao from "../../assets/images/icon_rel_duracao.png";
import Refeicao from "../../assets/images/icon_rel_refeicao.png";
import Calorias from "../../assets/images/icon_rel_calorias.png";
import EstadoEmocinalPerc from "../../assets/images/icon_rel_perc_emocional.png";
import EstadoEmocinal from "../../assets/images/icon_rel_est_emocional.png";
import api from "../../services/Api";

export default (props) => {
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
    <ScrollView>
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => props.navigation.navigate("TelaInicialUsuario", { userDados })}>
            <Text style={styles.text}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("Perfil", { userDados })}>
            <Image source={User} />
          </TouchableOpacity>
        </View>
        <View style={styles.container_conteudo}>
          <Text style={styles.text}>Rastreamento Diário</Text>
        </View>
        <View style={styles.container_conteudo_geral}>
          <Text style={styles.text_subtitulo}>Olá! {userDados?.usuarioNome}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CadastroAtividades", { userDados })}
          >
            <Image source={New} />
          </TouchableOpacity>
        </View>
        <View style={styles.container_conteudo_geral}>
          <Text style={styles.text}>Últimos Rastreios:</Text>
        </View>
        <View style={styles.container_conteudo_titulo_card_1}>
          <Text style={styles.text_subtitulo}>Atividade Física</Text>
        </View>
        <View style={styles.container_card}>
          <View style={styles.card_1}>
            <Text style={styles.text_card}>
              Intensidade
              <Image style={styles.image_cards} source={Intensidade} />
            </Text>
            <Text style={styles.text_subtitulo}>Intenso</Text>
          </View>
          <View style={styles.card_2}>
            <Text style={styles.text_card}>
              Duração <Image style={styles.image_cards} source={Duracao} />
            </Text>
            <Text style={styles.text_subtitulo}>2h</Text>
          </View>
        </View>
        <View style={styles.container_conteudo_titulo_card_2}>
          <Text style={styles.text_subtitulo}>Alimentação</Text>
        </View>
        <View style={styles.container_card}>
          <View style={styles.card_3}>
            <Text style={styles.text_card}>
              Refeição
              <Image style={styles.image_cards} source={Refeicao} />
            </Text>
            <Text style={styles.text_subtitulo}>Almoço</Text>
          </View>
          <View style={styles.card_4}>
            <Text style={styles.text_card}>
              Calorias <Image style={styles.image_cards} source={Calorias} />
            </Text>
            <Text style={styles.text_subtitulo}>1200kcal</Text>
          </View>
        </View>
        <View style={styles.container_conteudo_titulo_card_3}>
          <Text style={styles.text_subtitulo}>Emoções</Text>
        </View>
        <View style={styles.container_card}>
          <View style={styles.card_5}>
            <Text style={styles.text_card}>
              Estado Emocional
              <Image style={styles.image_cards} source={EstadoEmocinal} />
            </Text>
            <Text style={styles.text_subtitulo}>Tranquilo</Text>
          </View>
          <View style={styles.card_6}>
            <Text style={styles.text_card}>
              % do emocional{" "}
              <Image style={styles.image_cards} source={EstadoEmocinalPerc} />
            </Text>
            <Text style={styles.text_subtitulo}>80%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
