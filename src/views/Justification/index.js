import React, {useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import TextField from "../../components/Inputs/TextField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "../../components/Inputs/Select";
import PrimaryButton from '../../components/Buttons/Primary';

const schema = yup.object({
  justification: yup.string().required("Informe uma justificativa"),
  responsible: yup.string().required('Selecione um responsável')
});

const Justification = ({ route, navigation }) => {
  let {idItem} = route.params;
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function sendNotification(data){
    console.log(data.responsible, data.justification)
  }

  useEffect(() => {

  },[])

  return (
    <Layout navigation={navigation}>
      <Title title="Justificativa" subtitle="Justifique a não conformidade" />

      <Controller
        control={control}
        name="responsible"
        render={({ field: { onChange, value } }) => (
          <Select
            data={countries}
            label="Responsável"
            placeholder="Selecione um responsável"
            value={value}
            setValue={onChange}
            error={errors.responsible && errors.responsible?.message}
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
      <PrimaryButton onPress={handleSubmit(sendNotification)}>Enviar não conformidade</PrimaryButton>
    </Layout>
  );
};

export default Justification;

const styles = StyleSheet.create({});
