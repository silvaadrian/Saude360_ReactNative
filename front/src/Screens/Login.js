import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./../../assets/css/style.login";
import logo_login from "./../../assets/images/logo_tela_login.png";
import btn_voltar from "./../../assets/images/btn_voltar.png";
import api from "../../services/Api";
import { useState } from "react";
import { Alert } from "react-native";

export default (props) => {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [loading, setLoading] = useState(false);

  const autenticar = async (email, senha) => {
    try {
      const data = {
        id: 0,
        nome: "",
        email: email,
        senha: senha,
        dataCriacao: "2023-11-22T03:42:45.892Z"
      };

      const response = await api.post(`/Usuario/Autenticar`, data);

      if (response.status === 200) {
        Alert.alert(
          `Olá, ${response.data.usuarioNome}`,
          response.data.mensagem,
          [{
            text: 'OK',
            onPress: () => props.navigation.navigate('TelaInicialUsuario', { userData: response.data }),
          },
          ]
        );
      }
    } catch (error) {
      if (error.response) {
        if (error.response && error.response.data && error.response.data.errors) {
          const errorDetails = error.response.data.errors;
          const errorMessage = Object.keys(errorDetails)
            .map((field) => `${errorDetails[field].join(', ')}`)
            .join('\n');

          if (errorMessage === 'A senha deve ter pelo menos 8 caracteres') {
            Alert.alert(
              'Falha na Autenticação',
              'E-mail e/ou Senha Inválidos'
            );
          } else {
            Alert.alert(
              'Falha na Autenticação',
              errorMessage,
            );
          }
        } else if (error.response.status === 401) {
          Alert.alert(
            'Falha na Autenticação',
            error.response.data
          );
        }
      } else if (error.request) {
        Alert.alert(
          'Erro na solicitação de autenticação:',
          error.request
        );
      } else {
        Alert.alert(
          'Erro na solicitação de autenticação:',
          error.message
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.linkVoltar}
        onPress={() => props.navigation.navigate("Inicial")}
      >
        <Image style={styles.imageVoltar} source={btn_voltar} />
      </TouchableOpacity>
      <Image source={logo_login} style={styles.image} />
      <View>
        <Text>E-mail:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <Text>Senha:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry
        ></TextInput>
        <View style={styles.linkRegistreSe}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Cadastro")}
          >
            <Text style={styles.textLink}>Registre-se</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => { autenticar(email, senha); setLoading(true); }} disabled={loading}>
          <Text style={styles.btn}>{loading ? "Carregando..." : "Entrar"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
