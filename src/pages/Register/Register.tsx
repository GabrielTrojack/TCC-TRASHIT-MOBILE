/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react'
import {
  View,
  ImageBackground,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import {
  Input,
  Pressable,
  Icon,
  Stack,
  FormControl,
  Button
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../RootStackPrams'

import styles from './styles'
import Trashbin from '../../assets/recycle-bin-title.svg'

type authScreenProp = StackNavigationProp<RootStackParamList, 'Login'>

const Register = () => {
  const navigation = useNavigation<authScreenProp>()
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function loginNavigate () {
    navigation.navigate('Login')
  }

  async function handleRegister () {
    const data = {
      name,
      email,
      password,
      adm: false
    }
    try {
      await api.post('user', data)
      loginNavigate()
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>

        {/* <Trashbin style={styles.image}/> */}
        <Image style={styles.image} source={require('../../assets/recycle-bin-title.png')}/>

          <View>
            <Text style={styles.title}>
              Cadastre-se Para Solicitar Pontos de coleta
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Stack space={2}>
            <FormControl>
              {/* <FormControl.Label>Username</FormControl.Label> */}
              <Input
                style={styles.input}
                size="2xl"
                variant="unstyled"
                placeholder="Nome"
                value={name}
                onChangeText={setName}
              />
            </FormControl>
            <FormControl>
              {/* <FormControl.Label>Password</FormControl.Label> */}
              <Input
                style={styles.input}
                size="2xl"
                variant="unstyled"
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
              />
            </FormControl>
            <FormControl>
              {/* <FormControl.Label>Password</FormControl.Label> */}
              <Input
                style={styles.input}
                size="2xl"
                variant="unstyled"
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={<Feather name={show ? 'eye' : 'eye-off'} />}
                      size={5}
                      mr="2"
                      color="muted.400"
                      marginLeft={-8}
                    />
                  </Pressable>
                }
              />
            </FormControl>
          </Stack>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => await handleRegister()}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          <Button
            style={styles.gotAcount}
            variant="ghost"
            onPress={loginNavigate}
          >
            <Text style={styles.gotAcount}>Já tenho conta</Text>
          </Button>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default Register
