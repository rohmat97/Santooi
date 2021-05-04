
import React from 'react';
import { Images } from '../Themes'
import styles from '../Containers/Styles/LaunchScreenStyles'
import { ImageBackground, View } from 'react-native';

export const TemplateBackground = ({ children, cover }) => (
    <ImageBackground source={Images.backgroundMain} style={styles.backgroundImage} >
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
    </ImageBackground>
)