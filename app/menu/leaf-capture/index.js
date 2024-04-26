import {useState, useEffect, useContext} from 'react';
import {useRouter} from 'expo-router';
import {View, Text, ScrollView, SafeAreaView, ActivityIndicator} from 'react-native';
import { useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'react-native';
import {CameraButton} from '../../components';
import styles from './styles';
import { RNS3 } from 'react-native-aws3';
import {aws} from './keys';
import { COLORS } from "../../constants";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
// import BottomNav from '../bottomNav';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserContext from '../../user-context';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LeafCapture = () => {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);
    const [currentLat, setCurrentLat] = useState(0);
    const [currentLon, setCurrentLon] = useState(0);
    const navigation = useNavigation();
    const [name,email,setName,setEmail] = useContext(UserContext);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        })
        console.log(result['assets'][0]['uri']);
        if(!result.cancelled){
            setImage(result['assets'][0]['uri']);
        }
    }

    const getLocation = async () => {
        try{
            const loc = await Location.getCurrentPositionAsync();
            const lat = loc['coords']['latitude'].toString();
            const lon = loc['coords']['longitude'].toString();
            setCurrentLat(lat);
            setCurrentLon(lon);  
            console.log("my current location is")
            console.log(loc);
        } catch(e){
            console.log(e)
        }
    }


    useEffect(()=>{
        (async () =>{
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus === 'granted');
        })();
        getLocation()
    }, [])

    const takePicture = async () => {
        if(cameraRef){
            try{
                const data = await cameraRef.current.takePictureAsync();
                setImage(data.uri);
            } catch(e) {
                console.log(e);
            }
        } 
    }

    const saveImage = async () => {
        if(image){
            try{
                const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                // setLoading(true);
                const asset = await MediaLibrary.createAssetAsync(image);
                // setImage(null);
                
                // await getLocation();

                const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
                console.log(date);

                const data_to_save = {
                    id: date,
                    lat: currentLat,
                    lon: currentLon,
                    date:date,
                    imageUri: asset.uri,
                }
                console.log(data_to_save);

                const existingData = JSON.parse(await AsyncStorage.getItem('savedImageData')) || [];

                // Append the new data to the existing array
                existingData.unshift(data_to_save);
          
                // Save the updated array back to AsyncStorage
                await AsyncStorage.setItem('savedImageData', JSON.stringify(existingData));
          
                console.log('Additional data saved:', data_to_save);
                const savedImageData = await AsyncStorage.getItem('savedImageData');
                // Parse the data from JSON
                const data =  JSON.parse(savedImageData) || [];
            }catch(e) {
                console.log(e)
            }     
        } 
    }

    const uploadImage = async () =>{
        // navigation.navigate('DiseaseDetails', {diseaseId: 'Apple - Cedar Rust'});
        if(image){
            try{
                setLoading(true);
                await MediaLibrary.createAssetAsync(image);
                
                const loc = await Location.getCurrentPositionAsync();
                const lat = loc['coords']['latitude'].toString();
                const lon = loc['coords']['longitude'].toString();
                setCurrentLat(lat);
                setCurrentLon(lon);  
                
                // AWS Config goes here


                const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
                console.log(date);

                const file = {
                    uri: image,
                    name: `${date.replace(' ', '')}.jpg`,
                    type: "image/jpeg"
                }
        
                RNS3.put(file, config).then((response=>{
                    console.log(response);
                    const apiUrl = 'https://d1z4yocc64.execute-api.us-east-1.amazonaws.com/identifyDisease';
                    const name = `${date.replace(' ', '')}.jpg`;
                    // Define your request body
                    const requestBody = {
                        body: {
                            image: name,
                            email: 'san@mail.com',
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
                    navigation.navigate('DiseaseDetails', {diseaseId: data['Prediction']});

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

    return (
        <View style={styles.container}>
            {!image ?
            
            <Camera style={styles.camera}
            type={type}
            FlashMode={flash}
            ref={cameraRef}
            >

            <Text>
                Hello
            </Text>
            </Camera>
            :
            <View style={styles.imageContainer}>
                <Image source={{uri:image}} style={{ width: '100%', height: '100%' }}/>
            </View>
            }

            <View style={styles.loaderContainer}>
                {loading && (
                    <ActivityIndicator size='large' color={COLORS.primary} />
                )}
            </View>       
            
            <View>
                {image ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between', // Equally space the child views
                        alignItems: 'center', // Center the child views vertically
                        paddingHorizontal: 0,
                        position: 'absolute',
                        bottom: -90,
                        width: '100%', 
                    }}>
                        <TouchableOpacity style={styles.cameraButton}>
                            <CameraButton title={"Re-take"} icon="retweet" onPress={() => setImage(null)}/>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.cameraButton}>
                            <CameraButton title={"Upload"} icon="upload" onPress={() => uploadImage(null)}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cameraButton}>
                            <CameraButton title={"Store"} icon="check" onPress={() => saveImage(null)}/>
                        </TouchableOpacity>
                    </View>    
                :
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', // Equally space the child views
                    alignItems: 'center', // Center the child views vertically
                    paddingHorizontal: 50,
                    position: 'absolute',
                    bottom: 150,
                    width: '100%', 
                }}>
                    <TouchableOpacity style={styles.cameraButton}>
                        <CameraButton style={styles.cameraButton} title={'Camera'} icon="camera" onPress={takePicture}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cameraButton}>
                        <CameraButton style={styles.cameraButton} title={'Gallery'} icon="camera" onPress={pickImage}/>
                    </TouchableOpacity>
                </View> 
                }          
                </View>
               
        </View>
    )
}
export default LeafCapture;