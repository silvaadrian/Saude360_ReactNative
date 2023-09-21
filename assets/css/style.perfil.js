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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  divEstilo: {
    backgroundColor: "#ccc",
    marginTop: "50%",
    borderRadius: 20,
    padding: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: 200,
  },
  btn: {
    backgroundColor: "#00ADE3",
    textAlign: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: 200,
    color: "white",
  },
});
