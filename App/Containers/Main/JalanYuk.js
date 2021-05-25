import React, { useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, TextInput } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { connect } from 'react-redux';
import { OverlayJalanYuk } from '../../Components/OverlayJalanYuk';

function JalanYuk(props) {
    const { navigation } = props
    const { navigate,pop } = navigation

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => pop()}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Jalan yuk!</Text>
                        </View>
                    </TouchableOpacity>

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

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.3, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Recomended</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={{ color: '#67308F', marginLeft: 10, fontWeight: 'bold' }}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <ScrollView horizontal={true}>
                                <TouchableOpacity onPress={toggleOverlay}>
                                    <View style={{ flexDirection: 'column', marginBottom: 20, marginRight: 20 }}>
                                        <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3 }} resizeMode='contain' />
                                        <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>Kopi Kenangan</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>7, Jl.Lamandau III ..</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>0.5 km</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleOverlay}>
                                    <View style={{ flexDirection: 'column', marginBottom: 20, marginRight: 20 }}>
                                        <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3 }} resizeMode='contain' />
                                        <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>Kopi Kenangan</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>7, Jl.Lamandau III ..</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>0.5 km</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleOverlay}>
                                    <View style={{ flexDirection: 'column', marginBottom: 20, marginRight: 20 }}>
                                        <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3 }} resizeMode='contain' />
                                        <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>Kopi Kenangan</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>7, Jl.Lamandau III ..</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>0.5 km</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#D9078D', borderStyle: 'dashed' }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                            <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.3, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>History</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3 }} resizeMode='contain' />
                            <View style={{ marginLeft: 20, height: Screen.width * 0.3, flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <View style={{ backgroundColor: '#67308F', width: Screen.width * 0.2, alignItems: 'center', borderRadius: 100, padding: 5, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                    <Image source={images.addChart} style={{ width: 15, height: 15 }} resizeMode='contain' />
                                    <Text style={{ color: 'white', fontWeight: '500', marginLeft: 10, fontSize:12}}>Pesan</Text>
                                </View>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>Kopi Kenangan</Text>
                                <Text style={{ color: 'white', fontWeight: '500', marginBottom: 10, fontSize: 13 }}>03 Dec 2020, 16:06</Text>
                                <Text style={{ color: 'white', fontWeight: '500', width: Screen.width * 0.4, fontSize: 13 }}>7, Jl.Lamandau III No.04, RT.04/RW.07, Kramat Pela</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3 }} resizeMode='contain' />
                            <View style={{ marginLeft: 20, height: Screen.width * 0.3, flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Kopi Kenangan</Text>
                                <Text style={{ color: 'white', fontWeight: '500', marginBottom: 10 }}>03 Dec 2020, 16:06</Text>
                                <Text style={{ color: 'white', fontWeight: '500', width: Screen.width * 0.4 }}>7, Jl.Lamandau III No.04, RT.04/RW.07, Kramat Pela</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <OverlayJalanYuk visible={visible} toggleOverlay={toggleOverlay} />
                </View>
            </View>
        </TemplateBackground>
    )
}

export default connect(null, null)(JalanYuk)