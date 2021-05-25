import React, { useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, TextInput,StyleSheet } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import { connect } from 'react-redux';
import Images from '../../Themes/Images';
import RoundedButton from '../../Components/RoundedButton';
import { Fonts, Colors, Metrics } from '../../Themes/'
import { OverlayDaftarPsikolog } from '../../Components/OverlayDaftarPsikolog';

function KonselingWaiting(props) {
    const { navigation } = props
    const { pop } = navigation
    const [conselingCode, setConselingCode] = useState(false);
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState()
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={style.container}>
                    <Image source={Images.waiting} style={{ width: Screen.width * 0.5, height: Screen.width * 0.5, alignSelf: 'center', marginBottom:20 }} resizeMode='contain' />
                    <Text style={{ color: '#67308F', textAlign:'center'}}>Aplikasi kamu sedang kami tinjau. {'\n'}Kamu akan menerima status aplikasi {'\n'}dalam 1 x 24 jam.</Text>
                    </View>
                   
                    <TouchableOpacity onPress={() => navigation.navigate('MainScreen')} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginEnd: 10, marginTop: 20 }}>
                        <Text style={{ color: 'white', marginEnd: 15, fontSize: Fonts.size.regular }}>Kembali ke homepage</Text>
                        <Image source={images.arrowRight} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </TemplateBackground >
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'linear-gradient(0.86deg, rgba(255, 247, 250, 0.9) -14.3%, rgba(220, 227, 251, 0.9) 111.91%)',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        alignItems: 'center',
        paddingHorizontal:15, 
        paddingVertical:30,
        marginTop:Screen.height * 0.2,
        marginHorizontal:40,
        marginBottom:20,
    }
})

export default connect(null, null)(KonselingWaiting)