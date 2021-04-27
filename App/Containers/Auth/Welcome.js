import React, {useState} from 'react'
import { View, Image, Text, TouchableOpacity} from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import { RadioButton } from 'react-native-paper'

// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { Colors, Fonts } from '../../Themes'

export function Welcome(props) {
    const { navigation } = props
    const { navigate } = navigation
    const [ greeting , setGreeting] = useState('')

    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>
                    <Text style={{ color: '#35385D', fontWeight: 'bold', fontSize: 35, width: Screen.width * 0.7, marginBottom: 20 }}>Selamat datang, Mario.</Text>
                    <View style={styles.containerTextbox}>
                        <Text style={{ color: 'white',fontSize: Fonts.size.regular, marginBottom:10 }}>Bagaimana kamu ingin disapa?</Text>
                        <RadioButton.Group onValueChange={newValue => setGreeting(newValue)} value={greeting}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <RadioButton color='white' uncheckedColor='white' value="kamu" />
                                <Text style={{ color: 'white', fontSize: Fonts.size.medium, marginStart:10 }}>Kamu</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}> 
                                <RadioButton color='white' uncheckedColor='white' value="anda" />
                                <Text style={{ color: 'white', fontSize: Fonts.size.medium, marginStart:10}}>Anda</Text>
                            </View>
                        </RadioButton.Group>
                    </View>
                    {greeting != '' &&
                        <TouchableOpacity onPress={() => navigate('DateBirthScreen')} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginEnd: 10 }}>
                            <Text style={{ color: 'white', marginEnd: 15, fontSize: Fonts.size.regular }}>Selanjutnya</Text>
                            <Image source={images.arrowRight} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </TemplateBackground>
    )
}