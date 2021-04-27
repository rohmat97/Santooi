import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { TemplateBackground } from '../../Components/TemplateBackground'
import { CalendarList } from 'react-native-calendars';

// Styles
import styles from '../Styles/LaunchScreenStyles'
import { Screen } from '../../Transforms/Screen'
import images from '../../Themes/Images';
import { Colors, Fonts } from '../../Themes'

export function DateBirth(props) {
    const { navigation } = props
    const { navigate } = navigation

    const today = new Date();
    const [dateBirth, setDateBirth] = useState('')
    const [showCalendar, setShowCalendar] = useState(false)

    return (
        <TemplateBackground cover={true}>
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Image source={images.logoSantui} style={{ width: Screen.width * 0.2, marginBottom: 20 }} resizeMode='contain' />
                    </View>
                    <Text style={{ color: '#35385D', fontWeight: 'bold', fontSize: 35, width: Screen.width * 0.7, marginBottom: 20 }}>Selamat datang, Mario.</Text>
                    <View style={styles.containerTextbox}>
                        <Text style={{ color: 'white', fontSize: Fonts.size.regular }}>Kapan ulang tahunmu?</Text>
                        <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)} style={styles.textBorder}>
                            <Text style={{ color: 'white', flex: 1, padding: 10 }}>{dateBirth}</Text>
                            <Image source={images.date} style={{ width: 20, height: 20, margin: 10 }}></Image>
                        </TouchableOpacity>
                        {showCalendar &&
                            <View style={{ backgroundColor: 'white', height: Screen.height * 0.4 }}>
                                <CalendarList
                                    hideArrows={false}
                                    pastScrollRange={3}
                                    futureScrollRange={0}
                                    scrollEnabled={true}
                                    pagingEnabled={true}
                                    style={{ padding: 0, margin: 0 }}
                                    hideExtraDays={false}
                                    onDayPress={(day) => setDateBirth(day)}
                                />
                            </View>
                        }
                    </View>
                    {/* {dateBirth != '' && */}
                    <TouchableOpacity onPress={() => navigate('PhoneNumberScreen')} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginEnd: 10 }}>
                        <Text style={{ color: 'white', marginEnd: 15, fontSize: Fonts.size.regular }}>Selanjutnya</Text>
                        <Image source={images.arrowRight} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    {/* } */}
                </View>
            </View>
        </TemplateBackground>
    )
}