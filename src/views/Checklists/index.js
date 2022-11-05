import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import api from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import CardChecklist from "../../components/CardChecklist";

const Checklists = ({ navigation }) => {
  const [checklists, setChecklists] = useState([]);

  function getChecklists(idUser) {
    api.get(`/getChecklists/${idUser}`)
    .then(response =>{
        setChecklists(response.data.checklists);
    })
    .catch(err => console.log(err));
  }

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const dataUser = JSON.parse(user);
      if (user !== null) {
        getChecklists(dataUser.id);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout navigation={navigation}>
      <Title
        title="Checklists"
        subtitle="Veja a lista de todos os seus checklists"
      />
      <FlatList
        data={checklists}
        renderItem={({ item, index }) => (
          <CardChecklist key={item.id} idChecklist={item.id} title={item.nome} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      /> 
    </Layout>
  );
};

export default Checklists;

const styles = StyleSheet.create({});
