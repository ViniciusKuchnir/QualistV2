import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import CardResponsible from "../../components/CardResponsible";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Responsibles = ({ navigation }) => {
  const [responsibles, setResponsibles] = useState([]);

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const dataUser = JSON.parse(user);
      if (user !== null) {
        getResponsibles(dataUser.id);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  function getResponsibles(idCompany) {
    api
      .get(`/responsibles/${idCompany}`)
      .then((response) => setResponsibles(response.data.responsibles))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout navigation={navigation}>
      <Title
        title="Responsáveis"
        subtitle="Veja aqui os responsáveis de sua empresa"
      />

      <FlatList
        data={responsibles}
        renderItem={({ item, index }) => (
          <CardResponsible
            name={item.nome}
            email={item.email}
            sector={item.sector.nome}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Layout>
  );
};

export default Responsibles;

const styles = StyleSheet.create({});
