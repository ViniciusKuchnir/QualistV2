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
import moment from 'moment-business-days';

const Justification = ({ route, navigation }) => {
  let { idItem, confirmation } = route.params;
  const [justification, setJustification] = useState('');
  const [errorJustification, setErrorJustification] = useState(null);
  const [deadline, setDeadline] = useState(null);

  function calculateDeadline(deadline){
    return moment().businessAdd(deadline - 1).format('YYYY-MM-DD');
  }

  function getDeadlineItem(){
    api.get(`/deadline/${idItem}`)
    .then((response) => setDeadline(response.data.deadline.classification.prazo))
    .catch((err) => console.log(err));
  }

  function sendNotification() {
    if (justification === '') {setErrorJustification('Informe uma justificativa')}
    if ( justification === ''){
      console.log('Um dos campos não está preenchido');
    }else{
      api.post('/sendEmail', {
        params:{
          idItem: idItem,
          justification: justification,
          confirmation: confirmation,
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
  }

  function cancelSubmit() {
    navigation.goBack();
  }

  useEffect(() => {
    getDeadlineItem();
  }, []);

  return (
    <Layout navigation={navigation}>
      <Title title="Justificativa" subtitle="Justifique a não conformidade" />

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
