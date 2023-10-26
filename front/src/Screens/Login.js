import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./../../assets/css/style.login";
import logo_login from "./../../assets/images/logo_tela_login.png";
import btn_voltar from "./../../assets/images/btn_voltar.png";
import api from "../../services/Api";
import { useState } from "react";

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
        dataCriacao: ""
      };

      const response = await api.post(`/Usuario/Autenticar`, data);

      console.log(response);
    } catch (error) {
      console.error("Erro na solicitação de autenticação:", error);
    }finally {
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
          onChangeText={(text) => setEmail}
        ></TextInput>
        <Text>Senha:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={(text) => setSenha}
          secureTextEntry
        ></TextInput>
        <View style={styles.linkRegistreSe}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Cadastro")}
          >
            <Text style={styles.textLink}>Registre-se</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={autenticar} disabled={loading}>
          <Text style={styles.btn}>{loading ? "Carregando..." : "Entrar"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
