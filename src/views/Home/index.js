import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import api from '../../services/api';
import Layout from "../../components/Layout";
import Actions from "../../components/Actions";
import CardData from '../../components/CardData';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Home = ({ navigation }) => {
  const [numberChecklists, setNumberChecklists] = useState(null);
  const [numberInconformities, setNumberInconformities] = useState(null);
  const [load, setLoad] = useState(false);

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const dataUser = JSON.parse(user);
      if (user !== null) {
        getNumberChecklists(dataUser.id);
        getNumberInconformities(dataUser.id);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  function getNumberChecklists(idUser){
    api.get(`/getChecklists/${idUser}`)
    .then((response) => setNumberChecklists(response.data.checklists.length))
    .catch((e) => console.log(e))
  }

  function getNumberInconformities(idUser){
    api.get(`/getUnconformities/${idUser}`)
    .then((response) => {
      setNumberInconformities(response.data.unconformities.length);
    })
    .catch((e) => console.log(e))
  }
  
  
  useEffect(() => {
    getData();
  }, [])



  return (
    <Layout navigation={navigation}>
      <Actions navigation={navigation} />
      <Text style={styles.overview}>Visão geral</Text>
      <View style={styles.datas}>
        <CardData label='Checklists' data={numberChecklists} load={false}/>
        <CardData label='Inconformidades' data={numberInconformities} load={false}/>
        <CardData label='Inconfomidades/Checklist (média)' data={numberInconformities/numberChecklists} load={false}/>
        <CardData label='Inconformidades/mês (média)' data={(numberInconformities/12).toFixed(2)} load={false}/>
      </View>
      
    </Layout> 
  );
};

export default Home;

const styles = StyleSheet.create({
  overview:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  datas:{
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-between',
  }
});
