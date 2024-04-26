import React, {useState} from 'react';
import {useRouter} from 'expo-router';
import { useNavigation } from '@react-navigation/native';

import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import background from "./assets/background.png"

const LandingScreen = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        navigation.navigate('LoginScreen')
    }
  
    const handleRegisterClick = async () => {
        navigation.navigate('RegisterScreen');
    }

    return (
        <SafeAreaView style={[styles.container, { marginTop: 50}]}>
        <View style={styles.hero}>
        <Image
            source={background}
            style={styles.heroImage}
            resizeMode="contain"
        />
        </View>
    
        <View style={styles.content}>
        <View style={styles.contentHeader}>
            <Text style={styles.title}>
            Welcome to Agrolink
            </Text>
            <Text style={styles.text}>
            Farming Resilience in the Palm of Your Hand
            </Text>

            <TouchableWithoutFeedback onPress={handleRegisterClick}>
                <View style={styles.registerTextContainer}>
                <Text style={[styles.text,styles.registerText]}>Register</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.loginButton, styles.button]}
                onPress={handleLogin}
                >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
    
    );
    };


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: '500',
      color: '#281b52',
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: 40,
    },
    text: {
      fontSize: 15,
      lineHeight: 24,
      fontWeight: '400',
      color: '#9992a7',
      textAlign: 'center',
    },
    /** Hero */
    hero: {
      backgroundColor: '#a3f0b1',
      margin: 12,
      borderRadius: 16,
      padding: 1,     
      paddingRight:10,
    },
    heroImage: {
      width: '100%',
      height: 400,
    },
    /** Content */
    content: {
      flex: 1,
      justifyContent: 'space-between',
      paddingTop:25,
      paddingHorizontal: 24,
    },
    contentHeader: {
      paddingHorizontal: 24,
    },
    registerText: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#02ba33', // customize the color as needed
        marginTop: 10,
      },
    appNameText: {
      fontSize: 28,
      fontWeight: '700',
      color: '#281b52',
    },
    /** Button */
    button: {
      backgroundColor: '#029c2b',
      paddingVertical: 12,
      paddingHorizontal: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      marginBottom:50,
    },
    buttonText: {
      fontSize: 15,
      fontWeight: '500',
      color: '#fff',
    },
  });

export default LandingScreen;