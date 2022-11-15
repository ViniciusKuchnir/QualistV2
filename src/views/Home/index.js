import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Layout from '../../components/Layout';
import Actions from '../../components/Actions';

const Home = ({navigation}) => {
  return (
    <Layout navigation={navigation}>
      <Actions navigation={navigation} />
    </Layout>
  )
}

export default Home

const styles = StyleSheet.create({})