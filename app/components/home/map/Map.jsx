import React from 'react'
import {View, Text, Image} from 'react-native'
import {useRouter} from 'expo-router'
import { checkImageURL } from '../../../utils';
import map from "../../../assets/images/heatmap.jpg";

import styles from './map.style'
import {COLORS} from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/useFetch';
import { TouchableOpacity } from 'react-native-gesture-handler'


const Map = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.mapContainer}>
          <Text style={styles.mapOverviewText}>Disease Overview</Text>
          <Image
            source={map}
            resizeMode='contain'
            style={styles.mapImage}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Map;