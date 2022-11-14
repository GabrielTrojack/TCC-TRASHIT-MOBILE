import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#322153'
  },

  pointImage: {
    width: '100%',
    height: '30%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32
  },

  pointName: {
    color: '#fff',
    fontSize: 28,
    // fontFamily: 'Ubuntu_700Bold',
    marginTop: 24
  },

  pointItems: {
    // fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32
  },

  addressTitle: {
    color: '#fff',
    // fontFamily: 'Roboto_500Medium',
    fontSize: 16
  },

  addressContent: {
    // fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    backgroundColor: '#322153',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  buttonZap: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonMail: {
    width: '48%',
    backgroundColor: '#C7971E',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16
    // fontFamily: 'Roboto_500Medium'
  },
  // deleteButton: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 10,
  //   borderColor: '#e02041',
  //   borderWidth: 2,
  //   height: 33,
  //   width: 133,
  //   left: 160
  // },
  // textDelete: {
  //   // fontFamily: 'Roboto_500Medium',
  //   fontSize: 16,
  //   color: '#e02041'
  // },
  backButton: {
    top: 25
  }
})
