import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const TextField = ({label, placeholder, value, setValue, error, ...props}) => {
  return (
    <View style={styles.content}>
      <Text style={[styles.label, error ? styles.errorLabel : null]}>{label}</Text>
      <View style={[styles.textField, error ? styles.errorTextField : styles.success]}>
        <TextInput
            style={styles.input} 
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => setValue(text)}
            {...props}

        />
        {error ? <MaterialIcons name="error" size={24} color="#F03637" /> : null}
      </View>
      {error ? <Text style={styles.errorHelpText}>{error}*</Text> : null}
    </View>
  )
}

export default TextField

const styles = StyleSheet.create({
    content:{
        marginBottom: 16
    },
    label:{
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        paddingStart: 16
    },
    textField:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderRadius: 4,
        paddingStart: 16,
        paddingEnd: 12
    },
    input:{
        fontSize: 16,
    },
    errorLabel:{
        color: '#F03637',
    },
    errorTextField:{
        borderWidth: 2,
        borderColor: '#F03637',
    },
    errorHelpText:{
        fontSize: 12,
        paddingStart: 16,
        color: '#F03637',
    }
})