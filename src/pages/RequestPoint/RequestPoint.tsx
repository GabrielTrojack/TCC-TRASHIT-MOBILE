/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native'
import { VStack, HStack, FormControl, Input, TextArea, Button } from 'native-base'
import Svg from 'react-native-svg'
import api from '../../services/api'
import * as ImagePicker from 'expo-image-picker'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'

import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../RootStackPrams'

import styles from './styles'

type authScreenProp = StackNavigationProp<RootStackParamList>

interface Item {
  id: number
  title: string
  imageData: string
}

const RequestPoint = () => {
  const [items, setItems] = useState<Item[]>([])
  const navigation = useNavigation<authScreenProp>()
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [image, setImage] = useState<string>('')
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

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

  function handleNavigateBack () {
    navigation.goBack()
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
        return
      }
      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords
      setInitialPosition([latitude, longitude])
    }
    loadPosition()
  })

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <HStack>
          <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title} >Solicitar Ponto de coleta</Text>
        </HStack>

          <Button style={!image ? styles.camBtn : styles.anxImg} onPress={async () => await pickImage()}>
            {image
              ? <Image source={{ uri: image }}
              style={{ width: 310, height: 240, borderRadius: 8 }}
              />
              : <VStack style={styles.camStack}>
                  <Icon name="camera" size={24} color="#2E8B57"/>
                  <Text style={{ textAlign: 'center' }}>
                    Selecione uma imagem do local
                  </Text>
                </VStack>
            }
          </Button>

          <View style={styles.containe}>
          {initialPosition[0] !== 0 && (
        <MapView
          style={styles.map}
          // loadingEnabled={initialPosition[0] === 0}
          initialRegion={{
            latitude: initialPosition[0],
            longitude: initialPosition[1],
            longitudeDelta: 0.014,
            latitudeDelta: 0.014
          }}
        >
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
          <Input style={styles.input} />
        </FormControl>
        <FormControl w="100%">
          <FormControl.Label >Informar motivo da solicitação</FormControl.Label>
          <TextArea autoCompleteType={false} style={styles.input} />
        </FormControl>

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
                <Svg height={30} width={30}/>
            <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
      <Button style={styles.button}>
          <Text style={styles.buttonText}>Solicitar ponto</Text>
        </Button>
        </ScrollView>
  </KeyboardAvoidingView>
  )
}

export default RequestPoint
