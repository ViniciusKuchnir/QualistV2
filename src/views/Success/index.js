import React, {useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native';

const Success = ({navigation}) => {

  useEffect(() => {
    setTimeout(()=> {
      navigation.navigate("Login")
  }, 3000)
  })


  return (
    <View style={styles.content}>
      <LottieView
        autoPlay
        style={{
          width: 300,
          height: 300,
          backgroundColor: '#FFF',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/animations/check.json')}
      />
      <Text style={styles.message}>Cadastro feito com sucesso!</Text>
    </View>
  )
}

export default Success

const styles = StyleSheet.create({
  content:{
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message:{
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 20
  }
})