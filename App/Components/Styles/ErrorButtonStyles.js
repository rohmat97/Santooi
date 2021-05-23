import { Platform, StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: '#EB0D8C',
    borderWidth: 1,
    padding:Platform.OS==='android'? 15:0,
    opacity: 0.65,
  },
  buttonText: {
    color: '#67308F',
    fontSize: Fonts.size.small,
    marginVertical: Platform.OS==='android'?Metrics.baseMargin:0,
    marginHorizontal:Metrics.baseMargin
  }
})
