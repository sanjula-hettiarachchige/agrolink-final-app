import {useState} from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image, 
  FlatList
  } from 'react-native'
import { StyleSheet } from 'react-native-web';
import {useRouter} from 'expo-router'
// import styles from './welcome.style'
import { COLORS, FONT, SIZES } from "../../../constants";
const Welcome = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Adrian</Text>
        {/* <Text style={styles.welcomeMessage}>Find your perfect job</Text> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      marginTop: 200,
      width: "100%",
  },
  camera:{
      flex:1,
      borderRadius:20,
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
})


export default Welcome