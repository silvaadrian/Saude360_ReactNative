import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./../../assets/css/style.login";
import logo_login from "./../../assets/images/logo_tela_login.png";
import btn_voltar from "./../../assets/images/btn_voltar.png";

export default (props) => {
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
        ></TextInput>
        <Text>Senha:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite sua senha"
          secureTextEntry
        ></TextInput>
        <View style={styles.linkRegistreSe}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Cadastro")}
          >
            <Text style={styles.textLink}>Registre-se</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate("Tabs")}>
          <Text style={styles.btn}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
