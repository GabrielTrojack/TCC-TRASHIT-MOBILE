import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { View, 
  ImageBackground, 
  Text, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity } from 'react-native'
import { Input, Pressable, Icon, Stack, FormControl } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackPrams';

type authScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

import styles from './styles'

const Register = () => {
  const navigation = useNavigation<authScreenProp>();
  const [show, setShow] = React.useState(false);
  // const [ConfShow, setConfShow] = React.useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [ConfPassword, setConfPassword] = useState('')
  

  async function handleRegister() {

    const data = {
        name : name,
        email: email,
        password: password,
        adm: false
    };

  try {
    console.log(api);
    
    await api.post('user', data)
    alert("Cadastro realizado com sucesso!!")
    navigation.navigate('Login')
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
      <FormControl>
      <Stack space={2}>
        <Stack>
          {/* <FormControl.Label>Username</FormControl.Label> */}
          <Input
        style={styles.input}
        size="2xl"
        variant="unstyled" 
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        />
        </Stack>
        <Stack>
          {/* <FormControl.Label>Password</FormControl.Label> */}
          <Input
        style={styles.input}
        size="2xl"
        variant="unstyled" 
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        />
        </Stack>
        <Stack>
          {/* <FormControl.Label>Password</FormControl.Label> */}
          <Input
        style={styles.input}
        size="2xl"
        variant="unstyled" 
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<Feather name={show ? "eye" : "eye-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>}
        />
        </Stack>
        <Stack>
          {/* <FormControl.Label>Password</FormControl.Label> */}
          {/* <Input
        style={styles.input}
        size="2xl"
        variant="unstyled" 
        placeholder="Confirme a senha"
        value={ConfPassword}
        onChangeText={setConfPassword}
        type={ConfShow ? "text" : "password"} InputRightElement={<Pressable onPress={() => setConfShow(!ConfShow)}>
            <Icon as={<Feather name={ConfShow ? "eye" : "eye-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>}
      /> */}
        </Stack>
      </Stack>
    </FormControl>

        <TouchableOpacity style={styles.button} 
        onPress={()=>handleRegister()}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </KeyboardAvoidingView>
  )
}

export default Register
