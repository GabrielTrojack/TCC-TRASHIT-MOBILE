import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location'
import api from '../../services/api'

import styles from './styles'

interface Item {
  id: number
  title: string
  image_url: string
}

interface Point {
  id: number
  name: string
  image: string
  image_url: string
  latitude: number
  longitude: number
}

interface Params {
  uf: string
  city: string
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([])
  // const [points, setPoints] = useState<Point[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  // const [initialPosition, setInitialPosition] = useState<[number, number]>([
  //   0, 0
  // ])

  // const navigation = useNavigation()
  // const route = useRoute()

  // const routeParams = route.params as Params
  // console.log(routeParams)

  // useEffect(() => {
  //   async function loadPosition () {
  //     const { status } = await Location.requestPermissionsAsync()

  //     if (status !== 'granted') {
  //       Alert.alert(
  //         'Oooops...',
  //         'Precisamos de sua permição para obter a localização'
  //       )
  //       return
  //     }

  //     const location = await Location.getCurrentPositionAsync()

  //     const { latitude, longitude } = location.coords

  //     setInitialPosition([latitude, longitude])
  //   }

  //   loadPosition()
  // }, [])

  useEffect(() => {
    api.get('items').then((response) => {
      setItems(response.data)
    })
  }, [])

  useEffect(() => {
    api
      .get('points', {
        params: {
          city: routeParams.city,
          uf: routeParams.uf,
          items: selectedItems
        }
      })
      .then((response) => {
        setPoints(response.data)
      })
  }, [selectedItems])

  // function handleNavigateBack () {
  //   navigation.goBack()
  // }

  // function handleNavigateToDetail (id: number) {
  //   navigation.navigate('Detail', { point_id: id })
  // }

  function handleSelectItem (id: number) {
    const alredySelected = selectedItems.findIndex((item) => item === id)

    if (alredySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // async function handleDeletePoint (id: number) {
  //   await api.delete(`points/${id}`)
  //   setPoints(points.filter((point: Point) => point.id !== id))
  // }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
        // onPress={handleNavigateBack}
        >
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem Vindo: Nome</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          {/* {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
            >
              {points.map((point) => (
                <Marker
                  key={String(point.id)}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{ uri: point.image_url }}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeletePoint}
                  >
                    <Icon name="x" size={15} color="#fff" />
                  </TouchableOpacity>
                </Marker>
              ))}
            </MapView>
          )} */}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={String(item.id)}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]}
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  )
}
export default Points
