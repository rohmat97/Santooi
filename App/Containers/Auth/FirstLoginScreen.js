import React, { } from 'react'
import { Text, Image, View } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'

// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RoundedButton from '../../Components/RoundedButton'

export function FirstLoginScreen(props) {
    const { navigation } = props
    const { navigate } = navigation
    return (
        <TemplateBackground cover={false}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>
                    <View>
                        <Text style={{ color: '#35385D', fontSize: 32, fontWeight: "bold", maxWidth: Screen.width * 0.5, marginBottom: 12 }}>Tenangkan pikiranmu setiap saat</Text>
                    </View>
                    <Text style={{ color: '#35385D', fontSize: 16, maxWidth: Screen.width * 0.7, marginBottom: Screen.height * 0.12 }}>Membantu kendalikan emosi dengan energi positifmu.</Text>
                    <RoundedButton
                        text={'Lanjut'}
                        onPress={() => navigate('LoginScreen')}
                        backgroundColor={'#266CF5'}/>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <Text style={{ color: 'white', fontSize: 13, marginRight: 10 }}>Sudah punya akun?</Text>
                        <TouchableOpacity onPress={() => navigate('LoginScreen')}>
                            <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold', textDecorationLine: 'underline' }}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TemplateBackground>
    )
}