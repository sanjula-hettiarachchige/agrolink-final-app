import { View, Text, TouchableOpacity, Image } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONT, SHADOWS, SIZES } from "../constants";
import { StyleSheet } from "react-native-web";

const TreatmentCard = ({ treatment }) => {
    const renderStars = (efficiency) => {
        const stars = [];
        for (let i = 0; i < efficiency; i++) {
          stars.push(
            <Entypo key={i} name="star" size={24} color="orange" style={{ marginRight: 5 }} />
          );
        }
        return (
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            {stars}
          </View>
        );
      };
  
    return (
      <View
        style={styles.treatmentName}
      >
        <Text style={{fontSize: SIZES.large,
                    fontFamily: FONT.medium,
                    }}>{treatment[0]}</Text>

        <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{backgroundColor:'red', padding:5, borderRadius:100, margin: 5}}>
                <SimpleLineIcons name="chemistry" size={24} color="black" />
            </View>
            
            <View style={{backgroundColor:'green', padding:5, borderRadius:100, margin:5}}>
                <MaterialCommunityIcons name="shield-bug" size={24} color="black" />
            </View>
        </View>

        
        {renderStars(treatment[1])}
      </View>
    );
  };
  
const styles = StyleSheet.create({
    treatmentName: {
        backgroundColor: '#fff',
        width: 300,
        height: 170,
        margin: 10,
        padding: 20,
        borderRadius: 20,
    },
})


export default TreatmentCard;