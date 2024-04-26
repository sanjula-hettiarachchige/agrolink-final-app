import {useState, useEffect} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {Stack, useRouter} from 'expo-router';
import {COLORS, icons, images, SIZES} from './constants';
import { StyleSheet } from 'react-native-web';
import LandingScreen from './signup';
import RegisterScreen from './register';
import LoginScreen from './login';
import { Image } from 'react-native';
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, Search, Map, Options} from './components';
import {CameraButton} from './components';
import { createStackNavigator } from '@react-navigation/stack';
import MapOverView from './menu/map-overview';
import BottomNav from './menu/bottomNav';
import UserContext from './user-context';

const Home = () =>{

    const router = useRouter();
    const [searchTerm, setsearchTerm] = useState("");
    const [loggedIn, setLoggedin] = useState(false);
    const Stack = createStackNavigator();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [monitorDiseases, setmonitorDiseases] = useState([]);


    return (
        <UserContext.Provider value={[name,email,monitorDiseases,setName,setEmail,setmonitorDiseases]}>
            <Stack.Navigator initialRouteName="LandingScreen"  screenOptions={{headerShown:false,
                cardStyle: { marginTop: 0, backgroundColor:'white'}}}>
                {/* <Stack.Screen
                    name="MapOverview"
                    component={MapOverView}
                />  */}
                
                <Stack.Screen
                    name="BottomNav"
                    component={BottomNav}
                /> 

                <Stack.Screen
                    name="LandingScreen"
                    component={LandingScreen}
                />

                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                /> 

                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                />
            </Stack.Navigator>
        </UserContext.Provider>

    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingBottom: 20
    },
    camera:{
        flex:1,
        borderRadius:20,
    }
})


export default Home;

