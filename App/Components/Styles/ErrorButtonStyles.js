import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: '#EB0D8C',
    borderWidth: 1,
    padding:15,
    opacity: 0.65,
  },
  buttonText: {
    color: '#67308F',
    fontSize: Fonts.size.small,
    marginVertical: Metrics.baseMargin
  }
})
