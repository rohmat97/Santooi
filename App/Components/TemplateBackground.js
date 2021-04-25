
import React from 'react';
import { Images } from '../Themes'
import styles from '../Containers/Styles/LaunchScreenStyles'
import { ImageBackground } from 'react-native';
export const TempateBackground = ({ children })  =>(
    <ImageBackground source={Images.backgroundMain} style={styles.backgroundImage} >
        <ImageBackground source={Images.coverMain} style={styles.backgroundImage} >
            {children}
        </ImageBackground>
    </ImageBackground>
)