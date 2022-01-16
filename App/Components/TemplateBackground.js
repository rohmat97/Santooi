
import React from 'react';
import { Images, Metrics } from '../Themes'
import styles from '../Containers/Styles/LaunchScreenStyles'
import { ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';

export const TemplateBackground = ({ children, cover }) => (
    
        <ImageBackground source={Images.backgroundMain} style={styles.backgroundImage} >
            <SafeAreaView style={{flex:1}}>
                {/* <View style={{margin:Platform.OS==='android'?Metrics.baseMargin*2.5:0}}/> */}
                <StatusBar
                // animated={true}
                // backgroundColor="transparent"
                // barStyle={'dark-content'}
                // showHideTransition={'slide'}
                hidden
                // translucent ={true}
             />
            { cover == false &&
                <View style={styles.backgroundImage}>
                    {children}
                </View>
            }
            { cover == true &&
                <ImageBackground source={Images.coverMain} style={styles.backgroundImage} >
                    {children}
                </ImageBackground>
            }
            </SafeAreaView>
        </ImageBackground>
)