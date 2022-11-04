import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Keyboard } from 'react-native'
import api from "../../services/api";
import Layout from '../../components/Layout';
import TextField from '../../components/Inputs/TextField';
import PrimaryButton from "../../components/Buttons/Primary";
import TertiaryButton from "../../components/Buttons/Tertiary";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('Digite um email válido').required('Informe um email'),
  password: yup.string().min(8, 'A senha deve conter pelo menos 8 caracteres').max(16,'A senha deve conter no máximo 16 caracteres').required('Informe uma senha')
})

const Login = ({navigation}) => {

  const {control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  //Assyn Storage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Erro inesperado!",
        text2: "Algo de errado aconteceu! Por favor, tente novamente!",
      });
    }
  }

  function loginUser(data) {
    Keyboard.dismiss();
    api
    .get(`/user/${data.email}/${data.password}`)
    .then(response => {
      if(response.status === 200){
        storeData(response.data.user);
        navigation.navigate('Main')
      }else{
        Toast.show({
          type: "error",
          text1: "Tente novamente!",
          text2: "Algo de errado aconteceu! Por favor, tente novamente!",
        });
      }
    })
    .catch(err => {
      Toast.show({
        type: "error",
        text1: "Usuário não encontrado!",
        text2: `Não conseguimos encontrar este usuário.`,
      });
    });

  }

  return (
    <Layout>
      <SafeAreaView style={styles.content}>
        <View>
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>
            Bem vindo de volta! Por favor entre com os seus dados.
          </Text>
        </View>
        <View>
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
                placeholder="Digite sua senha"
                value={value}
                setValue={onChange}
                secureTextEntry={true}
                error={errors.password && errors.password?.message}
              />
            )}
          />
          <PrimaryButton onPress={handleSubmit(loginUser)}>Entrar</PrimaryButton>
        </View>

        <TertiaryButton
          text="Não possui um cadastro?"
          styleButton={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Register")}
        >
          Cadastrar-se
        </TertiaryButton>
      </SafeAreaView>
    </Layout>
  )
}

export default Login

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
