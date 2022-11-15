import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Keyboard } from "react-native";
import api from "../../services/api";
import Layout from "../../components/Layout";
import TextField from "../../components/Inputs/TextField";
import PrimaryButton from "../../components/Buttons/Primary";
import TertiaryButton from "../../components/Buttons/Tertiary";
import Toast from "react-native-toast-message";
import { useForm, Controller } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  company: yup.string().required('Informe o nome da empresa'),
  email: yup.string().email('Digite um email válido').required('Informe um email'),
  password: yup.string().min(8, 'A senha deve conter pelo menos 8 caracteres').max(16,'A senha deve conter no máximo 16 caracteres').required('Informe uma senha')
})


const Register = ({ navigation }) => {
  const {control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  function registerUser(data) {
    Keyboard.dismiss();
    api
    .post("/createUser", {
      params: {
        company: data.company,
        email: data.email,
        password: data.password,
      },
    })
    .then(async (response) => {
      if (response.status === 200) {
        navigation.navigate("Success");
      } else {
        Toast.show({
          type: "error",
          text1: "Tente novamente!",
          text2: "Algo de errado aconteceu! Por favor, tente novamente!",
        });
      }
    })
    .catch((err) => {
      Toast.show({
        type: "error",
        text1: "Usuário já existente!",
        text2: "Este endereço de email já se encontra cadastrado!",
      });
    });
    
  }

  return (
    <Layout>
      <SafeAreaView style={styles.content}>
        <View>
          <Text style={styles.title}>Faça seu cadastro</Text>
          <Text style={styles.subtitle}>
            Comece agora mesmo a controlar seus checklists
          </Text>
        </View>
        <View>
          <Controller
            control={control}
            name="company"
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Nome da empresa"
                placeholder="Ex.: Qualist"
                value={value}
                setValue={onChange}
                error={errors.company && errors.company?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Email"
                placeholder="Ex.: qualist@gmail.com"
                keyboardType='email-address'
                autoCapitalize='none'
                value={value}
                setValue={onChange}
                error={errors.email && errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Senha"
                placeholder="Digite uma senha"
                value={value}
                setValue={onChange}
                secureTextEntry={true}
                error={errors.password && errors.password?.message}
              />
            )}
          />

          {/*
           */}
          <PrimaryButton onPress={handleSubmit(registerUser)}>
            Fazer cadastro
          </PrimaryButton>
        </View>

        <TertiaryButton
          text="Já possui um cadastro?"
          styleButton={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </TertiaryButton>
      </SafeAreaView>
    </Layout>
  );
};

export default Register;

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#A9A9A9",
    marginBottom: 32,
  },
});
