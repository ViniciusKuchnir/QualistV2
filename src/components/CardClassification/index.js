import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CardClassification = ({description, deadline}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.deadline}>
        <Text style={styles.label}>Prazo: </Text>
        <Text style={styles.data}>{deadline} dias úteis</Text>
      </View>
    </View>
  )
}

export default CardClassification

const styles = StyleSheet.create({
    content:{
        width: '100%',
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 12,
        elevation: 5,
        marginBottom: 16
    },
    description:{
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#299740'
    },
    deadline:{
        display: 'flex',
        flexDirection: 'row',
    },
    label:{
        color: '#299740',
        fontWeight: 'bold',
        letterSpacing: 1,
    }
})