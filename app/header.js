// Import necessary dependencies
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { images } from './constants'; // Assuming images is imported correctly
import UserContext from './user-context';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  // Hardcoded profile image URL
  const profileImage = "url_to_your_profile_image";

  // Context for user information
  const [name, email] = useContext(UserContext);

  const handleProfilePress = () => {
    // Handle profile press
    console.log("Profile Pressed");
    navigation.navigate('AccountDetails');

  };

  return (
    <View style={{ position: 'absolute', borderRadius:30 ,top: 40, left: 10, right: 10, zIndex: 100, backgroundColor: 'rgba(189, 189, 187, 0.99)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60, padding: 10 }}>
        {profileImage && (
            <TouchableOpacity onPress={handleProfilePress}>
            <Image source={images.logo} style={{ marginTop: 0, width: 50, height: 50, borderRadius: 50 }} />
            </TouchableOpacity>
        )}
        <Text style={{fontSize: 18, marginLeft: -60, color: '#fff' }}>AgroLink, Welcome {name}</Text>
        {profileImage && (
            <TouchableOpacity onPress={handleProfilePress}>
            <Image source={images.profile} style={{ marginTop: 0, width: 50, height: 50, borderRadius: 50 }} />
            </TouchableOpacity>
        )}
    </View>
  );
};

export default Header;