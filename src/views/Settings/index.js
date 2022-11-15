import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Layout from '../../components/Layout';
import Title from '../../components/Title';

const Settings = ({navigation}) => {
  return (
    <Layout navigation={navigation}>
      <Title 
        title='Configurações'
        subtitle='Aqui você pode realizar algumas configurações'
      />
    </Layout>
  )
}

export default Settings

const styles = StyleSheet.create({})