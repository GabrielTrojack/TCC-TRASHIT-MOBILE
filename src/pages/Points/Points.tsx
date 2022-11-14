/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, ScrollView, SafeAreaView, Alert, Image } from 'react-native'
import { HStack } from 'native-base'
import MapView, { Marker } from 'react-native-maps'
import Svg from 'react-native-svg'

import * as Location from 'expo-location'
import api from '../../services/api'

import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../RootStackPrams'

import styles from './styles'

type authScreenProp = StackNavigationProp<RootStackParamList>

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
}

// interface Params {
//   uf: string
//   city: string
// }

const Points = () => {
  const [points, setPoints] = useState<Point[]>([])
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [items, setItems] = useState<Item[]>([])
  const navigation = useNavigation<authScreenProp>()
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const route = useRoute()

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

  useEffect(() => {
    api.get('pontocoleta', {
      params: {
        // city: routeParams.city,
        // uf: routeParams.uf,
        items: selectedItems
      }
    }).then(response => {
      setPoints(response.data)
    })
  }, [selectedItems])

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

  function handleNavigateToDetail (id: number) {
    navigation.navigate('Detail', { point_id: id })
  }

  function handleNavigateToReqPoint () {
    navigation.navigate('RequestPoint')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View>
        <TouchableOpacity
        onPress={handleNavigateToReqPoint}
        style={styles.sugerirColeta}
        >
        <HStack>
          <Icon name="map-pin" size={20} color="#34cb79"/>
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
          {points.map(point => (
            <Marker
              key={String(point.id)}
              style={styles.mapMarker}
              onPress={() => handleNavigateToDetail(point.id)}
              coordinate={{
                latitude: parseFloat(point.latitude),
                longitude: parseFloat(point.longitude)
              }}
            >
            <View style={styles.mapMarkerContainer}>
            <Image style={styles.mapMarkerImage} source={{ uri: point.image }} />
              <Text style={styles.mapMarkerTitle}>
                {point.name}
              </Text>
            </View>
            <View style={styles.triangle}></View>
            </Marker>
          ))}
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
                <Svg height={30} width={30}/>
            <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
    </View>
    </View>

  </SafeAreaView>
  )
}

export default Points
