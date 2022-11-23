/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { RefreshControl, View, Text, ScrollView, SafeAreaView, Alert, Image, refr } from 'react-native'
import { HStack } from 'native-base'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { ScrollViewProps } from 'react-native'

import * as Location from 'expo-location'
import api from '../../services/api'

import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../RootStackPrams'

import styles from './styles'

type authScreenProp = StackNavigationProp<RootStackParamList, 'Detail'>

interface Item {
  id: number
  title: string
  imageData: string
}

interface Point {
  id: number
  name: string
  image: string
  latitude: string
  longitude: string
  status: string
  cellphone: string
  email: string
}

// interface Params {
//   uf: string
//   city: string
// }

const wait = async (timeout) => {
  return await new Promise(resolve => setTimeout(resolve, timeout))
}

const Points = () => {
  const [points, setPoints] = useState<Point[]>([])
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [items, setItems] = useState<Item[]>([])
  const navigation = useNavigation<authScreenProp>()
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [refreshing, setRefreshing] = React.useState(false)

  useEffect(() => {
    api.get('/category').then(response => {
      setItems(response.data)
    })
  }, [])

  function handleSelectItem(id: number) {
    const alredySelected = selectedItems.findIndex(item => item === id)

    if (alredySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  useEffect(() => {
    if (selectedItems.length === 0) {
      api.get('/pontocoleta').then(response => {
        setPoints(response.data)
      })
    } else {
      api.get('pontocoleta/findCa', {
        params: {
          id_category: selectedItems
        }
      }).then(response => {
        const arr = []
        if (response.data.length === 0) {
          setPoints([])
        } else {
          for (let i = 0; i < response.data.length; i++) {
            const a = response.data[i].tb_ponto_coletum
            arr.push(a)
            setPoints(arr)
          }
        }
      })
    }
  }, [selectedItems, refreshing])

  useEffect(() => {
    async function loadPosition() {
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

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { point_id: id })
  }

  function handleNavigateToReqPoint() {
    navigation.navigate('RequestPoint')
  }
  function handleNavigateToLogin() {
    navigation.navigate('Login')
  }

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('@storage_Key')
      user !== null ? handleNavigateToReqPoint() : handleNavigateToLogin()
    } catch (error) {
      // error reading value
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <View style={styles.container}>
            <View>
              <TouchableOpacity
                onPress={getData}
                style={styles.sugerirColeta}
              >
                <HStack>
                  <Icon name="map-pin" size={20} color="#34cb79" />
                  <Text style={styles.sugerirColetaTxT}>Solicitar Ponto</Text>
                </HStack>
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Bem vindo</Text>
            <Text style={styles.description}>Encontre no mapa um ponto de coleta</Text>

            <View style={styles.mapContainer}>

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
                  {points.map(point => {
                    return (< Marker
                      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                      key={String(point.id)}
                      style={styles.mapMarker}
                      onPress={() => handleNavigateToDetail(point.id)}
                      coordinate={{
                        latitude: parseFloat(point.latitude),
                        longitude: parseFloat(point.longitude)
                      }}
                    >
                      <View style={
                        point.status === null
                          ? styles.mapMarkerContainer
                          : point.status === 'Pendente' ? styles.mapMarkerContainerPendent : styles.mapMarkerContainerAcepted}>
                        <Image style={styles.mapMarkerImage} source={{ uri: point.image }} />
                        <Text style={styles.mapMarkerTitle}>
                          {point.name}
                        </Text>
                      </View>
                      <View style={
                        point.status === null
                          ? styles.triangle
                          : point.status === 'Pendente' ? styles.trianglePendent : styles.triangleAcepted}>
                      </View>
                    </Marker>
                    )
                  })}
                </MapView>
              )}
              {initialPosition[0] === 0 && (
                <View>
                  <Text style={styles.title}>Carregando...</Text>
                </View>
              )}

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
                      uri={`http://192.168.12.176:3333/uploads/${item.imageData}`}
                      // uri={`http://192.168.12.196:3333/uploads/${item.imageData}`}
                      height={30} width={30} />
                    <Text style={styles.itemTitle}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Points
