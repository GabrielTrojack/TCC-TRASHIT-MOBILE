/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image
} from 'react-native'
import {
  Text,
  VStack,
  HStack,
  FormControl,
  Input,
  TextArea,
  Button,
  Select,
  CheckIcon
} from 'native-base'

import { SvgUri } from 'react-native-svg'
import api from '../../services/api'
import * as ImagePicker from 'expo-image-picker'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import axios from 'axios'

import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../RootStackPrams'

import styles from './styles'

type authScreenProp = StackNavigationProp<RootStackParamList, 'Points'>

interface Item {
  id: number
  title: string
  imageData: string
}

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const RequestPoint = () => {
  const navigation = useNavigation<authScreenProp>()
  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [image, setImage] = useState<string>('')

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [coordinate, setCoordinate] = useState<[number, number]>([0, 0])

  const [description, setDescription] = useState<string>('')
  const [name, setName] = useState<string>('')

  const [uf, setUf] = useState<string[]>([])
  const [city, setCity] = useState<string[]>([])
  const [street, setStreet] = useState<string>('')
  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla)
        setUf(ufInitials)
      })
  }, [])

  useEffect(() => {
    if (selectedUf === '0') {
      return
    }
    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome)
        setCity(cityNames)
      })
  }, [selectedUf])

  function handleSelectUf (uf: string) {
    setSelectedUf(uf)
  }

  function handleSelectCity (city: string) {
    setSelectedCity(city)
  }

  useEffect(() => {
    api.get('/category').then(response => {
      setItems(response.data)
    })
  }, [])

  function handleSelectItem (id: number) {
    const alredySelected = selectedItems.findIndex(item => item === id)

    if (alredySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  function handleNavigateToPoints () {
    navigation.navigate('Points')
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  useEffect(() => {
    async function loadPosition () {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Oops', 'Precisamos da sua permissão para obter a localização')
      }
      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords
      setInitialPosition([latitude, longitude])
    }
    loadPosition()
  })

  async function handleRequest () {
    try {
      const items = selectedItems.join(',')
      const reader = new FileReader()
      let baseUrl: any
      reader.onload = async () => {
        baseUrl = reader.result
        setImage(baseUrl)
        console.log(baseUrl)
      }
      const data = {
        name,
        image,
        latitude: coordinate[0] ? coordinate[0] : initialPosition[0],
        longitude: coordinate[1] ? coordinate[1] : initialPosition[1],
        items,
        status: 'Pendente',
        uf: selectedUf,
        city: selectedCity,
        country: 'Brasil',
        description,
        street
      }
      await api.post('pontocoleta', data)
      handleNavigateToPoints()
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        showsVerticalScrollIndicator={true}>
        <HStack>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleNavigateToPoints}
          >
            <Icon name="arrow-left" size={20} color="#34cb79" />
          </TouchableOpacity>
          <Text style={styles.title} >Solicitar Ponto de coleta</Text>
        </HStack>

        <Button style={!image ? styles.camBtn : styles.anxImg} onPress={async () => await pickImage()}>
          {image
            ? <Image source={{ uri: image }}
              style={{ width: 310, height: 240, borderRadius: 8 }}
            />
            : <VStack style={styles.camStack}>
              <Icon name="camera" size={24} color="#2E8B57" />
              <Text style={{ textAlign: 'center' }}>
                Selecione uma imagem do local
              </Text>
            </VStack>
          }
        </Button>

        <Text style={styles.title} >Endereço</Text>
        <View style={styles.containe}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              // loadingEnabled={initialPosition[0] === 0}
              onPress={(event: any) => {
                setCoordinate(
                  [event.nativeEvent.coordinate.latitude,
                    event.nativeEvent.coordinate.longitude
                  ])
                console.log(event.nativeEvent.coordinate)
              }}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                longitudeDelta: 0.014,
                latitudeDelta: 0.014
              }}>
              <Marker coordinate={{
                latitude: coordinate[0] ? coordinate[0] : initialPosition[0],
                longitude: coordinate[1] ? coordinate[1] : initialPosition[1]
              }} />
            </MapView>
          )}
          {initialPosition[0] === 0 && (
            <View>
              <Text style={styles.title}>Carregando...</Text>
            </View>
          )}
        </View>

        <Text style={styles.title} >Dados</Text>

        <FormControl w="100%">
          <FormControl.Label >Seu nome</FormControl.Label>
          <Input style={styles.input} onChangeText={setName} />
        </FormControl>

        <FormControl w="100%">
          <FormControl.Label >Informar motivo da solicitação</FormControl.Label>
          <TextArea autoCompleteType={false} style={styles.input} onChangeText={setDescription} />
        </FormControl>

        <View style={styles.select}>
          <Select
            mt={1}
            selectedValue={selectedUf}
            minWidth="200"
            minHeight="60"
            placeholder="Uf"
            backgroundColor={'#fff'}
            color="#000"
            onValueChange={(value) => handleSelectUf(value)}
            _selectedItem={{
              bg: '#d4d4d4',
              endIcon: <CheckIcon size="5" />
            }}
          >
            <Select.Item label="Selecione sua UF" value="ux" />
            {uf.map(uf => (
              <Select.Item key={uf} value={uf} label={uf} />
            ))}

          </Select>
        </View>
        <View style={styles.select}>
          <Select
            mt={1}
            selectedValue={selectedCity}
            minWidth="200"
            minHeight="60"
            placeholder="Cidade"
            backgroundColor={'#fff'}
            color="#000"
            onValueChange={(value) => handleSelectCity(value)}
            _selectedItem={{
              bg: '#d4d4d4',
              endIcon: <CheckIcon size="5" />
            }}
          >
            <Select.Item label="Selecione sua UF" value="ux" />
            {city.map(city => (
              <Select.Item key={city} value={city} label={city} />
            ))}

          </Select>

          <FormControl w="100%">
            <FormControl.Label >Endereço</FormControl.Label>
            <Input style={styles.input} onChangeText={setStreet} />
          </FormControl>
        </View>

        <View style={styles.itemsContainer}>
          <ScrollView horizontal={true}>
            {items.map(item => (
              <TouchableOpacity
                key={String(item.id)}
                style={[
                  styles.item,
                  selectedItems.includes(item.id) ? styles.selectedItem : {}
                ]}
                onPress={() => handleSelectItem(item.id)}
                activeOpacity={0.6}
              >
                <SvgUri
                  // uri={`http://192.168.30.158:3333/uploads/${item.imageData}`}
                  uri={`http://192.168.12.196:3333/uploads/${item.imageData}`}
                  height={30} width={30} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Button style={styles.button}
          onPress={handleRequest}
        >
          <Text style={styles.buttonText}>
            Solicitar ponto
          </Text>
        </Button>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RequestPoint
