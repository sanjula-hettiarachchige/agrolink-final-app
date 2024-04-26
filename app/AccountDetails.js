// Import necessary dependencies
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput,Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { images } from './constants'; // Assuming images is imported correctly
import UserContext from './user-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from './constants';
import { StyleSheet } from 'react-native';
import { MultipleSelectList  } from 'react-native-dropdown-select-list'
import Checkbox from "expo-checkbox";
import * as Location from 'expo-location';

const AccountDetails = () => {

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [name,email, monitorDiseases,setName,setEmail, setmonitorDiseases] = useContext(UserContext);

    const [selected, setSelected] = useState([{key:'1', value:'Cherry'}]);
    const [currentLocation, setCurrentLocation] = useState('');
    const [currentLat, setCurrentLat] = useState(0);
    const [currentLon, setCurrentLon] = useState(0);
    const [currentName, setCurrentName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const navigation = useNavigation();

    const data = [
        {key:'1', value:'Cherry'},
        {key:'2', value:'Corn'},
        {key:'3', value:'Apple'},
        {key:'4', value:'Maize'},
    ]

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
        console.log("printing current loartion")
        console.log(loc)
    }

    const handleRegister = async () =>{
        console.log("pressed");
    }

    useEffect(() => {
        const fetchData = async () =>{
            console.log("Ff")
            try{
                const apiUrl = `https://d1z4yocc64.execute-api.us-east-1.amazonaws.com/getUserDetails`;
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    email: 'san@mail.com',
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Printing user details")
                    setCurrentName(data['Items'][0]['name'])
                    setEmail(data['Items'][0]['username'])
                    const crops = data.Items[0].crops.flatMap(item => item);
                    // setSelected(crops)
                })
                .then(data =>{
                    console.log("printing the vlaues")
                    console.log(name)
                    console.log(email)
                    console.log(selected)
                })
                .catch(error => {
                console.error('Error:', error);
                })
                handleGetLocation();
            } catch (error) {
                console.log("error")
            }
        }
        fetchData();

    },[navigation])

    return (
        <SafeAreaView style={{flex:1, paddingTop:100}}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            marginVertical: -5,
                            color: COLORS.black
                        }}>
                            Edit Account Details
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
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
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
                                data={data} 
                                save="value" 
                                label="Crop Types"
                                defaultOption={['Cherry']}                                   
                                setSelected={setSelected} 
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
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.loginButton, styles.button]}
                            onPress={handleRegister}
                            >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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

export default AccountDetails;