import React, { } from 'react'
import { Text, Image, View } from 'react-native'
import { TemplateBackground } from '../Components/TemplateBackground'

// Styles
import styles from '../Containers/Styles/LaunchScreenStyles'
import { Screen } from '../Transforms/Screen'
import images from '../Themes/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function SplashScreen(props) {
    const { navigation } = props
    const { navigate } = navigation
    return (
        <TemplateBackground cover={false}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>
                 
                    <View style={{justifyContent:'center', alignItems:'center', height:Screen.height*0.5, marginHorizontal:Screen.width*0.27, zIndex:1}}>
                        <Text style={{ color: '#35385D', fontSize: 32, fontWeight: "bold" }}>Tenangkan pikiranmu setiap saat</Text>
                    </View>
                    <Image source={images.circleSplash} style={{ width: Screen.width * 0.8, marginHorizontal:Screen.width*0.07, marginTop:-Screen.height*0.62, zIndex:0}} resizeMode='contain'></Image>
                </View>
            </View>
        </TemplateBackground>
    )
}