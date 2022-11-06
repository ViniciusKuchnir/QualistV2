import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import TextField from "../../components/Inputs/TextField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "../../components/Inputs/Select";
import PrimaryButton from "../../components/Buttons/Primary";
import SecondaryButton from "../../components/Buttons/Secondary";
import AsyncStorage from "@react-native-async-storage/async-storage";

const schema = yup.object({
  justification: yup.string().required("Informe uma justificativa"),
  responsible: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("Selecione um responsável"),
  classification: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("Selecione uma classificação"),
});

const Justification = ({ route, navigation }) => {
  let { idItem } = route.params;
  const [responsibles, setResponsibles] = useState([]);
  const [classifications, setClassifications] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function sendNotification(data) {
    console.log(data.responsible);
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

  function cancelSubmit(){
    navigation.goBack();
  }

  useEffect(() => {
    getResponsibles();
    getClassifications();
  }, []);

  return (
    <Layout navigation={navigation}>
      <Title title="Justificativa" subtitle="Justifique a não conformidade" />
      <Controller
        control={control}
        name="responsible"
        render={({ field: { onChange, value } }) => (
          <Select
            label="Responsável"
            placeholder="Selecione um responsável"
            items={responsibles}
            setItems={setResponsibles}
            value={value}
            setValue={onChange}
            error={errors.responsible && errors.responsible?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="classification"
        render={({ field: { onChange, value } }) => (
          <Select
            label="Classificação"
            placeholder="Selecione uma classificação"
            items={classifications}
            setItems={setClassifications}
            value={value}
            setValue={onChange}
            error={errors.classification && errors.classification?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="justification"
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Justificativa"
            placeholder="Ex.: O documento não possui título"
            value={value}
            setValue={onChange}
            error={errors.justification && errors.justification?.message}
          />
        )}
      />
      <PrimaryButton onPress={handleSubmit(sendNotification)}>
        Enviar não conformidade
      </PrimaryButton>
      <SecondaryButton onPress={() => cancelSubmit()}>Cancelar</SecondaryButton>
    </Layout>
  );
};

export default Justification;

const styles = StyleSheet.create({});
