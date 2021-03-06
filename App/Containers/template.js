import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

function Template (props) {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              This probably isn't what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
            </Text>
          </View>

        </ScrollView>
      </View>
    )
}

// const mapStateToProps = (state) => {
//   return {
//     data: state.local.payload
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(Object.assign(DataLocalRedux), dispatch)
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Template)
export default connect(null,null)(Template)