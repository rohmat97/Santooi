import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class PasswordEye extends Component {
  render() {
    const { flag, onPress } = this.props
    let name = flag ? 'visibility' : 'visibility-off'

    return <Icon size={24} name={name} onPress={onPress} suppressHighlighting />
  }
}
