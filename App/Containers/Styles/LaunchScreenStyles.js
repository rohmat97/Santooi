import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'
import { Screen } from '../../Transforms/Screen'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  textbox: {
    marginVertical: 8,
    flexDirection: 'row',
    backgroundColor: '#662D91',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // justifyContent:'center',
    alignItems: 'center'
  },
  textInput: {
    // overflow: 'hidden',
    backgroundColor: 'transparent',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textInputNoHeader: {
    height: Screen.height * 0.15,
    width: Screen.width * 0.9,
    marginBottom: Screen.height * 0.05,
    borderRadius: 20,
    backgroundColor: '#67308F',
    opacity: 0.85,
    paddingHorizontal: 20,
    color: 'white'
  },
  containerTextbox: {
    borderWidth: 1,
    height: Screen.height * 0.2,
    width: Screen.width * 0.9,
    marginBottom: Screen.height * 0.05,
    borderRadius: 20,
    textAlign: 'center',
    backgroundColor: '#67308F',
    borderColor: Colors.transparent,
    opacity: 0.85,
    color: 'white',
    padding: 15
  },

  containerSearch: {
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#67308F',
    borderColor: Colors.transparent,
    opacity: 0.85,
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:30, 
    // marginHorizontal:10
  },

  textBorder: {
    borderColor: 'white',
    alignItems: 'center',
    // padding:10,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    marginTop: 10
  }
})
