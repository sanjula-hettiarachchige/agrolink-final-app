import React from 'react'
import { FlatList, Image, Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, RefreshControlComponent } from 'react-native';
import {Stack, useRouter, useSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {Company,  JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components';
import {COLORS, icons, SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Search} from '../../components';

import blight from "../../assets/images/blight.jpg";
import cedarApple from "../../assets/images/cedar-apple.jpg";
import grapeBlackRot from "../../assets/images/grape-black-rot.jpg";
import maizeRust from "../../assets/images/maize-rust.png";

import bioIcon from "../../assets/images/bio.png";
import locationIcon from "../../assets/images/location.png";
import plantIcon from "../../assets/images/plant.png";
import personIcon from "../../assets/images/person.png";


const Diseases = () => {
  const [searchTerm, setsearchTerm] = useState("");

  const data = [
    { 
      id: 1, 
      name: 'Blight', 
      imageUrl: blight, 
      description: "Blight is a plant disease caused by various pathogenic microorganisms."
  },
  { 
      id: 2, 
      name: 'Cedar Apple', 
      imageUrl: cedarApple, 
      description: "Cedar apple rust is a fungal disease affecting apple and cedar trees." 
  },
  { 
      id: 3, 
      name: 'Grape Black Rot', 
      imageUrl: grapeBlackRot, 
      description: "Grape black rot is a fungal disease caused by the pathogen Guignardia bidwellii." 
  },
  { 
      id: 4, 
      name: 'Maize Rust', 
      imageUrl: maizeRust, 
      description: "Maize rust is a fungal disease caused by several species of the genus Puccinia." 
  }
  ];

  const handlePress = (option) => {
    // Handle press action
    router.push(`/menu/${option}`);
    console.log(`Pressed: ${option}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={styles.gridItem}
    onPress={() => handlePress(item.urlRoute)}
  >
    <Image
      source={item.imageUrl}
      resizeMode="contain"
      style={styles.gridItemImage}
    />
    <View style={styles.TextContainer}>

      <View style={styles.gridItemTextContainer}>
        <Text style={styles.gridItemText}>{item.name}</Text>
      </View>

      <View style={styles.gridItemTextContainer}>
        <Text style={styles.gridItemTextDescription}>{item.description}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.lightWhite}}>
      {/* <Header></Header> */}
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1} // Set the number of columns for the grid
          contentContainerStyle={styles.gridContainer}
        />
      </View>
    </SafeAreaView>
    )
}

export default Diseases;