/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, SafeAreaView, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import * as MailComposer from 'expo-mail-composer'

import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../RootStackPrams'

import styles from './styles'

interface Params {
  point_id: number
}

interface Data {
  image: string
  image_url: string
  name: string
  email: string
  cellphone: string
  city: string
  uf: string
  description: string
}

interface Point {
  id: number
  name: string
  image: string
  image_url: string
  latitude: number
  longitude: number
}

type authScreenProp = StackNavigationProp<RootStackParamList>

const Detail = () => {
  const navigate = useNavigation<authScreenProp>()
  const [data, setData] = useState<Data>({} as Data)
  const [categories, setCategories] = useState<any>()

  const route = useRoute()

  const routeParams = route.params as Params

  useEffect(() => {
    api.get(`pontocoleta/${routeParams.point_id}`).then(response => {
      setData(response.data)
    })
  }, [])

  useEffect(() => {
    api.get('pontocoleta/findCategoriesByPoint', {
      params: {
        id_ponto: routeParams.point_id
      }
    }).then(response => {
      setCategories(response)
      console.log(response.data)
    })
  }, [])

  function handleNavigateBack () {
    navigate.goBack()
  }

  function handleComposeMail () {
    MailComposer.composeAsync({
      subject: 'Interese na coleta de residuos',
      recipients: [data.email]
    })
  }

  function handleWhatsapp () {
    Linking.openURL(`whatsapp://send?phone=${data.cellphone}&text=Tenho interrese sobre coleta de residuos`)
  }

  // if (!data.point) {
  //   return null
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleNavigateBack}
        >
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: data.image }} />

        <Text style={styles.pointName}>{data.name}</Text>
        {(data.description !== '') ? <Text style={styles.addressContent}>{data.description} </Text> : null}

        <Text style={styles.addressTitle}>Este  ponto coleta:</Text>
        {categories
          ? Object.values(categories.data).map((category: any) => {
            return (
              <View key={categories.id}>
                <Text style={styles.addressContent}>{category?.title},</Text>
              </View>

            )
          })
          : null}

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{data.city}, {data.uf} </Text>
        </View>
      </View>
      {(data.cellphone === '')
        ? <View style={styles.footer}>
        <RectButton style={styles.buttonZap}
          onPress={handleWhatsapp}
        >
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.buttonMail}
          onPress={handleComposeMail}
        >
          <Icon name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
        : null}
    </SafeAreaView>
  )
}
export default Detail
