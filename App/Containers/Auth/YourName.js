import React, { useState } from 'react'
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'

// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { Colors, Fonts } from '../../Themes'

export function YourName(props) {
    const { navigation } = props
    const { navigate } = navigation
    const [name, setName] = useState('')

    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>
                    <Text style={{ color: '#35385D', fontWeight: 'bold', fontSize: 35, width: Screen.width * 0.7, marginBottom: 20 }}>Halo sahabat, Siapa namamu?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TextInput
                            placeholder="Tulis namamu disini..."
                            style={styles.textInputNoHeader}
                            value={name}
                            onChangeText={name => setName(name)}
                            inputRef={(ref) => (this.navigate = ref)}
                            keyboardType='default'
                            autoCapitalize="none"
                            // returnKeyType="next"
                            theme={{
                                colors: {
                                    primary: 'white',
                                    placeholder: 'white',
                                }
                            }}
                        />
                    </View>
                    {name != '' &&
                        <TouchableOpacity onPress={() => navigate('WelcomeScreen', {name:name})} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginEnd: 10 }}>
                            <Text style={{ color: 'white', marginEnd: 15, fontSize: Fonts.size.regular }}>Masuk</Text>
                            <Image source={images.arrowRight} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </TemplateBackground>
    )
}