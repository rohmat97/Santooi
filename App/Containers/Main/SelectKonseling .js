import React, { useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import { connect } from 'react-redux';
import Images from '../../Themes/Images';
import RoundedButton from '../../Components/RoundedButton';
import { Fonts, Colors, Metrics } from '../../Themes/'
import { OverlayDaftarPsikolog } from '../../Components/OverlayDaftarPsikolog';

function SelectKonseling(props) {
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
                            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Konseling</Text>
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

                    <ScrollView>
                        <View style={style.container}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={images.konselor} style={{ width: Screen.width * 0.15, height: Screen.width * 0.15 }} resizeMode='contain' />
                                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Dr. Eva Suryani, Sp.KJ</Text>
                                    <Text>Phychiatrist</Text>
                                    <Text>Experience 8 years</Text>
                                    <Text>Next Available: Monday, 17:00-20:00 WIB</Text>
                                    <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Rp.35.000/session</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: Screen.width * 0.85 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={images.seeMore} style={{ width: 15, height: 15, marginEnd: 10 }} resizeMode='contain' />
                                    <Text style={{ color: '#67308F' }}>See More</Text>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: '#67308F', width: Screen.width * 0.5, alignItems: 'center', borderRadius: 100, padding: 2, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Image source={images.available} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                    <Text style={{ color: 'white', fontWeight: '500', marginLeft: 5, fontSize: 13 }}>Notify when available</Text>
                                </View>
                            </View>
                        </View>

                        <View style={style.container}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={images.konselor} style={{ width: Screen.width * 0.15, height: Screen.width * 0.15 }} resizeMode='contain' />
                                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Dr. Eva Suryani, Sp.KJ</Text>
                                    <Text>Phychiatrist</Text>
                                    <Text>Experience 8 years</Text>
                                    <Text>Next Available: Monday, 17:00-20:00 WIB</Text>
                                    <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Rp.35.000/session</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: Screen.width * 0.85 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={images.seeMore} style={{ width: 15, height: 15, marginEnd: 10 }} resizeMode='contain' />
                                    <Text style={{ color: '#67308F' }}>See More</Text>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: '#67308F', width: Screen.width * 0.5, alignItems: 'center', borderRadius: 100, padding: 2, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Image source={images.available} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                    <Text style={{ color: 'white', fontWeight: '500', marginLeft: 5, fontSize: 13 }}>Notify when available</Text>
                                </View>
                            </View>
                        </View>

                        <View style={style.container}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={images.konselor} style={{ width: Screen.width * 0.15, height: Screen.width * 0.15 }} resizeMode='contain' />
                                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Dr. Eva Suryani, Sp.KJ</Text>
                                    <Text>Phychiatrist</Text>
                                    <Text>Experience 8 years</Text>
                                    <Text>Next Available: Monday, 17:00-20:00 WIB</Text>
                                    <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Rp.35.000/session</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: Screen.width * 0.85 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={images.seeMore} style={{ width: 15, height: 15, marginEnd: 10 }} resizeMode='contain' />
                                    <Text style={{ color: '#67308F' }}>See More</Text>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: '#67308F', width: Screen.width * 0.5, alignItems: 'center', borderRadius: 100, padding: 2, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Image source={images.available} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                    <Text style={{ color: 'white', fontWeight: '500', marginLeft: 5, fontSize: 13 }}>Notify when available</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </View>
        </TemplateBackground>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 30,
        marginTop: Screen.height * 0.01,
        // marginHorizontal:40,
        marginBottom: 20,
        // flexDirection:'row'
    }
})

export default connect(null, null)(SelectKonseling)