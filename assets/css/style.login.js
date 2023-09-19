import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: 200,
  },
  textLink: {
    marginTop: "auto",
    marginBottom: 10,
  },
  linkRegistreSe: {
    alignItems: "flex-end",
  },
  linkVoltar: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageVoltar: {
    alignSelf: "flex-start",
    marginRight: 150,
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
