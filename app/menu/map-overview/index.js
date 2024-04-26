import React, {useState, useEffect, useContext,Component} from 'react';
import {useRouter} from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import {View, Image, StyleSheet, Platdform, TouchableOpacity, Text, ScrollView, SafeAreaView} from 'react-native';
import MapView, { Callout, Heatmap, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import LoginScreen from '../../login';
import TabButton from '../../components/TabButton';
import LeafCapture from '../leaf-capture';
import * as Location from 'expo-location';
import UserContext from '../../user-context';

// import BottomNav from '../bottomNav';

const MapOverView = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const Tab = createBottomTabNavigator();
    const [name,email, monitorDiseases,setName,setEmail, setmonitorDiseases] = useContext(UserContext);
    const [currentLat, setCurrentLat] = useState(0);
    const [currentLon, setCurrentLon] = useState(0);

    const handleLogin = async () => {
        navigation.navigate('LoginScreen')
    }
  
    const handleRegisterClick = async () => {
        navigation.navigate('RegisterScreen');
    }

    const state = {
        initialPosition: {
            latitude: 37.422,
            longitude: -122.09,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
        }
    }

    const points = [
        { latitude: 40.7828, longitude: -74.0065, weight: 1 },
      ];
    console.log(points)
    console.log("monitor diseases")
    console.log(monitorDiseases)
    const mapRef = React.createRef();

    const iconRefs = [
        require('../../assets/red-dot.png'),
        require('../../assets/blue-dot.png'),
        require('../../assets/green-dot.png'),
        require('../../assets/purple-dot.png'),
        require('../../assets/yellow-dot.png'),
    ];

    const [predictionPoints, setPredictionPoints] = useState(points);
    const [detectionPoints, setDetectionPoints] = useState(points);

    useEffect(() => {
        const handleGetLocation = async () => {
            const loc = await Location.getCurrentPositionAsync();
            const lat = loc['coords']['latitude'].toString();
            const lon = loc['coords']['longitude'].toString();
            setCurrentLat(lat);
            setCurrentLon(lon);
            // mapRef.current.animateCamera({center: {"latitude":lat, "longitude": lon}});
        }

        handleGetLocation();

        const fetchData = async () => {
            const predictionApiUrl = `https://d1z4yocc64.execute-api.us-east-1.amazonaws.com/getPredictions`;
    
            try {
                const predictionResponse = await fetch(predictionApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        body: {
                            diseaseArray: monitorDiseases,
                        },
                    }),
                });
    
                const predictionData = await predictionResponse.json();
                // console.log('Response:', predictionData);
                if (predictionData.length > 0){
                    const mappedData = predictionData.map(point => ({
                        latitude: point.latitude,
                        longitude: point.longitude,
                        weight: point.severity
                    }));
                    console.log("Prediction data")
                    console.log(mappedData);
                    setPredictionPoints(mappedData);
                }
                console.log("Prediction data outside")
                console.log(predictionData)


                const detectionApiUrl = `https://d1z4yocc64.execute-api.us-east-1.amazonaws.com/getDetections`;

                const detectionResponse = await fetch(detectionApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        body: {
                            diseaseArray: monitorDiseases,
                        },
                    }),
                });

                function formatDate(datetimeString) {
                    const dateObject = new Date(datetimeString);
                    const day = dateObject.getDate().toString().padStart(2, '0');
                    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                    const year = dateObject.getFullYear();
                    return `${day}-${month}-${year}`;
                }
    
                const detectionData = await detectionResponse.json();
                console.log('detection data Response:', detectionData);
                if (detectionData.length > 0){
                    const mappedData = detectionData.map(point => ({
                        latitude: parseFloat(point.latitude),
                        longitude: parseFloat(point.longitude),
                        description: point.disease,
                        datetime: formatDate(point.datetime),
                        icon: iconRefs[monitorDiseases.indexOf(point.disease)]
                    }));
                    console.log("relevant detections");
                    console.log(monitorDiseases);
                    setDetectionPoints(mappedData);
                }
                console.log("")
                console.log(detectionPoints);
                

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [monitorDiseases, navigation]);

    const handleButtonPress = () => {
        // Handle button press logic here
        // console.log('Button pressed!');
      };

    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.container}>
                <MapView
                mapPadding={{top:120, right:0, left:0, bottom:230}}
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                style={styles.map}
                showsUserLocation
                showsMyLocationButton
                initialRegion={state.initialPosition}
                // initialRegion={{latitude: currentLat,
                //     longitude: currentLon,
                //     latitudeDelta: 0.09,
                //     longitudeDelta: 0.035}}
                
                >
                
                <Heatmap
                    points={predictionPoints}
                    radius={50}
                    opacity={0.6}
                    gradient={{
                    colors: ["black", "purple", "red", "orange", "white"],
                    startPoints: Platform.OS === 'ios' ? [0.01, 0.04, 0.1, 0.45, 0.5] :
                        [0.1, 0.25, 0.5, 0.75, 1],
                    colorMapSize: 2000
                    }}

                >
                </Heatmap>
                {detectionPoints.map((marker, index) => {
                    return (
                        <Marker key={index} coordinate={marker}>
                            <View style={styles.marker}>
                                <Image source={marker.icon} style={{ height: 35, width: 35 }} />
                            </View>
                            <Callout style={{ width: 200 }}>
                                <View style={{ width: 200, height: 100 }}>
                                    <Text>
                                        The disease detected here was <Text style={{ fontWeight: 'bold' }}>{marker.description} </Text>
                                         on the <Text style={{ fontWeight: 'bold' }}>{marker.datetime}</Text>
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    );
                })}
                </MapView>
            </View>
            {/* <BottomNav/> */}
        </SafeAreaView>
    
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:50,
      marginHorizontal:10
    },
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
  });

export default MapOverView;