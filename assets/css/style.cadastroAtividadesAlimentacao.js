import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#B0E6F6",
    alignItems: "center",
    height: 60,
    borderBottomColor: "#000",
    borderWidth: 1,
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
  },
  container_conteudo: {
    flex: -1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 20,
    paddingLeft: 20,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  container_conteudo_titulo_card1: {
    flex: -1,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  container_conteudo_titulo_card2: {
    flex: -1,
    width: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00ff00",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 10,
  },
  container_conteudo_titulo_card3: {
    flex: -1,
    width: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: 200,
  },
  divEstilo: {
    backgroundColor: "#00ff00",
    borderRadius: 20,
    padding: 20,
  },
  divButton: {
    width: "50%",
    marginLeft: "40%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 10,
  },
  btn_txt: {
    color: "#fff",
  },
  container_card: {
    flex: -1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginRight: 20,
  },
  text_subtitulo: {
    fontSize: 10,
  },
  img_fundo: {
    flex: 1,
    margin: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  intensitySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  intensityButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  intensityButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 5,
  },
  selectedIntensity: {
    backgroundColor: "#b0e6f6", // Cor de fundo para a intensidade selecionada
  },
  intensityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
