import React from 'react'
import { View, 
  ImageBackground, 
  Text, 
  Image, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity } from 'react-native'
// import { useNavigation } from '@react-navigation/native'

import styles from './styles'

const Login = () => {
  return(
    <KeyboardAvoidingView 
    style={{ flex: 1 }} 
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <ImageBackground 
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{ width: 274, height:368, opacity:0.1 }}
    >
      <View style={styles.main}>
        <Image style={styles.image} source={require('../../assets/recycle-bin-title.png')} />
        <View>
          <Text style={styles.title}>Entre Na Sua Conta Para Solicitar Pontos De Coleta</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TextInput 
          style={styles.input}
          placeholder="E-mail"
          // value={email}
          autoCorrect={false}
          // onChangeText={setEmail}
        />

        <TextInput 
          style={styles.input}
          placeholder="Senha"
          // value={name}
          autoCorrect={false}
          // onChangeText={setName}
        />

        <TouchableOpacity style={styles.button} 
        // onPress={handleNavigateToHome}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </KeyboardAvoidingView>
  )
}

export default Login
