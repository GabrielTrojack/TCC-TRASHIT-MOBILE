import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { View, 
  ImageBackground, 
  Text, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity } from 'react-native'
import { Input, Pressable, Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

import styles from './styles'

const Register = () => {
  const navigation = useNavigation()
  // const [show, setShow] = React.useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function loginNavigate() {
    navigation.navigate('Login')
  }
  

  async function handleRegister(e: FormEvent) {
    e.preventDefault()


    const data = {
        name,
        email,
        password,
        adm: false
    };

  try {
    await api.post('user', data)
    alert("Cadastro realizado com sucesso!!")
    loginNavigate()
  } catch (err) {
      alert(err)
  }
}

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
          <Text style={styles.title}>Cadastre-se Para Solicitar Pontos de coleta</Text>
        </View>
      </View>

      <View style={styles.footer}>
      <Input
        style={styles.input}
        size="2xl"
        variant="unstyled" 
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        />

      <Input
        style={styles.input}
        size="2xl"
        variant="unstyled" 
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        />

      <Input
        style={styles.input}
        size="2xl"
        variant="unstyled" 
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        // type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
        //     <Icon as={<Feather name={show ? "eye" : "eye-off"} />} size={5} mr="2" color="muted.400" />
        //   </Pressable>}
        />
        
      <Input
        style={styles.input}
        size="2xl"
        variant="unstyled" 
        placeholder="Confirme a senha"
        // value={password}
        // onChangeText={setPassword}
        // type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
        //     <Icon as={<Feather name={show ? "eye" : "eye-off"} />} size={5} mr="2" color="muted.400" />
        //   </Pressable>}
      />

        <TouchableOpacity style={styles.button} 
        onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </KeyboardAvoidingView>
  )
}

export default Register
