import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View, Image} from 'react-native'
import styles from './Styles/RoundedButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import { Metrics } from '../Themes'

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample('Rounded Button', () =>
  <RoundedButton
    text='real buttons have curves'
    onPress={() => window.alert('Rounded Button Pressed!')}
  />
)

export default class RoundedButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object
  }

  // getText () {
  //   const buttonText = this.props.text || this.props.children || ''
  //   return buttonText.toUpperCase()
  // }

  render() {
    // console.log(this.props.disabled)
    return (
      <TouchableOpacity style={{
        height: 50,
        borderRadius: 100,
        marginVertical: Metrics.baseMargin,
        justifyContent: 'center',
        backgroundColor: this.props.backgroundColor
      }} onPress={this.props.onPress}
      disabled={this.props.disabled == undefined ? false : true}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
          {this.props.image != null &&
            <Image source={this.props.image} style={{width:this.props.width,height:this.props.height, marginEnd:10}}/>
          }
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
