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
  ScrollView
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
  const [ConfShow, setConfShow] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ConfPassword, setConfPassword] = useState('')
  const [invalid, setInvalid] = useState(false)

  function loginNavigate () {
    navigation.navigate('Login')
  }

  async function handleRegister () {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    password !== ConfPassword ? setInvalid(true) : null
    const data = {
      name,
      email,
      password,
      city: localStorage.city,
      uf: localStorage.uf,
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
    <ScrollView>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368, opacity: 0.1 }}
      >
        <View style={styles.main}>

        <Trashbin style={styles.image}/>
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
            <FormControl isInvalid={invalid}>
              <Input
                style={styles.input}
                size="2xl"
                variant={invalid ? 'outline' : 'unstyled'}
                placeholder="Confirme a senha"
                value={ConfPassword}
                onChangeText={setConfPassword}
                type={ConfShow ? 'text' : 'password'}
                InputRightElement={
                  <Pressable style={styles.pressable} onPress={() => setConfShow(!ConfShow)}>
                    <Icon
                      as={<Feather name={ConfShow ? 'eye' : 'eye-off'} />}
                      size={5}
                      mr="2"
                      color="muted.400"
                      marginLeft={-8}
                    />
                  </Pressable>
                }
              />
              <FormControl.ErrorMessage
                leftIcon={<Feather name="alert-circle" size={2} mr="2" />}
              >
                As senhas devem ser iguais
              </FormControl.ErrorMessage>
            </FormControl>
          </Stack>

          <Button
            style={styles.button}
            onPress={async () => await handleRegister()}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </Button>
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
    </ScrollView>
  )
}

export default Register
