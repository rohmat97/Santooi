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
import { OverlayDaftarPsikolog } from '../../Components/OverlayDaftarPsikolog';

function Konseling(props) {
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                        <TouchableOpacity
                            onPress={() => pop()}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Konseling</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <ScrollView> */}
                    <Image source={Images.menuKonseling} style={{ width: Screen.width * 0.6, height: Screen.width * 0.6, alignSelf: 'center' }} resizeMode='contain' />
                    {!conselingCode &&
                        <View style={{ marginHorizontal: Screen.width * 0.1 }}>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 14, marginBottom: 20 }}>Pilih salah satu:</Text>
                            <TouchableOpacity style={{
                                height: 50,
                                borderRadius: 16,
                                marginVertical: Metrics.baseMargin,
                                marginBottom: 20,
                                justifyContent: 'center',
                                backgroundColor: 'linear-gradient(73.44deg, rgba(231, 232, 245, 0.9) 7.15%, rgba(220, 227, 251, 0.9) 88.8%);'
                            }}
                             onPress={() => navigation.navigate('SelectKonseling')}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{
                                        color: '#35385D',
                                        textAlign: 'center',
                                        // fontWeight: 'bold',
                                        fontSize: Fonts.size.medium,
                                        marginVertical: Metrics.baseMargin
                                    }}>Saya ingin berkonsultasi</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                height: 50,
                                borderRadius: 16,
                                marginVertical: Metrics.baseMargin,
                                justifyContent: 'center',
                                backgroundColor: 'linear-gradient(73.44deg, rgba(231, 232, 245, 0.9) 7.15%, rgba(220, 227, 251, 0.9) 88.8%);'
                            }}
                                onPress={() => setConselingCode(true)}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{
                                        color: '#35385D',
                                        textAlign: 'center',
                                        // fontWeight: 'bold',
                                        fontSize: Fonts.size.medium,
                                        marginVertical: Metrics.baseMargin
                                    }}>Saya memberikan konsultasi</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }

                    {conselingCode &&
                        <View style={{ marginHorizontal: Screen.width * 0.05 }}>
                            <View style={styles.textbox}>
                                <View style={{ flex: 1 }}>
                                    <View style={{
                                        borderRadius: 4,
                                        height: 55,
                                        marginBottom: 12,
                                        overflow: 'hidden',
                                    }}>
                                        <TextInput
                                            inputRef={(ref) => (this.password = ref)}
                                            label="Masukkan kode unik"
                                            value={password}
                                            error={errorPassword}
                                            onChangeText={password => setPassword(password)}
                                            secureTextEntry={secureTextEntry}
                                            renderAccessory={() => onAccessoryPress(secureTextEntry)}
                                            style={styles.textInput}
                                            theme={{
                                                colors: {
                                                    placeholder: 'white',
                                                    text: 'white',
                                                    primary: 'white',
                                                }
                                            }}
                                            selectionColor={'#939598'}
                                        />
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                                    <Image source={secureTextEntry ? images.closeEye : images.eye} style={{ margin: 10, width: 30, height: 30, aspectRatio: 0.75 }} resizeMode='contain'></Image>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('KonselingWaiting')} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginEnd: 10, marginTop: 20 }}>
                                <Text style={{ color: 'white', marginEnd: 15, fontSize: Fonts.size.regular }}>Lanjut</Text>
                                <Image source={images.arrowRight} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: Screen.width*0.15 }}>
                                <Text style={{ color: 'white', fontSize: 13, marginRight: 10 }}>Belum terdaftar?</Text>
                                <TouchableOpacity onPress={toggleOverlay}>
                                    <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold', textDecorationLine: 'underline' }}>Daftar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {/* </ScrollView> */}
                    <OverlayDaftarPsikolog visible={visible} toggleOverlay={toggleOverlay} />
                </View>

            </View>
        </TemplateBackground>
    )
}

export default connect(null, null)(Konseling)