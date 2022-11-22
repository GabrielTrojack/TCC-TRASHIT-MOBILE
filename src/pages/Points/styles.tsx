import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
    backgroundColor: '#322153'

  },

  title: {
    color: '#fff',
    fontSize: 20,
    // fontFamily: 'Ubuntu_700Bold',
    maxWidth: 300
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4
    // fontFamily: 'Roboto_400Regular'
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16
  },

  map: {
    width: '100%',
    height: '100%'
  },

  mapMarker: {
    alignItems: 'center',
    width: 90,
    height: 85,
    marginTop: -100
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerContainerPendent: {
    width: 90,
    height: 70,
    backgroundColor: '#c59117',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover'
  },

  mapMarkerTitle: {
    flex: 1,
    // fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center'
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 4
  },

  itemTitle: {
    // fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13
  },
  deleteButton: {
    position: 'absolute',
    width: 21,
    height: 20,
    left: 67,
    top: 2,

    borderRadius: 10,
    backgroundColor: '#e02041',

    justifyContent: 'center',
    alignItems: 'center'
  },
  sugerirColetaTxT: {
    color: '#34cb79',
    fontSize: 20,
    marginHorizontal: 5,
    marginTop: -5
  },
  sugerirColeta: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#34cb79',
    borderRadius: 7,
    paddingHorizontal: 3,
    paddingVertical: 2,
    width: '50%'
  },
  initialAnimation: {
    marginTop: -50
  },
  triangle: {
    width: 1,
    borderTopWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 0,
    borderLeftWidth: 12,
    borderTopColor: '#34cb79',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent'
  },
  trianglePendent: {
    width: 1,
    borderTopWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 0,
    borderLeftWidth: 12,
    borderTopColor: '#c59117',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent'
  }
})
