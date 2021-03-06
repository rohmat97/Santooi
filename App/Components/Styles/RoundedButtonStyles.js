import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 100,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    // backgroundColor: Colors.fire,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  },
})
