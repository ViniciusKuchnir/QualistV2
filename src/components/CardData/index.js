import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CardData = ({ label, data }) => {
  return (
    <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.data}>
            <Text style={styles.dataText}>
            {data}
            </Text>
        </View>
    </View>
  );
};

export default CardData;

const styles = StyleSheet.create({
    content:{
        width: "47%",
        height: 100,
        backgroundColor: '#299740',
        padding: 8,
        borderRadius: 8
    },
    label:{
        color: '#FFF',
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: "center",
    },
    data:{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataText:{
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});
