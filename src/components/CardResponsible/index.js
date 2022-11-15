import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CardResponsible = ({name, email, sector}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.sector}>{sector}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  )
}

export default CardResponsible

const styles = StyleSheet.create({
    content:{
        width: '100%',
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 12,
        elevation: 5,
        marginBottom: 16
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#299740'
    },
    email:{
        letterSpacing: 1,
    },
    sector:{
        fontWeight: 'bold',
        letterSpacing: 1,
    },

})