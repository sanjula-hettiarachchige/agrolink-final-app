import React, { useEffect, useState, useRef} from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';
import { COLORS } from '../constants';
import Pagination from 'react-native-pagination';
import { Button } from 'react-native-web';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// import { ScrollView } from 'react-native-gesture-handler';
import TreatmentCard from './treatmentcard';
mapping = {'Apple - Apple Scab': 0,
     'Apple - Black Rot': 1,
     'Apple - Cedar Rust':2,
     'Apple - Healthy':3,
     'Blueberry - Healthy':4,
     'Cherry - Powdery Mildew':5,
     'Cherry - Healthy': 6,
     'Corn - Gray Leaf Spot':7,
     'Corn - Common Rust':8,
     'Corn - Northern Leaf Blight':9,
     'Corn - Healthy':10,
     'Grape - Black Rot':11,
     'Grape - Black Measles':12,
     'Grape - Leaf Blight':13,
     'Grape - Healthy':14,
     'Orange - Citrus Greening':15,
     'Peach - Bacterial Spot':16,
     'Peach - Healthy':17}
     
  
// Function to get the integer associated with a disease name
const getDiseaseInteger = (diseaseName) => {
    // Use the mapping object to look up the integer
    return mapping[diseaseName];
};

const DiseaseDetails = ({route}) => {
    const { data } = route;
    const [activeDotIndex, setActiveDotIndex] = useState(0);
    const [imageList, setImageList] = useState([])
    const [diseaseName, setDiseaseName] = useState("");
    const [diseaseId, setDiseaseId] = useState();
    const [diseaseDescription, setDiseaseDescription] = useState("");
    const [treatmentList, setTreatmentList] = useState([]);

    useEffect(() => {
      setDiseaseName(route['params']['diseaseId'])
      setDiseaseId(getDiseaseInteger(diseaseName));
      console.log(getDiseaseInteger(diseaseName));
    }, []);
  
    useEffect(() => {
        const fetchData = async () => {
            const fetchedDiseaseName = route.params.diseaseId;
            setDiseaseName(fetchedDiseaseName);
            
            const diseaseInteger = getDiseaseInteger(fetchedDiseaseName);
            setDiseaseId(diseaseInteger);
    
            console.log(fetchedDiseaseName);
            console.log(diseaseInteger);
    
            const apiUrl = `https://d1z4yocc64.execute-api.us-east-1.amazonaws.com/getDiseaseDetails`;
    
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        body: {
                            disease: String(fetchedDiseaseName),
                        },
                    }),
                });
    
                const data = await response.json();
                console.log('Response:', data);
                
                setDiseaseDescription(data.Description);
                setImageList(data.images.map(item => item));
                setTreatmentList(data.treatments.map(item => item))
                console.log(diseaseDescription);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [route]);
   
      const _carousel = useRef(null);
      const renderCarouselItem = ({ item }) => (
        // Check if item is not null before rendering
        item !== null && (
          <Image
            source={{ uri: item }}
            style={{
              width: '80%',
              height: 200,
              marginBottom: 10,
              borderRadius: 10,
            }}
          />
        )
      );

    //   const [treatments, setTreatment] = useState([]);
      const treat = [{
        name:'Cyantrannilipole',
        efficiacy: 4,
        type:'Insecticide'
      },{
        name:'Cyantrannilipole',
        efficiacy: 4,
        type:'Insecticide'
      },{
        name:'Cyantrannilipole',
        efficiacy: 4,
        type:'Insecticide'
      }]
    //   setTreatment(treat)

      return (
        <View style={styles.container}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0', padding: 16 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                
                <View style={{padding: 5,borderRadius: 8}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold'}}>
                        {diseaseName}
                    </Text>
                </View>
                {/* <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    Disease successfully identified as {diseaseName}
                </Text> */}
        
                {/* Carousel of images */}

                <Carousel
                ref={_carousel}
                data={imageList}
                renderItem={renderCarouselItem}
                sliderWidth={450}
                itemWidth={450}
                onSnapToItem={(index) => setActiveDotIndex(index)}
                containerCustomStyle={{ marginTop: 10}}
                />
        
                {/* Info box */}
                <Text style={{ padding: 5, fontSize: 18, fontWeight: 'bold', marginBottom:3}}>
                    Symptoms
                </Text>
                <View style={{ padding: 16, marginBottom: 10, backgroundColor: 'white' ,borderRadius:10}}>
                    
                    <Text>{diseaseDescription}</Text>
                </View>
                
                <Text style={{  padding: 5, fontSize: 18, fontWeight: 'bold', marginBottom:3}}>
                    Treatments
                </Text>
                
                <View style={{marginBottom:100}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                        style={{paddingBottom:'100px'}}>
                        <View style={{ flexDirection: 'row' }}>
                            {treatmentList.map((treatment, index) => (
                                <TreatmentCard treatment={treatment} key={index} />
                            ))}
                        </View>
                    </ScrollView>
                </View>

                </ScrollView>
            </SafeAreaView>
        </View>
      );
    };
    
    export default DiseaseDetails;