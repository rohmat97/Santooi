import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'

// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { Colors, Fonts } from '../../Themes'

export function PhoneNumber(props) {
    const { navigation } = props
    const { navigate } = navigation
    const [greeting, setGreeting] = useState('')

    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>
                    <Text style={{ color: '#35385D', fontWeight: 'bold', fontSize: 35, width: Screen.width * 0.7, marginBottom: 20 }}>Selamat datang, Mario.</Text>
                    <View style={styles.containerTextbox}>
                        <Text style={{ color: 'white', fontSize: Fonts.size.regular }}>Berapa nomor ponselmu?</Text>
                        <View style={styles.textBorder}>
                            <Text style={{ color: 'white', paddingHorizontal: 10 }}>+62</Text>
                            <View style={{ width: 1, height: Screen.height * 0.055, backgroundColor: 'white', marginEnd: 10 }}></View>
                            <TextInput style={{ color: 'white', flex: 1 }}>{82317145555}</TextInput>
                        </View>

                    </View>
                    {/* {greeting != '' && */}
                    <TouchableOpacity onPress={() => navigate('LaunchScreen')} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginEnd: 10 }}>
                        <Text style={{ color: 'white', marginEnd: 15, fontSize: Fonts.size.regular }}>Selanjutnya</Text>
                        <Image source={images.arrowRight} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    {/* } */}
                </View>
            </View>
        </TemplateBackground>
    )
}