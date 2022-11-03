import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const PrimaryButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.content}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#299740",
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
