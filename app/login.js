import React, {useState, useContext} from 'react';
import {View, Text, Image,TextInput, TouchableOpacity, ScrollView,StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import {COLORS, SIZES} from './constants';
import UserPool from './UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import background from "./assets/background1.png"
import { useNavigation } from '@react-navigation/native';
import UserContext from './user-context';

const LoginScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigation = useNavigation();
  const [name,email,monitorDiseases,setName,setEmail,setmonitorDiseases] = useContext(UserContext);

  const handleLogin = async () => {
        const user = new CognitoUser({
            Username: username,
            Pool: UserPool,
        })

        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        });
        console.log(username)
        console.log(password)
        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess: ", data);
                try{
                    const apiUrl = `https://d1z4yocc64.execute-api.us-east-1.amazonaws.com/getUserDetails`;
                    fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                        email: username,
                        }),
                    })
                    .then(response => response.json())
                    .then(data => {
                    setName(data['Items'][0]['name'])
                    setEmail(data['Items'][0]['username'])
                    const crops = data.Items[0].crops.flatMap(item => item);
                    setmonitorDiseases(crops)
                    })
                    .catch(error => {
                    console.error('Error:', error);
                    })
                    
                } catch (error) {
                    console.log("error")
                }
                navigation.navigate('BottomNav')
            },
            onFailure: (err) => {
                console.log("onFailure: ", err);
            },
            newPasswordRequired: (data) =>{
                console.log("newPasswordRequired: ", data);
            },
        });
    }
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <View style={styles.hero}>
            <Image
                source={background}
                style={styles.heroImage}
                resizeMode="contain"
            />
        </View>
        
        <View style={{ flex: 1, marginHorizontal: 22 }}>
            <View style={{ marginVertical: 22 }}>
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginVertical: -5,
                    color: COLORS.black
                }}>
                    Login to your account
                </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8
                }}>Email address</Text>

                <View style={{
                    width: "100%",
                    height: 48,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22
                }}>
                    <TextInput
                        placeholder='Enter your email address'
                        placeholderTextColor={COLORS.black}
                        keyboardType='email-address'
                        style={{
                            width: "100%"
                        }}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
            </View>

            <View style={{ marginBottom: 12 }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8
                }}>Password</Text>

                <View style={{
                    width: "100%",
                    height: 48,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22
                }}>
                    <TextInput
                        placeholder='Enter your password'
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={!isPasswordShown}
                        style={{
                            width: "100%"
                        }}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />

                    <TouchableOpacity
                        onPress={() => setIsPasswordShown(!isPasswordShown)}
                        style={{
                            position: "absolute",
                            right: 12
                        }}
                    >
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.loginButton, styles.button, {marginBottom:200, marginTop:100}]}
                        onPress={handleLogin}
                        >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
)};


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#029c2b',
        paddingVertical: 2,
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
    loginButton: {
        backgroundColor: 'purple',
        borderRadius: 15, // Adjust the border radius as needed
        paddingVertical: 5,
        paddingHorizontal: 20,
        alignSelf: 'center', // Center the button horizontally
        marginTop: 10, // Adjust the m
        height: 40,
        width: 100
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        alignSelf: 'center',
    },
    hero: {
        backgroundColor: '#a3f0b1',
        margin: 12,
        borderRadius: 16,
        padding: 1,     
        paddingRight:10,
        paddingVertical: 20,
    },
        heroImage: {
        width: '50%',
        height: 170,
        borderRadius: 10,
        
        alignSelf: 'center',
    },
})


export default LoginScreen;