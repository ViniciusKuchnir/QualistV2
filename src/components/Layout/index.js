import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

const Layout = ({children, navigation}) => {
  return (
    <View style={styles.container}>
        <StatusBar style='dark' />
        {navigation ? 
        <TouchableOpacity style={styles.iconBack} activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#198754" />
        </TouchableOpacity> 
        : 
        null
        }
        {children}
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: '100%',
        padding: 16,
        paddingTop: 64,
        backgroundColor : '#FFF'
    },
    iconBack:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 16
    }
})