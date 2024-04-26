import React, {useEffect, useState, useContext} from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet, ActivityIndicator} from "react-native";
import { COLORS } from '../constants';
import blight from "../assets/images/blight.jpg"
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../user-context';
import { RNS3 } from 'react-native-aws3';
import { useNavigation } from '@react-navigation/native';


const DiseaseDetections = () => {
    const [data, setData] = useState([]);
    const [savedData, setSavedData] = useState([]);
    // const [name,email,setName,setEmail] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const email='san@mail.com';

    useEffect(() => {
        setLoading(true);
        const unsubscribe = navigation.addListener('focus', () => {
          // Code to execute when the screen is focused (navigated to)
          console.log('Screen focused, useEffect executed');
          getSavedDetections();
          fetchData();
        });
      
        // Cleanup function to unsubscribe the listener when the component unmounts
        return () => {
          unsubscribe();
        };
      }, [navigation]); // Ensure to include 'navigation' in the dependency array

      const fetchData = async () => {
        const predictionApiUrl = `https://d1z4yocc64.execute-api.us-east-1.amazonaws.com/getDetectionsByEmail`;
        try {
            const predictionResponse = await fetch(predictionApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    body: {
                        email: email,
                    },
                }),
            });
  
            const predictionData = await predictionResponse.json();
            console.log('Response:', predictionData);
  
            if (predictionData.length > 0){
                const mappedData = predictionData.map((point, index) => ({
                    datetime: new Intl.DateTimeFormat('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(new Date(point.datetime)),
                  //   datetime: point.datetime,
                    disease: point.disease,
                    diseaseImage: 'https://leaf-disease-img.s3.amazonaws.com/' + point.image.replace(/\s/g, ''),
                    location: point.lat + " " + point.lon
                  }));
                setData(mappedData);
                console.log("Alertrs array")
                console.log(mappedData)
                setLoading(false); // Move setLoading(false) inside the cleanup function
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      };

    const submitDetection = async (indexToRemove) => {
        const newArray = savedData.filter((_, index) => index !== indexToRemove);
        const itemToRemove = savedData[indexToRemove];
        try {
            setLoading(true);
            console.log("item to remove")
            console.log(itemToRemove)

            // AWS config goes here

            const file = {
                uri: itemToRemove['imageUri'],
                name: `${itemToRemove['date'].replace(' ', '')}.jpg`,
                type: "image/jpeg"
            }

            RNS3.put(file, config).then((response=>{
                console.log(response);
                const apiUrl = 'https://d1z4yocc64.execute-api.us-east-1.amazonaws.com/identifyDisease';
                const name = `${itemToRemove['date']}.jpg`;
                // Define your request body
                const requestBody = {
                    body: {
                        image: name.replace(' ', ''),
                        email: email,
                        lat: itemToRemove['lat'],
                        lon: itemToRemove['lon'],
                        date: itemToRemove['date'],
                    }
                };

                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                })
                .then(response => response.json())
                .then(data => {
                console.log('Response:', data);
                alert('Disease is ' + data['Prediction'] + '. There is a ' + data['probability'] + "% certainty level.");
                navigation.navigate('DiseaseDetails', {diseaseId: data['Prediction']});
                })
                .catch(error => {
                console.error('Error:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
            }))

            await AsyncStorage.removeItem('savedImageData');
            await AsyncStorage.setItem('savedImageData', JSON.stringify(newArray))
            setSavedData(newArray);
            console.log(`Item with key ${indexToRemove} removed successfully.`);
        } catch (error) {
            console.error('Error removing item from AsyncStorage:', error);
        }

    }

    const uploadImage = async () =>{
        if(image){
            try{
                await MediaLibrary.createAssetAsync(image);
                
                // AWS config goes here

                const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
                console.log(date);

                const file = {
                    uri: image,
                    name: `${date}.jpg`,
                    type: "image/jpeg"
                }
        
                RNS3.put(file, config).then((response=>{
                    console.log(response);
                    const apiUrl = 'https://d1z4yocc64.execute-api.us-east-1.amazonaws.com/identifyDisease';
                    const name = `${date}.jpg`;
                    // Define your request body
                    const requestBody = {
                        body: {
                            image: name,
                            email: email,
                            lat: lat,
                            lon: lon,
                            date: date,
                        }
                    };
                    
                    fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                    })
                    .then(response => response.json())
                    .then(data => {
                    console.log('Response:', data);
                    alert('Disease is ' + data['Prediction'] + '. There is a ' + data['probability'] + "% certainty level.");
                    navigation.navigate('DiseaseDetails', {diseaseId: 'Corn_(maize)___Common_rust_'});

                    })
                    .catch(error => {
                    console.error('Error:', error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
                }))
                setImage(null);
            } catch(e) {
                console.log(e)
            }        
        }
    }

    const getSavedDetections = async () => {
        try {
            // Retrieve saved image data from AsyncStorage
            const savedImageData = await AsyncStorage.getItem('savedImageData');
            
            // Parse the data from JSON
            const data =  JSON.parse(savedImageData) || [];
            console.log("fffff");     
            console.log(data);
            setSavedData(data);
            return data
        } catch (error) {
            console.error('Error retrieving saved image data:', error);
            return [];
        }
    }



    return(
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{padding: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                    style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: COLORS.black,
                        marginRight: 10, // Adjust the margin as needed
                    }}
                    >
                    Previous Detections
                    </Text>
                </View>

                <View style={styles.loaderContainer}>
                    {loading && (
                        <ActivityIndicator size='large' color={COLORS.primary} />
                    )}
                </View>   
                <View style={styles.mainContainer}>
                {!loading && savedData.map((item, index) => (
                    <View key={index} style={styles.detectionContainer}>
                        <Image
                        source={{ uri: item.imageUri }}
                        resizeMode="contain"
                        style={styles.gridItemImage}
                        />      
                        <View style={styles.textContainer}>
                        <Text>
                            <Text style={[styles.textDetails, { fontWeight: 'bold' }]}>Date taken: </Text>{item.date} {'\n'}
                            <Text style={[styles.textDetails, { fontWeight: 'bold' }]}>Status: </Text>
                            <Text style={{ color: 'red' }}>Unsubmitted</Text>{'\n'}
                            <Text style={[styles.textDetails, { fontWeight: 'bold' }]}>Location: </Text>{item.lat} {item.lon}
                        </Text>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => submitDetection(index)}
                        >
                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Submit</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    ))}


                
                    {!loading && data.map((item, index) => (
                        <View key={index} style={styles.detectionContainer}>
                        <Image
                            source={{ uri: item.diseaseImage }}
                            resizeMode="contain"
                            style={styles.gridItemImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.textDetails}>
                            <Text style={{ fontWeight: 'bold' }}>Date taken: </Text>{item.datetime}
                            </Text>
                            <Text style={styles.textDetails}>
                            <Text style={{ fontWeight: 'bold' }}>Status: </Text>
                            <Text style={{color:'green'}}>Submitted Identified</Text>
                            </Text>
                            <Text style={styles.textDetails}>
                            <Text style={{ fontWeight: 'bold' }}>Classification: </Text>{item.disease}
                            </Text>
                            <Text style={styles.textDetails}>
                            <Text style={{ fontWeight: 'bold' }}>Location: </Text>{item.location}
                            </Text>
                        </View>
                        </View>
                    ))}
                    
                    {/* <View style={styles.detectionContainer}>
                        <Image
                            source={blight}
                            resizeMode="contain"
                            style={styles.gridItemImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.textDetails}>
                                <Text style={{fontWeight:'bold'}}>Date taken: </Text>18/02/2024 14:51
                            </Text>
                            <Text style={styles.textDetails}>
                                <Text style={{fontWeight:'bold'}}>Status: </Text>Submitted
                            </Text>
                            <Text style={styles.textDetails}>
                                <Text style={{fontWeight:'bold'}}>Classification: </Text> Maize Rust
                            </Text>
                            <Text style={styles.textDetails}>
                                <Text style={{fontWeight:'bold'}}>Location: </Text>-123.2, -22.1
                            </Text>
                        </View>
                    </View> */}
                    <View style={{height:150}}>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DiseaseDetections;



const styles = StyleSheet.create({
    textDetails:{
        margin:1
    },
    submitButton: {
        padding:3,
        backgroundColor:'green',
        width:100,
        textAlign:'center',
        borderRadius:10
    },
    container:{
        flex:1,
        minHeight:500,
        marginTop:100,
    },
    detectionContainer:{
        backgroundColor:'lightgrey',
        height: 125,
        width: '90%',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop:10,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center', // Start from the left
    },
    gridItemImage: {
        width: 80, // Set a width for the image
        height: '100%', // Set a height for the image
        marginLeft: 10, // Adjust the spacing between the image and text
    },
    textContainer: {
        marginLeft:5,
        marginTop:10,
        justifyContent: 'center',
        // alignItems: 'center', // Center horizontally
    }



})



