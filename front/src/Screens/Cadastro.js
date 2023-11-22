import { Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "./../../assets/css/style.login";
import logo_login from "./../../assets/images/logo_tela_login.png";
import btn_voltar from "./../../assets/images/btn_voltar.png";
import { useState } from "react";
import api from "../../services/Api";

export default (props) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const cadastrar = async (nome, email, senha) => {
    try {
      let hojeDate = new Date();
      hojeDate = hojeDate.toISOString();

      const data = {
        id: 0,
        nome: nome,
        email: email,
        senha: senha,
        dataCriacao: hojeDate
      };

      const response = await api.post(`/Usuario/Cadastrar`, data);

      if (response.status === 200) {
        Alert.alert(
          'Cadastro realizado com sucesso',
          '',
          [{
            text: 'OK',
            onPress: () => props.navigation.navigate('Login'),
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.linkVoltar}
        onPress={() => props.navigation.navigate("Login")}
      >
        <Image style={styles.imageVoltar} source={btn_voltar} />
      </TouchableOpacity>
      <Image source={logo_login} style={styles.image} />
      <View>
        <Text>Nome:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        ></TextInput>
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
        <TouchableOpacity onPress={() => { setLoading(true); cadastrar(nome, email, senha); }} disabled={loading}>
          <Text style={styles.btn}>{loading ? "Carregando..." : "Cadastrar"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
