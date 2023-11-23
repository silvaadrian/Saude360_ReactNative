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
import { styles } from "../../assets/css/style.cadastroAtividadesFisica";
import User from "../../assets/images/user.png";
import api from "../../services/Api";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { format } from 'date-fns-tz';



const IntensitySelector = ({ selectedIntensity, onSelectIntensity }) => {
  const intensities = [1, 2, 3, 4, 5];



  return (
    <View style={styles.intensitySelector}>
      <Text>Intensidade:</Text>
      <View style={styles.intensityButtons}>
        {intensities.map((intensity) => (
          <TouchableOpacity
            key={intensity}
            style={[
              styles.intensityButton,
              selectedIntensity === intensity && styles.selectedIntensity,
            ]}
            onPress={() => onSelectIntensity(intensity)}
          >
            <Text style={styles.intensityButtonText}>{intensity}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default (props) => {
  const userData = props.route.params?.userData;
  const [userDados, setUserDados] = useState(null);
  const [tipoExercicio, setTipoExercicio] = useState('');
  const [duracao, setDuracao] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [atividades, setAtividades] = useState(null);

  const recuperar = async () => {
    try {
      const response = await api.get(`/Usuario/Recuperar?id=${userData?.usuarioId}`);
      setUserDados(response.data);

      const responseAtividades = await api.get(`AtividadeFisica/RecuperarTodasAtividadeUsuario?id=${userData?.usuarioId}`);

      if (responseAtividades.status === 200) {
        setAtividades(responseAtividades.data);
      }

    } catch (error) {
      Alert.alert(
        'Falha ao Recuperar Usuário:',
        error.message || 'Erro desconhecido'
      );
    }
  }

  const cadastrar = async (tipoExercicio, duracao, intensidade) => {
    try {
      const hojeDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS", { timeZone: 'America/Sao_Paulo' });

      if (intensidade === '') {
        intensidade = 1;
      }

      const data = {
        id: 0,
        tipoExercicio: tipoExercicio,
        duracao: duracao,
        intensidade: parseInt(intensidade),
        usuarioId: userData?.usuarioId,
        dataCriacao: hojeDate
      };

      const response = await api.post(`/AtividadeFisica/Cadastrar`, data);

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

  const [selectedIntensity, setSelectedIntensity] = useState(1);

  const handleIntensityChange = (intensity) => {
    setSelectedIntensity(intensity);
    setIntensidade(intensity);
  };

  const stylesList = StyleSheet.create({
    conte: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#ffa500',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    title: {
      fontSize: 16,
    },
  });

  const Atividades = ({ item }) => {

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
        <Text style={stylesList.title}>Tipo de Exercício: {item.tipoExercicio}</Text>
        <Text style={stylesList.title}>Duração: {item.duracao}</Text>
        <Text style={stylesList.title}>Intensidade: {item.intensidade > 3 ? "Intenso" : item.intensidade === 3 ? "Moderado" : "Leve"}</Text>
        <Text style={stylesList.title}>Data de Registro: {dataReg}</Text>
      </View>
    );
  };



  return (
    <>
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
              <Text>Tipo de exercício:</Text>
              <TextInput style={styles.textInput}
                value={tipoExercicio}
                onChangeText={(text) => setTipoExercicio(text)}>
              </TextInput>
              <Text>Duração:</Text>
              <TextInput style={styles.textInput}
                value={duracao}
                onChangeText={(text) => setDuracao(text)}>
              </TextInput>
              <IntensitySelector
                selectedIntensity={selectedIntensity}
                onSelectIntensity={handleIntensityChange}
              />
              <View style={styles.divButton}>
                <TouchableOpacity>
                  <Text style={styles.btn_txt} onPress={() => { setLoading(true); cadastrar(tipoExercicio, duracao, intensidade) }}>
                    {loading ? "Carregando..." : "Registrar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={stylesList.conte}>
            <FlatList
              data={atividades}
              renderItem={({ item }) => <Atividades item={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
