import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { styles } from "../../assets/css/style.cadastroAtividadesEmocao";
import User from "../../assets/images/user.png";
import api from "../../services/Api";

export default (props) => {
  const userData = props.route.params?.userData;
  const [userDados, setUserDados] = useState(null);
  const [estadoEmocional, setEstadoEmocional] = useState('');
  const [sobreEmocoes, setSobreEmocoes] = useState('');
  const [loading, setLoading] = useState(false);

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

  const cadastrar = async (estadoEmocional, sobreEmocoes) => {
    try {
      let hojeDate = new Date();
      hojeDate = hojeDate.toISOString();

      const data = {
        id: 0,
        estado: estadoEmocional,
        sobreEmocoes: sobreEmocoes,
        usuarioId: userData?.usuarioId,
        dataCriacao: hojeDate
      };

      const response = await api.post(`/EstadoEmocional/Cadastrar`, data);

      if (response.status === 200) {
        Alert.alert(
          'Cadastro realizado com sucesso',
          '',
          [{
            text: 'OK',
            onPress: () => props.navigation.navigate('TelaInicialUsuario', { userData }),
          },
          ]
        );
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data && error.response.data.errors) {
            const errorMessage = Object.keys(error.response.data.errors)
              .map(field => {
                const errorMessages = error.response.data.errors[field].join('\n');
                return `${errorMessages}`;
              })
              .join('\n');

            Alert.alert(
              'Falha ao Cadastrar',
              errorMessage
            );
          }
        }

        if (error.response.status === 500) {
          Alert.alert(
            'Falha ao Cadastrar',
            error.response.data
          );
        }
      }
    } finally {
      setLoading(false);
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
          <View style={styles.divEstilo}>
            <Text>Estado emocional:</Text>
            <TextInput style={styles.textInput}
              value={estadoEmocional}
              onChangeText={(text) => setEstadoEmocional(text)}
            >
            </TextInput>
            <Text>Sobre as emoções:</Text>
            <TextInput style={styles.textInput} multiline={true}
              value={sobreEmocoes}
              onChangeText={(text) => setSobreEmocoes(text)}>
            </TextInput>
            <View style={styles.divButton}>
              <TouchableOpacity>
                <Text style={styles.btn_txt} onPress={() => { setLoading(true); cadastrar(estadoEmocional, sobreEmocoes) }}>{loading ? "Carregando..." : "Registrar"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
