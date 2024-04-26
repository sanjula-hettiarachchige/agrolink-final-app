import React from 'react'
import { FlatList, Image, Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, RefreshControlComponent } from 'react-native';
import {Stack, useRouter, useSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
// import {Company,  JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components';
import {COLORS, icons, SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler'

import farmer1 from "../../assets/images/farmer1.jpg";
import farmer2 from "../../assets/images/farmer2.jpg";
import farmer3 from "../../assets/images/farmer3.jpg";
import farmer4 from "../../assets/images/farmer4.jpg";

import bioIcon from "../../assets/images/bio.png";
import locationIcon from "../../assets/images/location.png";
import plantIcon from "../../assets/images/plant.png";
import personIcon from "../../assets/images/person.png";


const ConnectFarmer = () => {
  const [searchTerm, setsearchTerm] = useState("");

  const data = [
    { id: 1, name: 'Maria', imageUrl: farmer3, description: "Hi! I'm Maria, cultivating quinoa, potatoes, and maize.", location:"Rural Andes, Peru", plants:"Quinoa, Potatos, Maize"},
    { id: 2, name: 'Kwame', imageUrl: farmer2, description:"Kwame grows cocoa, plantains, and cassava.",  location:"Cape Town, South Africa", plants:"Cocoa, Plantains, Cassava"},
    { id: 3, name: 'Raj', imageUrl: farmer1, description:"Namaste! Raj here, growing wheat and rice in Punjab.",  location:"Punjab, India", plants:"Wheat, Rice"},
    { id: 4, name: 'Isabella', imageUrl: farmer4, description:"Ciao! I'm Isabella, I cultivate olives.",  location:"Tuscany, Italy", plants:"Olives"},
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
        resizeMode='contain'
        style={styles.gridItemImage}
      />
      <View style={styles.gridItemTextContainer}>
        <Image
          source={personIcon} // Provide the source for the icon image
          resizeMode='contain'
          style={styles.iconImage}
        />
        <Text style={styles.gridItemText}>{item.name}</Text>
      </View>

      <View style={styles.gridItemTextContainer}>
        <Image
          source={bioIcon} // Provide the source for the icon image
          resizeMode='contain'
          style={styles.iconImage}
        />
        <Text style={styles.gridItemText}>{item.description}</Text>
      </View>

      <View style={styles.gridItemTextContainer}>
        <Image
          source={locationIcon} // Provide the source for the icon image
          resizeMode='contain'
          style={styles.iconImage}
        />
        <Text style={styles.gridItemText}>{item.location}</Text>
      </View>

      <View style={styles.gridItemTextContainer}>
        <Image
          source={plantIcon} // Provide the source for the icon image
          resizeMode='contain'
          style={styles.iconImage}
        />
        <Text style={styles.gridItemText}>{item.plants}</Text>
      </View>

      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}>+ Connect</Text>
    </TouchableOpacity>

    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.lightWhite}}>
      {/* <Header></Header> */}
      <View style={styles.container}>
        {/* <Search
            searchTerm={searchTerm}
            setsearchTerm={setsearchTerm}
            handleClick={() => {
                if(searchTerm) {
                    router.push(`/search/${searchTerm}`);
                }
            }}
        /> */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Set the number of columns for the grid
          contentContainerStyle={styles.gridContainer}
        />
      </View>
    </SafeAreaView>
    )
}

export default ConnectFarmer;