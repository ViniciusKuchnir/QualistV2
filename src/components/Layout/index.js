import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';


const Layout = ({children, navigation}) => {
  return (
    <View style={styles.container}>
        <StatusBar style='dark' />
        <Toast/>
        {navigation ? 
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialIcons name="menu" size={28} color="#299740" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="bell" size={28} color="#299740" />
          </TouchableOpacity>
        </View>
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
    head:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20
    }
})