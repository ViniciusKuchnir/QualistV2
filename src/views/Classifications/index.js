import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import api from '../../services/api';
import Layout from '../../components/Layout';
import Title from '../../components/Title';
import CardClassification from '../../components/CardClassification';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Classifications = ({navigation}) => {
    const [classifications, setClassifications] = useState([]);

    function getClassifications(idCompany){
        api.get(`/classifications/${idCompany}`)
        .then((response) => setClassifications(response.data.classifications))
        .catch((error) => console.log(error))
    }

    const getData = async () => {
        try {
          const user = await AsyncStorage.getItem("user");
          const dataUser = JSON.parse(user);
          if (user !== null) {
            getClassifications(dataUser.id);
          }
        } catch (e) {
          console.log(e.message);
        }
      };

      useEffect(() => {
        getData();
      },[])



  return (
    <Layout navigation={navigation}>
      <Title 
        title='Classificações'
        subtitle='Veja aqui as classificações dos seus itens.'
      />
      <FlatList
        data={classifications}
        renderItem={({ item, index }) => (
            <CardClassification 
                description={item.descricao}
                deadline={item.prazo} 
            />
        )}
        keyExtractor={(item) => item.id}
      />
      
    </Layout>
  )
}

export default Classifications

const styles = StyleSheet.create({})