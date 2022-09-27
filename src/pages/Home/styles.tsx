import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#322153'
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain',
    height: 50,
    width: 166
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 34,
    // fontFamily: 'Ubuntu_700Bold',
    maxWidth: 300,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 140,
    // fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#3CB371',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 25
    },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    // fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
  Image:{
    opacity:50
  }
})