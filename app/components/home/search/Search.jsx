import {useState} from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image, 
  FlatList
  } from 'react-native'

import {useRouter} from 'expo-router'
import styles from './search.style'
import {icons, SIZES} from '../../../constants';

const jobTypes = ["Full-Time", "Part-Time", "Contractor"]
const Search = ({searchTerm, setsearchTerm, handleClick}) => {

  const router = useRouter();
  const [activeJobType, setActivateJobType] = useState('Full-Time')

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => {
              setsearchTerm(text);
              console.log(text); // Print out the value
            }}
            placeholder='Enter a name to search for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
        data={jobTypes}
        renderItem={({item})=>(
          <TouchableOpacity
            style={styles.tab(activeJobType, item)}  
            onPress = {() =>{
              setActivateJobType(item);
              router.push(`/search/${item}`)
            }}
          >
            <Text style={styles.tabText(activeJobType, item)}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item=>item}
        contentContainerStyle={{columnGap: SIZES.small}}
        horizontal
        />
      </View>
    </View>
  )
}

export default Search