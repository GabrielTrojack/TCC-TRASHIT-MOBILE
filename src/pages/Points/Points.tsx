import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location'
import api from '../../services/api'
import { HStack } from 'native-base'

import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../RootStackPrams'

import styles from './styles'

type authScreenProp = StackNavigationProp<RootStackParamList>

// interface Item {
//   id: number
//   title: string
//   image_url: string
// }

// interface Point {
//   id: number
//   name: string
//   image: string
//   image_url: string
//   latitude: number
//   longitude: number
// /*   items: {
//     title: string;
//   }[]; */
// };

// interface Params {
//   uf: string
//   city: string
// }

const Points = () => {
  // const [items, setItems] = useState<Item[]>([])
  // const [points, setPoints] = useState<Point[]>([])
  // const [selectedItems, setSelectedItems] = useState<number[]>([])
  // const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const navigation = useNavigation<authScreenProp>()
  // const route = useRoute()

  // const routeParams = route.params as Params

  // useEffect(() => {
  //   api.get('items').then(response => {
  //     setItems(response.data)
  //   })
  // }, [])

  // useEffect(() => {
  //   api.get('points', {
  //     params: {
  //       city: routeParams.city,
  //       uf: routeParams.uf,
  //       items: selectedItems
  //     }
  //   }).then(response => {
  //     setPoints(response.data)
  //   })
  // }, [selectedItems])

  // useEffect(() => {
  //   async function loadPosition () {
  //     const { status } = await Location.requestForegroundPermissionsAsync()
  //     if (status !== 'granted') {
  //       Alert.alert('Oops', 'Precisamos da sua permissão para obter a localização')
  //       return
  //     }
  //     const location = await Location.getCurrentPositionAsync()
  //     const { latitude, longitude } = location.coords
  //     setInitialPosition([latitude, longitude])
  //   }
  //   loadPosition()
  // })

  function handleNavigateBack () {
    navigation.goBack()
  }

  // function handleNavigateToDetail (id: number) {
  //   navigation.navigate('Detail', { point_id: id })
  // }
  function handleNavigateToDetail () {
    navigation.navigate('Detail')
  }

  // function handleSelectItem (id: number) {
  //   const selected = selectedItems.findIndex(item => item === id)
  //   if (selected >= 0) {
  //     const filtered = selectedItems.filter(item => item !== id)
  //     setSelectedItems(filtered)
  //   } else {
  //     setSelectedItems([...selectedItems, id])
  //   }
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <HStack style={styles.header}>
        <TouchableOpacity
      onPress={handleNavigateBack}
      >
        <Icon name="arrow-left" size={20} color="#34cb79" />
      </TouchableOpacity>

      <TouchableOpacity
      onPress={handleNavigateToDetail}
      style={styles.sugerirColeta}
      >
        <HStack>
          <Icon name="map-pin" size={20} color="#34cb79"/>
          <Text style={styles.sugerirColetaTxT}>Solicitar Ponto</Text>
        </HStack>
      </TouchableOpacity>
      </HStack>

      <Text style={styles.title}>Bem vindo</Text>
      <Text style={styles.description}>Encontre no mapa um ponto de coleta</Text>

      {/* <View style={styles.mapContainer}>

    {initialPosition[0] !== 0 && (

        <MapView
          style={styles.map}
          //loadingEnabled={initialPosition[0] === 0}
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
                latitude: point.latitude,
                longitude: point.longitude
              }}
            >
            <View
            style={styles.mapMarkerContainer}>
              <Image
                style={styles.mapMarkerImage}
                source={{ uri: point.image_url }}>
              </Image>
              <Text>style={styles.mapMarkerTitle}>
                {point.name}
              </Text>
            </View>
            </Marker>
          ))}
        </MapView>
      )}
      {initialPosition[0] === 0 && (
        <Text style={styles.title}>
          Carregando..
        </Text>
      )}
      </View>
    </View>
    <View style={styles.itemsContainer}>
      <ScrollView horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}>
      {items.map(item =>(
        <TouchableOpacity
          activeOpacity={0.6}
          key={String(item.id)}
          style={[
            styles.item,
            selectedItems.includes(item.id) ? styles.selectedItem : {}]
          }
          onPress={() => handleSelectItem(item.id)}>
          <SvgUri width={42} height={42} uri={item.image_url}/>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView> */}
    </View>
  </SafeAreaView>
  )
}

export default Points
