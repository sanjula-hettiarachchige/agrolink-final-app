import React, {useEffect} from 'react'
import { FlatList, Image, Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, RefreshControlComponent } from 'react-native';
import {Stack, useRouter, useSearchParams } from 'expo-router';
import { useCallback, useState, useContext } from 'react';
// import {Company,  JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components';
import {COLORS, icons, SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler'
import FlashingRedLight from './flashingRedLight';
import MapView, { Callout, Heatmap, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';

import farmer1 from "../../assets/images/farmer1.jpg";
import farmer2 from "../../assets/images/farmer2.jpg";
import farmer3 from "../../assets/images/farmer3.jpg";
import farmer4 from "../../assets/images/farmer4.jpg";

import bioIcon from "../../assets/images/bio.png";
import locationIcon from "../../assets/images/location.png";
import plantIcon from "../../assets/images/plant.png";
import personIcon from "../../assets/images/person.png";
import UserContext from '../../user-context';


const Alerts = () => {
  const points = [
    { latitude: 40.7828, longitude: -74.0065, weight: 1 },
  ];
  
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLon, setCurrentLon] = useState(0);
  const [name,email, monitorDiseases,setName,setEmail, setmonitorDiseases] = useContext(UserContext);
  const [alertsArray, setAlertsArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const [heatAlerts, setHeatAlerts] = useState(points);
  const [initialRegion, setInitialRegion] = useState(null);
  const mapRef = React.createRef();
  const navigation = useNavigation();

  

  const [mapLayout, setMapLayout] = useState(false);

  const handleMapLayout = () => {
    setMapLayout(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const handleGetLocation = async () => {
        const location = await Location.getCurrentPositionAsync();
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      }

    handleGetLocation();
      const predictionApiUrl = `https://d1z4yocc64.execute-api.us-east-1.amazonaws.com/getAlerts`;

      try {
          const predictionResponse = await fetch(predictionApiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  body: {
                      diseaseArray: monitorDiseases,
                      currentLat: currentLat,
                      currentLon: currentLon,
                  },
              }),
          });

          const predictionData = await predictionResponse.json();
          console.log('Response:', predictionData);
          const alertsArray = JSON.parse(predictionData.alerts);
          const detailsArray = predictionData.disease_details

          if (detailsArray.length > 0){
              const mappedData = detailsArray.map((point, index) => ({
                  description: point.Description,
                  disease: point.diseaseId,
                  diseaseImage: point.images[0],
              }));
              setAlertsArray(mappedData);
              console.log("Alertrs array")
              console.log(alertsArray)
          }
          if (alertsArray.length > 0){
              const heatPoints = alertsArray.map((point, index) => ({
                latitude: point.latitude,
                longitude: point.longitude,
                weight: point.severity
              }));
              console.log("unpacked alerts")
              setHeatAlerts(heatPoints);
            }        
      } catch (error) {
          console.error('Error fetching data:', error);
      }
      setLoading(false);
    };
    fetchData();
}, [navigation]);

const generateNotificationCard = (description, disease, diseaseImage) => {
  return (
    <View
      key={description} // Consider using a unique key for each card
      style={{
        backgroundColor: 'lightgrey',
        width: '90%',
        height:100,
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row', // Set flexDirection to row
        alignItems: 'center', // Align items vertically centered
      }}
    >
      <Image
        source={{ uri: diseaseImage }} // Use the diseaseImage URL as the source
        style={{ width: 60, height: 60, marginRight: 10, borderRadius: 5 }} // Adjust width and height as needed
      />
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 16, maxWidth: '90%' }}>
          {disease}
        </Text>
        <Text style={{ fontSize: 14, maxWidth:'90%'}}>{description}</Text>
        {/* You can add more content or components based on your data */}
      </View>


      {/* <View style={styles.mapContainer} onLayout={handleMapLayout}>
        {(
        <MapView
            mapPadding={{top:120, right:0, left:0, bottom:230}}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            style={styles.map}
            showsUserLocation
            showsMyLocationButton
            initialRegion={initialRegion}        
        >
        
          <Heatmap
              points={heatAlerts}
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
        </MapView>
        )}
    </View> */}
    </View>
  );
};

  return (
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.lightWhite, paddingTop:100}}>
      <View style={{ padding: 20,flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: COLORS.black,
            marginRight: 10, // Adjust the margin as needed
          }}
        >
          Live threats in your area
        </Text>
        <FlashingRedLight />
      </View>
      <View style={styles.loaderContainer}>
          {loading && (
              <ActivityIndicator size='large' color={COLORS.primary} />
          )}
      </View>   

      <View style={styles.container}>
        {!loading && alertsArray.map((alert, index) => {
            console.log(alert); // Print out the alert object
            return generateNotificationCard(alert.description, alert.disease, alert.diseaseImage);
        })}

      <View style={styles.mapContainer} onLayout={handleMapLayout}>
        {!loading && (
        <MapView
            mapPadding={{top:120, right:0, left:0, bottom:230}}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            style={styles.map}
            showsUserLocation
            showsMyLocationButton
            initialRegion={initialRegion}        
        >
        
          <Heatmap
              points={heatAlerts}
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
        </MapView>
        )}
      </View>
    </View>


    </SafeAreaView>
    )
}

export default Alerts;