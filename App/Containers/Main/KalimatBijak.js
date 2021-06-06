import React, { useEffect, useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, Alert } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import images from '../../Themes/Images';
import styles from '../Styles/LaunchScreenStyles'
import Colors from '../../Themes/Colors'
import { Screen } from '../../Transforms/Screen'
import { connect } from 'react-redux';
import { CheckBox, Overlay } from 'react-native-elements';
import { bindActionCreators } from 'redux';
//redux
import KalimatBijakRedux from '../../Redux/KalimatBijak/KalimatBijakRedux';
import TokenRedux from '../../Redux/Authentication/TokenRedux'

function KalimatBijak(props) {
    const { navigation, token, listKalimatBijak, KalimatBijakRequest } = props
    const { pop } = navigation
    const [visible, setvisible] = useState(false)
    const [filter, setfilter] = useState()
    const [filterByLatest, setfilterByLatest] = useState(false)
    const [filterByFavorite, setfilterByFavorite] = useState(false)

    useEffect(()=>{
        const payload= {
            "fav":null,
            "filter":'ASC',
            "token":token.data.access_token
        }
        KalimatBijakRequest(payload)
    },[])
    useEffect(()=>{
        if(listKalimatBijak){
            console.log('listKalimatBijak',listKalimatBijak.data)
        }
    },[listKalimatBijak])
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
                                            <TouchableOpacity onPress={()=> setvisible(true)}>
                                                <Image source={images.burgerIcon} style={{width:15,height:25}} resizeMode={'contain'}/>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            listKalimatBijak && listKalimatBijak.data && listKalimatBijak.data.map(data =>(
                                            <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12,margin:12,flexDirection:'column',justifyContent:'space-between'}}>
                                                <Text style={{color:'#662D91',padding:2}}>{data.name}</Text>
                                                <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'flex-end'}}>
                                                    <Text style={{color:'#8B8F93',padding:2, fontSize:12}}>{data.update_at}</Text>
                                                    <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',maxWidth:100,marginBottom:-20}}>
                                                        <CheckBox
                                                            checkedIcon={ <Image source={images.StarChecked} style={{width:40,height:40}} resizeMode={'contain'}/>}
                                                            uncheckedIcon={<Image source={images.StarUncheck} style={{width:25,height:25}} resizeMode={'contain'}/>}
                                                            checked={data.is_favorite}
                                                            // onPress={() => this.setState({checked: !this.state.checked})}
                                                            />
                                                        <Image source={images.share} style={{width:35,height:35}} resizeMode={'contain'}/>
                                                    </View>
                                                </View>
                                            </View>
                                            ))
                                        }
                                        {/* <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12,margin:12,flexDirection:'column',justifyContent:'space-between'}}>
                                            <Text style={{color:'#662D91',padding:2}}>Patience is when you’re supposed to get mad, but you choose to understand.</Text>
                                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'flex-end'}}>
                                                <Text style={{color:'#8B8F93',padding:2, fontSize:12}}>07/05/2021</Text>
                                                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',maxWidth:100,marginBottom:-20}}>
                                                    <CheckBox
                                                        checkedIcon={ <Image source={images.StarChecked} style={{width:40,height:40}} resizeMode={'contain'}/>}
                                                        uncheckedIcon={<Image source={images.StarUncheck} style={{width:25,height:25}} resizeMode={'contain'}/>}
                                                        checked={true}
                                                        // onPress={() => this.setState({checked: !this.state.checked})}
                                                        />
                                                    <Image source={images.share} style={{width:35,height:35}} resizeMode={'contain'}/>
                                                </View>
                                            </View>
                                        </View> */}
                                        {/* <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12,margin:12}}>
                                            <Text style={{color:'#662D91',padding:2}}>Breath is the power behind all things…. I breathe in and know that good things will happen</Text>
                                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'flex-end'}}>
                                                <Text style={{color:'#8B8F93',padding:2, fontSize:12}}>07/05/2021</Text>
                                                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',maxWidth:100,marginBottom:-20}}>
                                                    <CheckBox
                                                        checkedIcon={ <Image source={images.StarChecked} style={{width:40,height:40}} resizeMode={'contain'}/>}
                                                        uncheckedIcon={<Image source={images.StarUncheck} style={{width:25,height:25}} resizeMode={'contain'}/>}
                                                        checked={true}
                                                        // onPress={() => this.setState({checked: !this.state.checked})}
                                                        />
                                                    <Image source={images.share} style={{width:35,height:35}} resizeMode={'contain'}/>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12,margin:12}}>
                                            <Text style={{color:'#662D91',padding:2}}>Breath is the power behind all things…. I breathe in and know that good things will happen</Text>
                                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                <Text style={{color:'#8B8F93',padding:2, fontSize:12}}>07/05/2021</Text>
                                                <View style={{flexDirection:'row',justifyContent:'space-between',minWidth:70,alignItems:'center'}}>
                                                    <Image source={images.StarChecked} style={{width:40,height:40}} resizeMode={'contain'}/>
                                                    <Image source={images.share} style={{width:35,height:35}} resizeMode={'contain'}/>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{backgroundColor:'white',minHeight:123,width:'90%', borderRadius:12, padding:12,margin:12}}>
                                            <Text style={{color:'#662D91',padding:2}}>Breath is the power behind all things…. I breathe in and know that good things will happen</Text>
                                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'flex-end'}}>
                                                <Text style={{color:'#8B8F93',padding:2, fontSize:12}}>07/05/2021</Text>
                                                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',maxWidth:100,marginBottom:-20}}>
                                                    <CheckBox
                                                        checkedIcon={ <Image source={images.StarChecked} style={{width:40,height:40}} resizeMode={'contain'}/>}
                                                        uncheckedIcon={<Image source={images.StarUncheck} style={{width:25,height:25}} resizeMode={'contain'}/>}
                                                        checked={true}
                                                        // onPress={() => this.setState({checked: !this.state.checked})}
                                                        />
                                                    <Image source={images.share} style={{width:35,height:35}} resizeMode={'contain'}/>
                                                </View>
                                            </View>
                                        </View> */}

                                </View>
                            </ScrollView>
                        </View>  
                </View>
            </View>
            <Overlay visible={visible} onBackdropPress={()=> setvisible(false)} overlayStyle={{width:Screen.width, minHeight:100, position:'absolute',bottom:0, borderTopLeftRadius:16, borderTopRightRadius:16}}>
                <View style={{padding:12}}>
                    <Text style={{paddingVertical:16}}>Pilih Berdasarkan</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{setfilterByFavorite(!filterByFavorite)}}>
                        <Text style={{fontWeight:'bold',paddingVertical:12}}>Favorit</Text>
                        </TouchableOpacity>
                        <CheckBox
                            checkedIcon={<Image source={images.checklist} style={{width:20,height:20}} resizeMode='contain'/>}
                            uncheckedIcon={null}
                            checked={filterByFavorite}
                            onPress={() => setfilterByFavorite(!filterByFavorite)}
                        />  
                    </View>
                    <View>
                        <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{fontWeight:'bold',paddingVertical:12}}>Tanggal Terbaru</Text>
                            <CheckBox
                                checkedIcon={<Image source={images.Checked} style={{width:20,height:20}} resizeMode='contain'/>}
                                uncheckedIcon={<Image source={images.unChecked} style={{width:20,height:20}} resizeMode='contain'/>}
                                checked={filterByLatest?false:true}
                                onPress={() => setfilterByLatest(false)}
                            />  
                        </View>
                    </View>
                    <View>
                        <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold',paddingVertical:12}}>Tanggal Terlama</Text>
                            <CheckBox
                                checkedIcon={<Image source={images.Checked} style={{width:20,height:20}} resizeMode='contain'/>}
                                uncheckedIcon={<Image source={images.unChecked} style={{width:20,height:20}} resizeMode='contain'/>}
                                checked={filterByLatest?true:false}
                                onPress={() => setfilterByLatest(true)}
                            />  
                        </View>
                    </View>
                </View>
            </Overlay>
        </TemplateBackground>
    )
}


const mapStateToProps = (state) => {
    return {
      token: state.token.payload,
      listKalimatBijak: state.kalimatbijak.payload
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign(KalimatBijakRedux,TokenRedux), dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(KalimatBijak)