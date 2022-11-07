import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 32,
    backgroundColor: '#322153'
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginHorizontal: 10,
    marginTop: -5
  },
  input: {
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    // fontFamily: 'Roboto_500Medium',
    fontSize: 16
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
    textAlign: 'center',
    marginVertical: 30
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
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  },
  camBtn: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '8%',
    borderRadius: 8,
    marginVertical: 30
  },
  camStack: {
    alignItems: 'center',
    borderWidth: 2,
    padding: '15%',
    borderRadius: 8,
    borderColor: '#2E8B57',
    borderStyle: 'dashed'
  },
  containe: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height
  }
})
