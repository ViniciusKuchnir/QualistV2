import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = ({title, subtitle}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    content: {
        marginBottom: 32
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#299740'
    },
    subtitle: {
        letterSpacing: 1,
    }
})