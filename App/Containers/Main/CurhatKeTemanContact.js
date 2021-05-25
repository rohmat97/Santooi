import React, { useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, TextInput } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import { connect } from 'react-redux';
import Images from '../../Themes/Images';
import RoundedButton from '../../Components/RoundedButton';
import { Fonts, Colors, Metrics } from '../../Themes/'
import { OverlayInvite } from '../../Components/OverlayInvite';
import { OverlayPhone } from '../../Components/OverlayPhone';

function CurhatKeTemanContact(props) {
    const { navigation } = props
    const { pop } = navigation
    const [conselingCode, setConselingCode] = useState(false);
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState()
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const [visiblePhone, setVisiblePhone] = useState(false);
    const toggleOverlayPhone = () => {
        setVisiblePhone(!visiblePhone);
    };

    const [visibleInvite, setVisibleInvite] = useState(false);
    const toggleOverlayInvite = () => {
        setVisibleInvite(!visibleInvite);
    };

    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => pop()}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Curhat ke Teman</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerSearch}>
                        <Image source={images.search} style={{ width: 25, height: 25 }} resizeMode='contain' />
                        <TextInput style={{ color: 'white', flex: 1, marginLeft: 10 }}
                            placeholder={'Search a place...'}
                            placeholderTextColor='rgba(255, 255, 255, 0.5)'
                            // value={phoneNumber}
                            // onChangeText={number => onPhoneChange(number)}
                            keyboardType={'default'}
                        // inputRef={(ref) => (this.number = ref)}
                        >
                        </TextInput>
                    </View>

                    <TouchableOpacity onPress={toggleOverlayPhone}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Image source={images.findByPhone} style={{ width: Screen.width * 0.5, maxHeight: 50 }} resizeMode='contain' />
                            <Image source={images.next} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleOverlayInvite}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image source={images.invite} style={{ width: Screen.width * 0.5, maxHeight: 50 }} resizeMode='contain' />
                            <Image source={images.next} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        </View>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: '#67308F', width: Screen.width, paddingVertical: 5, paddingHorizontal: 20, marginVertical: 20, marginLeft: -15 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>A</Text>
                    </View>

                    <TouchableOpacity onPress={()=>navigation.navigate('CurhatKeTemanContactDetail')}>
                        <Text style={{ color: 'white' }}>Agus</Text>
                        <View style={{ height: 1, width: Screen.width, borderRadius: 1, borderWidth: 0.5, borderColor: 'white', zIndex: 0, marginVertical: 15 }} />
                    </TouchableOpacity>

                    <Text style={{ color: 'white' }}>Amel</Text>
                    <View style={{ height: 1, width: Screen.width, borderRadius: 1, borderWidth: 0.5, borderColor: 'white', zIndex: 0, marginVertical: 15 }} />
                    <Text style={{ color: 'white' }}>Alma</Text>
                    <View style={{ height: 1, width: Screen.width, borderRadius: 1, borderWidth: 0.5, borderColor: 'white', zIndex: 0, marginVertical: 15 }} />

                    <View style={{ backgroundColor: '#67308F', width: Screen.width, paddingVertical: 5, paddingHorizontal: 20, marginVertical: 20, marginLeft: -15 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>B</Text>
                    </View>

                    <Text style={{ color: 'white' }}>Bayu</Text>
                    <View style={{ height: 1, width: Screen.width, borderRadius: 1, borderWidth: 0.5, borderColor: 'white', zIndex: 0, marginVertical: 15 }} />
                    <Text style={{ color: 'white' }}>Brian</Text>
                    <View style={{ height: 1, width: Screen.width, borderRadius: 1, borderWidth: 0.5, borderColor: 'white', zIndex: 0, marginVertical: 15 }} />
                </View>
                <OverlayPhone visible={visiblePhone} toggleOverlay={toggleOverlayPhone} />
                <OverlayInvite visible={visibleInvite} toggleOverlay={toggleOverlayInvite} />
            </View>
        </TemplateBackground>
    )
}

export default connect(null, null)(CurhatKeTemanContact)