import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const CardChecklist = ({title}) => {
  return (
    <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <MaterialIcons name="arrow-forward-ios" size={24} color='#FFF' />
    </View>
  )
}

export default CardChecklist

const styles = StyleSheet.create({
    content:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#299740',
        marginBottom: 16
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#FFF'
    },
})