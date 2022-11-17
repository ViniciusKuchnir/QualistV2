import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

const CardData = ({ label, data, load }) => {
  return (
    <>
      {load === false ? (
        <View style={styles.content}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.data}>
            <Text style={styles.dataText}>{data}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.contentLoad}>
          <LottieView
            autoPlay
            style={styles.loading}
            source={require("../../assets/animations/loading.json")}
          />
        </View>
      )}
    </>
  );
};

export default CardData;

const styles = StyleSheet.create({
  content: {
    width: "47%",
    height: 100,
    backgroundColor: "#299740",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16
  },
  contentLoad:{
    width: "47%",
    height: 100,
    padding: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  data: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dataText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  loading: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
  },
});
