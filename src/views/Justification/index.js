import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import TextField from "../../components/Inputs/TextField";
import Toast from "react-native-toast-message";
import Select from "../../components/Inputs/Select";
import PrimaryButton from "../../components/Buttons/Primary";
import SecondaryButton from "../../components/Buttons/Secondary";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Justification = ({ route, navigation }) => {
  let { idItem, confirmation } = route.params;
  const [responsibles, setResponsibles] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [responsible, setResponsible] = useState(null);
  const [errorResponsible, setErrorResponsible] = useState(null);
  const [classification, setClassification] = useState(null);
  const [errorClassification, setErrorClassification] = useState(null);
  const [justification, setJustification] = useState('');
  const [errorJustification, setErrorJustification] = useState(null);

  function sendNotification() {
    if(responsible === null) {setErrorResponsible('Escolha uma opção')}
    if (justification === '') {setErrorJustification('Informe uma justificativa')}
    if (classification === null) {setErrorClassification('Escolha uma opção ')}
    if (responsible === null || justification === '' || classification === null){
      console.log('Um dos campos não está preenchido');
    }else{
      api.post('/sendEmail', {
        params:{
          responsible: responsible,
          classification: classification,
          justification: justification
        }
      })
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Email enviado!",
          text2: "Email enviado com sucesso!",
        });
      })
      .catch(err => {
        Toast.show({
          type: "error",
          text1: "Erro ao enviar email!",
          text2: "Ocorreu um erro ao enviar o email!",
        });
      })
    }
    api.put('/setItem', {
      idItem: idItem,
      confirmation: confirmation,
    })
  }

  const getResponsibles = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const dataUser = await JSON.parse(user);
      if (user !== null) {
        api
          .get(`/responsibles/${dataUser.id}`)
          .then((response) => {
            response.data.responsibles.map((item) => {
              responsibles.push({ label: item.nome, value: item.id });
            });
          })
          .catch((err) => console.log(err));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const getClassifications = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const dataUser = await JSON.parse(user);
      if (user !== null) {
        api
          .get(`/classifications/${dataUser.id}`)
          .then((response) => {
            response.data.classifications.map((item) => {
              classifications.push({ label: item.descricao, value: item.id });
            });
          })
          .catch((err) => console.log(err));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  function cancelSubmit() {
    navigation.goBack();
  }

  useEffect(() => {
    getResponsibles();
    getClassifications();
  }, []);

  return (
    <Layout navigation={navigation}>
      <Title title="Justificativa" subtitle="Justifique a não conformidade" />

      <Select
        label="Responsável"
        placeholder="Selecione um responsável"
        items={responsibles}
        setItems={setResponsibles}
        value={responsible}
        setValue={setResponsible}
        error={responsible === null ? errorResponsible : null}  
      />

      <Select
        label="Classificação"
        placeholder="Selecione uma classificação"
        items={classifications}
        setItems={setClassifications}
        value={classification}
        setValue={setClassification} 
        error={classification === null ? errorClassification : null}
      />

      <TextField
        label="Justificativa"
        placeholder="Ex.: O documento não possui título"
        value={justification}
        setValue={setJustification}
        error={justification === '' ? errorJustification : null}
      />

      <PrimaryButton onPress={sendNotification}>
        Enviar não conformidade
      </PrimaryButton>
      <SecondaryButton onPress={() => cancelSubmit()}>Cancelar</SecondaryButton>
    </Layout>
  );
};

export default Justification;

const styles = StyleSheet.create({});
