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
import { CustomBottomTab2 } from '../../Components/CustomBottomTab2';

function CurhatKeTeman(props) {
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => pop()}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Curhat ke Teman</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('CurhatKeTemanContact')}>
                        <Image source={images.newMessage} style={{ width: Screen.width * 0.3, height: 40, alignSelf: 'flex-end', marginVertical: 20 }} resizeMode='contain' />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', height: Screen.width * 0.15, alignItems: 'center' }}>
                        <Image source={images.pp} style={{ width: 50, height: 50 }} resizeMode='contain' />
                        <View style={{ marginLeft: 20, flex: Screen.width * 0.8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 0.9 }}>
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Nissa</Text>
                                    <Text style={{ color: 'white' }}>Ok</Text>
                                </View>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 13 }}>07.00</Text>
                                </View>
                            </View>
                            <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 0.5, borderColor: 'white', zIndex: 0, marginVertical: 15 }} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', height: Screen.width * 0.15, alignItems: 'center' }}>
                        <Image source={images.pp} style={{ width: 50, height: 50 }} resizeMode='contain' />
                        <View style={{ marginLeft: 20, flex: Screen.width * 0.8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 0.9 }}>
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Nissa</Text>
                                    <Text style={{ color: 'white' }}>Ok</Text>
                                </View>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 13 }}>07.00</Text>
                                </View>
                            </View>
                            <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 0.5, borderColor: 'white', zIndex: 0, marginVertical: 15 }} />
                        </View>
                    </View>
                </View>

                <CustomBottomTab2 />
            </View>
        </TemplateBackground>
    )
}

export default connect(null, null)(CurhatKeTeman)