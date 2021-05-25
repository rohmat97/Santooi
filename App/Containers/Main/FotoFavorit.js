import React, { useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { connect } from 'react-redux';

function FotoFavorit(props) {
    const { navigation } = props
    const { pop } = navigation

    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                        <TouchableOpacity
                            onPress={() => pop()}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Foto-foto Favorit</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={{ width: Screen.width, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'column', marginBottom: 20, width:Screen.width*0.5}}>
                                <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3, aspectRatio:1.5 }} />
                                <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>Semua Galeri</Text>
                                    <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>501 items</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', marginBottom: 20, width:Screen.width*0.5}}>
                                <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3, aspectRatio:1.5 }}/>
                                <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>Favorit Escape</Text>
                                    <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>114 items</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: Screen.width, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'column', marginBottom: 20, width:Screen.width*0.5}}>
                                <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3, aspectRatio:1.5 }} />
                                <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>Semua Galeri</Text>
                                    <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>501 items</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', marginBottom: 20, width:Screen.width*0.5}}>
                                <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3, aspectRatio:1.5 }}/>
                                <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>Favorit Escape</Text>
                                    <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>114 items</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: Screen.width, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'column', marginBottom: 20, width:Screen.width*0.5}}>
                                <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3, aspectRatio:1.5 }} />
                                <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>Semua Galeri</Text>
                                    <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>501 items</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', marginBottom: 20, width:Screen.width*0.5}}>
                                <Image source={images.kopiKenangan} style={{ width: Screen.width * 0.3, height: Screen.width * 0.3, aspectRatio:1.5 }}/>
                                <View style={{ width: Screen.width * 0.3, flexDirection: 'column', marginTop: 20 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>Favorit Escape</Text>
                                    <Text style={{ color: 'white', fontWeight: 'bold', width: Screen.width * 0.3, fontSize: 13 }}>114 items</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <Image source={images.addFill} style={{ width: Screen.width, height: Screen.width * 0.13, alignSelf: 'center', marginBottom: Screen.width * 0.1, marginTop:10, flexDirection:'column', justifyContent:'flex-end'}} resizeMode='contain' />
                </View>

            </View>
        </TemplateBackground>
    )
}

export default connect(null, null)(FotoFavorit)