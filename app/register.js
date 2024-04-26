import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {COLORS} from './constants';
import Checkbox from "expo-checkbox";
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import background from "./assets/background1.png"
import { MultipleSelectList  } from 'react-native-dropdown-select-list'
import * as Location from 'expo-location';
import UserPool from './UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const RegisterScreen = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [selected, setSelected] = useState([]);
    const [currentLocation, setCurrentLocation] = useState('');
    const [currentLat, setCurrentLat] = useState(0);
    const [currentLon, setCurrentLon] = useState(0);
    const [currentName, setCurrentName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const navigation = useNavigation();

    const handleRegister = async () => {
        UserPool.signUp(currentEmail, currentPassword, [], null, (err,data)=>{
            if(err){
               console.log(err); 
            }else{
                try{
                    try{
                        const apiUrl = `https://d1z4yocc64.execute-api.us-east-1.amazonaws.com/addUser`;
                        fetch(apiUrl, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            email: currentEmail,
                            name: currentName,
                            crops: selected.map((crop) => crop),
                            lat: currentLat,
                            lon: currentLon,
                            }),
                        })
                        .then(response => response.json())
                        .then(data => {
                        console.log('Response:', data);
                        })
                        .catch(error => {
                        console.error('Error:', error);
                        })
                        } catch (error) {
                            console.log("error")
                        }
                        navigation.navigate('LoginScreen')
                } catch (error) {
                    console.log("error")
                }
                  
            }
            console.log(data);
        })
        console.log(currentEmail)
        console.log(currentPassword)     
    }

    const handleGetLocation = async () => {
        let {status}  = await Location.requestForegroundPermissionsAsync();

        if (status = 'granted') {
            console.log("permission successful");
        } else {
            console.log("permission not successful")
        }

        const loc = await Location.getCurrentPositionAsync();
        const lat = loc['coords']['latitude'].toString();
        const lon = loc['coords']['longitude'].toString();
        setCurrentLat(lat);
        setCurrentLon(lon);
    }

    const handleSelect = (val) => {
        console.log('Selected values:', val);
        setSelected(val);
    };

    const data = [
        {key:'1', value:'Cherry'},
        {key:'2', value:'Corn'},
        {key:'3', value:'Apple'},
        {key:'4', value:'Maize'},
    ]

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
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
                            Create Account
                        </Text>

                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                            marginTop: 10,
                        }}>Start farming smartly today!</Text>
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
                                value={currentEmail}
                                onChangeText={(text) => setCurrentEmail(text)}
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
                                value={currentPassword}
                                onChangeText={(text) => setCurrentPassword(text)}
                            />

                            <TouchableOpacity
                                onPress={() => setIsPasswordShown(!isPasswordShown)}
                                style={{
                                    position: "absolute",
                                    right: 12
                                }}
                            >
                                {/* {
                                    isPasswordShown == true ? (
                                        <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                    ) : (
                                        <Ionicons name="eye" size={24} color={COLORS.black} />
                                    )
                                } */}

                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Name</Text>

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
                                placeholder='Enter your name'
                                placeholderTextColor={COLORS.black}
                                style={{
                                    width: "100%"
                                }}
                                value={currentName}
                                onChangeText={(text) => setCurrentName(text)}
                            />
                        </View>
                    </View>


                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Crops grown:</Text>
                            <MultipleSelectList 
                                setSelected={setSelected} 
                                data={data} 
                                save="value" 
                                label="Crop Types"
                                defaultOption={[]}                                   
                            />
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Current Location</Text>

                    <View style={{ flexDirection: 'row', width: '100%', height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8 }}>
                            <TextInput
                            placeholder='Get Location'
                            placeholderTextColor={COLORS.black}
                            style={{ flex: 1, paddingLeft: 22 }}
                            value={`${currentLat} ${currentLon}`}
                            onChangeText={(text) => setCurrentLocation(text)}
                            />

                            <TouchableOpacity
                            style={{ padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}
                            onPress={handleGetLocation}
                            >
                            <Text style={{ color: COLORS.white }}>Get</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 6
                    }}>
                        <Checkbox
                            style={{ marginRight: 8 }}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? COLORS.primary : undefined}
                        />

                        <Text>I agree to the terms and conditions</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.loginButton, styles.button]}
                            onPress={handleRegister}
                            >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

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


export default RegisterScreen;