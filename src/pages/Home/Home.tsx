import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { View, ImageBackground, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Select, CheckIcon } from "native-base";
import api from '../../services/api'
import axios from 'axios'

// import { useNavigation } from '@react-navigation/native'

import styles from './styles'
import Logo from '../../assets/logo.svg'

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const Home = () => {
  const [uf, setUf] = useState<string[]>([])
  const [city, setCity] = useState<string[]>([])
  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelecdetCity] = useState('0')

  // const navigation = useNavigation()

  // function handleNavigateToPoints() {
  //   navigation.navigate('Points',{
  //     uf,
  //     city,
  //   })
  // }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)

      setUf(ufInitials)
    })
  },[])

  useEffect(() => {
    if(selectedUf === '0') {
      return
    }
    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome)

        setCity(cityNames)
    })

  }, [selectedUf])


  function handleSelectUf(value: string) {
    const uf = value 

    setSelectedUf(uf)
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value

    setSelecdetCity(city)
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
        {/* <Logo width={120} height={40} />; */}
        <Image style={styles.image} source={require('../../assets/logo.png')} />
        <View>
          <Text style={styles.title}>Suas informações de coleta de resíduos aqui.</Text>
          <Text style={styles.description}>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
      <Select 
        mt={1}
        selectedValue={selectedUf} 
        minWidth="200" 
        minHeight="60"
        placeholder="Uf"
        color="teal.600"
        onValueChange={e => handleSelectUf(e.target.value)}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }} 
        >
            <Select.Item label="Selecione sua UF" value="ux" />
            {uf.map(uf => (
                 <Select.Item key={uf} value={uf} label={uf}/>
               ))}
            
        </Select>
        <Select 
        mt={1}
        selectedValue={selectedCity} 
        minWidth="200" 
        minHeight="60"  
        placeholder="Cidade"
        onValueChange={selectedCity => handleSelectCity(selectedCity)}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }} 
        >
            <Select.Item label="Selecione sua UF" value="ux" />
            {city.map(city => (
                 <Select.Item key={city} value={city} label={city }/>
               ))}
            
        </Select>

        <RectButton style={styles.button} 
        // onPress={handleNavigateToPoints}
        >
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  </KeyboardAvoidingView>
  )
}

export default Home
