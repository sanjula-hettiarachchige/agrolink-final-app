import React from 'react'
import {View, Text, Image, FlatList} from 'react-native'
import {useRouter} from 'expo-router'
import { checkImageURL } from '../../../utils';

import leaf from "../../../assets/images/leaf.jpg";
import treatment from "../../../assets/images/treatment.jpg";
import aerial from "../../../assets/images/aerial.jpg";
import farmers from "../../../assets/images/farmers.jpg";

import styles from './options.style'
import {COLORS} from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/useFetch';
import { TouchableOpacity } from 'react-native-gesture-handler'


const Options = () => {
  const router = useRouter();

  const data = [
    { id: 1, name: 'Scan a Leaf', imageUrl: leaf, description: "Take an image of a leaf to detect a disease", urlRoute:"leaf-capture"},
    { id: 2, name: 'Connect', imageUrl: farmers, description:"Connect with other farmers", urlRoute:"connect-farmer"},
    { id: 3, name: 'Treatment', imageUrl: treatment, description:"Learn about different treatments for your crops",  urlRoute:"diseases"},
    { id: 4, name: 'Aerial', imageUrl: aerial, description:"Learn about different treatments for your crops",  urlRoute:"aerial-view"},
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
      <Text style={styles.gridItemText}>{item.name}</Text>
      <Text style={styles.gridItemDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Set the number of columns for the grid
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

export default Options;