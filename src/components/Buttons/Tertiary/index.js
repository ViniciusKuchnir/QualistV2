import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const TertiaryButton = ({text, children, onPress, styleButton}) => {
  return (
    <View style={styleButton}>
        <TouchableOpacity style={styles.content} activeOpacity={0.8} onPress={onPress} >
        {
            text ? <Text style={styles.text}>{text}</Text> : null 
        }
      <Text style={styles.label}>{children}</Text>
    </TouchableOpacity>
    </View>
  )
}

export default TertiaryButton

const styles = StyleSheet.create({
    content:{
        display: 'flex',
        flexDirection: 'row',
    },
    text:{
        fontSize: 16,
        marginRight: 4,
        fontWeight: 'bold'
    },
    label:{
        color: '#299740',
        fontSize: 16,
        fontWeight: 'bold',
    }

})