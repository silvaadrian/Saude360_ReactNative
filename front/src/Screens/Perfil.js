import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import Logo_saude from "../../assets/images/saude360_logo.png";
import { styles } from './../../assets/css/style.perfil';
import api from "../../services/Api";

export default (props) => {
  const userDados = props.route.params?.userDados;
  const [nome, setNome] = useState(userDados?.usuarioNome || '');
  const [email, setEmail] = useState(userDados?.usuarioEmail || '');
  const [senha, setSenha] = useState('');
  const [mostrarCamposSenha, setMostrarCamposSenha] = useState(false);
  const [textoBotao, setTextoBotao] = useState('Alterar');
  const [loading, setLoading] = useState(false);

  const mostrarCampos = () => {
    setMostrarCamposSenha(!mostrarCamposSenha);
    setNome(userDados?.usuarioNome || '');
    setEmail(userDados?.usuarioEmail || '');
    setSenha('');
    setTextoBotao(mostrarCamposSenha ? 'Alterar' : 'Salvar');
  };

  const carregarDadosUsuario = useCallback(() => {
    const userDados = props.route.params?.userDados;
    setNome(userDados?.usuarioNome || '');
    setEmail(userDados?.usuarioEmail || '');
  }, [props.route.params?.userDados]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      carregarDadosUsuario();
    });

    return unsubscribe;
  }, [props.navigation, carregarDadosUsuario]);

  const alterar = async (nome, email, senha) => {
    try {


      let hojeDate = new Date();
      hojeDate = hojeDate.toISOString();

      const data = {
        id: userDados?.usuarioId || '',
        nome: nome,
        email: email,
        senha: senha,
        dataCriacao: hojeDate
      };

      const response = await api.put(`/Usuario/Alterar`, data);

      if (response.status === 200) {
        setEmail(response.data.usuarioEmail);
        setNome(response.data.usuarioNome);
        Alert.alert(
          'Alteração realizada com sucesso',
          '',
          [{
            text: 'OK',
            onPress: () => {
              setSenha('');
              setMostrarCamposSenha(!mostrarCamposSenha);
              setTextoBotao(mostrarCamposSenha ? 'Alterar' : 'Salvar');
              props.navigation.navigate("Perfil", { userDados: response.data });
            },
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
                return `${field}: ${errorMessages}`;
              })
              .join('\n');

            Alert.alert(
              'Falha ao Alterar',
              errorMessage
            );
          }
        }

        if (error.response.status === 500) {
          Alert.alert(
            'Falha ao Alterar',
            error.response.data
          );
        }
      }
    } finally {
      setLoading(false);
    }
  }

  const renderizarBotao = (nome, email, senha) => {
    if (mostrarCamposSenha) {
      return (
        <TouchableOpacity onPress={() => { setLoading(true); alterar(nome, email, senha); }}>
          <Text style={styles.btn}>{loading ? "Carregando..." : "Salvar"}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={mostrarCampos}>
          <Text style={styles.btn}>{textoBotao}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Perfil", { userDados })}>
            <Text style={styles.text} >Meu Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("TelaInicialUsuario", { userData: userDados })}>
            <Image source={Logo_saude} />
          </TouchableOpacity>
        </View>
        <View style={styles.container_conteudo}>
          <View style={styles.divEstilo}>
            <Text>Nome:</Text>
            <TextInput
              value={nome}
              onChangeText={(text) => setNome(text)}
              style={styles.textInput}
              editable={mostrarCamposSenha}>
            </TextInput>
            <Text>E-mail:</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
              editable={mostrarCamposSenha}
            ></TextInput>

            {mostrarCamposSenha && (
              <>
                <Text>Senha:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder=""
                  value={senha}
                  onChangeText={(text) => setSenha(text)}
                  secureTextEntry
                />
              </>
            )}
            {renderizarBotao(nome, email, senha)}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
