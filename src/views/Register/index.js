import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Keyboard } from "react-native";
import api from '../../services/api';
import Layout from "../../components/Layout";
import TextField from "../../components/Inputs/TextField";
import PrimaryButton from "../../components/Buttons/Primary";
import TertiaryButton from "../../components/Buttons/Tertiary";
import Message from '../../components/Messages/Error';
import Toast from 'react-native-toast-message';

const Register = ({navigation}) => {
  const [company, setCompany] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);

  function registerUser(){
    Keyboard.dismiss();
    api.post('/createUser', {
      params:{
        company: company,
        email: email,
        password: password
      }
    })
    .then(response => {
      if (response.status === 200) {
        //Realiza o navigation
        Toast.show({
          type: 'success',
          text1: 'Cadastro realizado com sucesso!',
          text2: 'Redirecionando para o login'
        });
      }else{
        setMessage('Algo de errado aconteceu! Tente novamente.');
        Toast.show({
          type: 'error',
          text1: 'Tente novamente!',
          text2: 'Algo de errado aconteceu! Por favor, tente novamente!'
        });
      } 
    })
    .catch(err => {
      setMessage('Este usuário já existe!');
      Toast.show({
        type: 'error',
        text1: 'Usuário já existente!',
        text2: 'Este endereço de email já se encontra cadastrado!'
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
          <TextField
            label="Nome da empresa"
            placeholder="Ex.: Qualist"
            value={company}
            setValue={setCompany}
          />
          <TextField
            label="Email"
            placeholder="Ex.: qualist@gmail.com"
            value={email}
            setValue={setEmail}
          />
          <TextField
            label="Senha"
            placeholder="Digite uma senha"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <PrimaryButton onPress={registerUser}>Fazer cadastro</PrimaryButton>
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
