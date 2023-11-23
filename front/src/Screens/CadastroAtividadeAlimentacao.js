import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { styles } from "../../assets/css/style.cadastroAtividadesAlimentacao";
import User from "../../assets/images/user.png";
import api from "../../services/Api";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { format } from 'date-fns-tz';

export default (props) => {
  const userData = props.route.params?.userData;
  const [userDados, setUserDados] = useState(null);
  const [refeicao, setRefeicao] = useState('');
  const [alimentosConsumidos, setAlimentosConsumidos] = useState('');
  const [loading, setLoading] = useState(false);
  const [alimentacoes, setAlimentacoes] = useState(null);

  const cadastrar = async (refeicao, alimentosConsumidos) => {
    try {
      const hojeDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS", { timeZone: 'America/Sao_Paulo' });

      const data = {
        id: 0,
        refeicao: refeicao,
        alimentosConsumidos: alimentosConsumidos,
        usuarioId: userData?.usuarioId,
        dataCriacao: hojeDate
      };

      const response = await api.post(`/Alimentacao/Cadastrar`, data);

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

  const recuperar = async () => {
    try {
      const response = await api.get(`/Usuario/Recuperar?id=${userData?.usuarioId}`);
      setUserDados(response.data);

      const responseAlimentacoes = await api.get(`Alimentacao/RecuperarTodasAlimentacaoUsuario?id=${userData?.usuarioId}`);

      if (responseAlimentacoes.status === 200) {
        setAlimentacoes(responseAlimentacoes.data);
      }

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

  const stylesList = StyleSheet.create({
    conte: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#00f400',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    title: {
      fontSize: 16,
    },
  });

  const Alimentacoes = ({ item }) => {

    const formatarData = (data) => {
      const dataObj = new Date(data);
      const dia = String(dataObj.getDate()).padStart(2, '0');
      const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
      const ano = dataObj.getFullYear();
      const horas = String(dataObj.getHours()).padStart(2, '0');
      const minutos = String(dataObj.getMinutes()).padStart(2, '0');
      const segundos = String(dataObj.getSeconds()).padStart(2, '0');

      return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
    };

    const dataReg = formatarData(item.dataCriacao);

    return (
      <View style={stylesList.item}>
        <Text style={stylesList.title}>Refeição: {item.refeicao}</Text>
        <Text style={stylesList.title}>Alimentos Consumidos: {item.alimentosConsumidos}</Text>
        <Text style={stylesList.title}>Data de Registro: {dataReg}</Text>
      </View>
    );
  };


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
            <Text>Refeição(Ex: “Café da Manhã”):</Text>
            <TextInput style={styles.textInput}
              value={refeicao}
              onChangeText={(text) => setRefeicao(text)}
            >
            </TextInput>
            <Text>Alimentos consumido(Ex:”Arroz”):</Text>
            <TextInput style={styles.textInput} multiline={true}
              value={alimentosConsumidos}
              onChangeText={(text) => setAlimentosConsumidos(text)}
            >
            </TextInput>
            <View style={styles.divButton}>
              <TouchableOpacity>
                <Text style={styles.btn_txt} onPress={() => { setLoading(true); cadastrar(refeicao, alimentosConsumidos) }}>
                  {loading ? "Carregando..." : "Registrar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={stylesList.conte}>
          <FlatList
            data={alimentacoes}
            renderItem={({ item }) => <Alimentacoes item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
};
