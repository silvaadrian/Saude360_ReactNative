import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { styles } from "../../assets/css/style.cadastroAtividadesFisica";
import User from "../../assets/images/user.png";

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
  const [selectedIntensity, setSelectedIntensity] = useState(1);

  const handleIntensityChange = (intensity) => {
    setSelectedIntensity(intensity);
  };
  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>UserName</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Perfil")}>
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
              props.navigation.navigate("CadastroAtividadesFisica")
            }
          >
            <View style={styles.container_conteudo_titulo_card1}>
              <Text style={styles.text_subtitulo}>Atividade Física</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("CadastroAtividadeAlimentacao")
            }
          >
            <View style={styles.container_conteudo_titulo_card2}>
              <Text style={styles.text_subtitulo}>Alimentação</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CadastroAtividadeEmocao")}
          >
            <View style={styles.container_conteudo_titulo_card3}>
              <Text style={styles.text_subtitulo}>Emoções</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.img_fundo}>
          <View style={styles.divEstilo}>
            <Text>Tipo de exercício:</Text>
            <TextInput style={styles.textInput}></TextInput>
            <Text>Duração:</Text>
            <TextInput style={styles.textInput}></TextInput>
            <IntensitySelector
              selectedIntensity={selectedIntensity}
              onSelectIntensity={handleIntensityChange}
            />
            <View style={styles.divButton}>
              <TouchableOpacity>
                <Text style={styles.btn_txt}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
