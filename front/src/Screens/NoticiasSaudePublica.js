import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import Img1 from "../../assets/images/Noti1.png";
import Img2 from "../../assets/images/Noti2.png";
import Img3 from "../../assets/images/Noti3.png";
import { styles } from "./../../assets/css/style.noticiasSaudePublica";
import LogoSaude from "../../assets/images/saude360_logo.png";

export default (props) => {
  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Perfil")}>
            <Image source={LogoSaude} />
          </TouchableOpacity>
        </View>
        <View style={styles.container_conteudo}>
          <View style={styles.container_conteudo_titulo}>
            <Text style={styles.text}>Notícias - Saúde Pública</Text>
          </View>
          <View style={styles.divEstilo1}>
            <Image source={Img2} />
          </View>
          <View style={styles.divEstilo1}>
            <Image source={Img1} />
          </View>
          <View style={styles.divEstilo1}>
            <Image source={Img3} />
          </View>
          {/* <View style={styles.divEstilo1}>
            <Text>
              Corrida 5km <Image source={Runner} />
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("")}>
              <Text style={styles.btn}>Participar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divEstilo1}>
            <Text>
              Corrida 5km <Image source={Runner} />
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("")}>
              <Text style={styles.btn}>Participar</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};
