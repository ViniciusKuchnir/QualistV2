import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import api from '../../services/api';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../../components/Layout';
import Title from '../../components/Title';
import CardUnconformities from '../../components/CardUnconformities';

const Unconformities = ({navigation}) => {
  const [unconformities, setUnconformities] = useState([]);

  function getUnconformities(idCompany){
    api.get(`/getUnconformities/${idCompany}`)
    .then(response => {
      console.log(response.data.unconformities[0]);
      setUnconformities(response.data.unconformities)
    })
    .catch(err => {
      Toast.show({
        type: "error",
        text1: "Erro inesperado!",
        text2: "Algo de errado aconteceu!",
      });
    })
  }

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const dataUser = JSON.parse(user);
      if (user !== null) {
        getUnconformities(dataUser.id);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
   getData();
  },[])

  useEffect(() => {},[unconformities])

  return (
    <Layout navigation={navigation}>
      <Title 
        title='Não conformidades'
        subtitle='Veja aqui as não conformidades de sua empresa'
      />
       <SafeAreaView style={styles.container}>
      <FlatList
        data={unconformities}
        renderItem={({ item, index }) => (
          <CardUnconformities 
          key={item.id} 
          description={item.descricao} 
          responsible={item.responsible.nome}
          sector={item.responsible.sector.nome}
          date={item.prazo}
          checklistId={item.checklist.id}
          classification={item.classification.descricao}
          navigation={navigation} 
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    </Layout>
  )
}

export default Unconformities

const styles = StyleSheet.create({
  container:{
    paddingBottom: 150
  }
})