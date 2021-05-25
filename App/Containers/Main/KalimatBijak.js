import React, { useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, Alert } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { connect } from 'react-redux';

function KalimatBijak(props) {
    const { navigation } = props
    const { pop } = navigation

    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={{flex:1}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30,margin:24 }}>
                        <TouchableOpacity
                            onPress={() => pop()}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.arrowBack} style={{ width: 18, height: 18 }} resizeMode='contain' />
                            <Text style={{ color: '#67308F', marginLeft: 15, fontWeight: '500', fontSize: 16 }}>Kalimat Bijak</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <View style={{minHeight:155, backgroundColor:'#67308F', width:Screen.width*0.9,justifyContent:'center',alignItems:'center'}}>
                                <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12}}>
                                    <View style={{flexDirection:'row',width:80, justifyContent:'space-between', marginBottom:12}}>
                                        <Image source={images.sample1} style={{width:35,height:35}}/>
                                        <Image source={images.sample2} style={{width:35,height:35}}/>
                                    </View>
                                    <Text style={{color:'#662D91',padding:2}}>I hate them!!!</Text>
                                    <TouchableOpacity onPress={()=> Alert.alert('Still on development')}>
                                        <View style={{flexDirection:'row',width:'100%', justifyContent:'flex-end', marginBottom:12}}>
                                            <Image source={images.editButton} style={{width:65,height:25}} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <ScrollView>
                                <View style={{minHeight:155, height:undefined, backgroundColor:'#67308F', width:Screen.width*0.9,justifyContent:'center',alignItems:'center',marginTop:16,paddingBottom:12}}>
                                        <View style={{width:'90%', borderRadius:12, padding:12, paddingRight:12, flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                                            <Text style={{color:'white'}}>Kata-kata untuk diingat..</Text>
                                            <TouchableOpacity onPress={()=> Alert.alert('Still on development')}>
                                                <Image source={images.burgerIcon} style={{width:15,height:25}} resizeMode={'contain'}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12,margin:12}}>
                                            <Text style={{color:'#662D91',padding:2}}>Patience is when you’re supposed to get mad, but you choose to understand.</Text>
                                        </View>
                                        <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12,margin:12}}>
                                            <Text style={{color:'#662D91',padding:2}}>Breath is the power behind all things…. I breathe in and know that good things will happen</Text>
                                        </View>
                                        <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12,margin:12}}>
                                            <Text style={{color:'#662D91',padding:2}}>Breath is the power behind all things…. I breathe in and know that good things will happen</Text>
                                        </View>
                                        <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12,margin:12}}>
                                            <Text style={{color:'#662D91',padding:2}}>Breath is the power behind all things…. I breathe in and know that good things will happen</Text>
                                        </View>

                                </View>
                            </ScrollView>
                        </View>
                        
                </View>

            </View>
        </TemplateBackground>
    )
}

export default connect(null, null)(KalimatBijak)