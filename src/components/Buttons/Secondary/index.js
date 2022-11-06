import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const SecondaryButton = ({ children, onPress }) => {
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

export default SecondaryButton;

const styles = StyleSheet.create({
    content: {
        width: "100%",
        height: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#299740",
        borderRadius: 8,
        marginBottom: 16
      },
      text: {
        fontSize: 16,
        color: "#299740",
        fontWeight: "bold",
        textTransform: "capitalize",
        letterSpacing: 1,
      },
});
