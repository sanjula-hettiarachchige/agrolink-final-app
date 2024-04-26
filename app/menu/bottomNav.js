import React, {useState, Component} from 'react';
import {useRouter} from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import {View, StyleSheet, Platdform, Text, ScrollView, SafeAreaView} from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import TabButton from '../components/TabButton';
import MapOverView from './map-overview';
import LeafCapture from './leaf-capture';
import LoginScreen from '../login'; 
import ConnectFarmer from './connect-farmer';
import { Welcome } from '../components';
import Diseases from './diseases';
import Header from '../header';
import DiseaseDetails from '../disease-details/[id]';
import Alerts from './alerts';
import DiseaseDetections from '../DiseaseDetections/DiseaseDetections';
import AccountDetails from '../AccountDetails';


const BottomNav = () =>{

    const navigation = useNavigation();
    const Tab = createBottomTabNavigator();

    const showTabs = [
        {
            id: 1,
            title: 'Map',
            screen: 'Map',
            icon: 'map',
            Component: MapOverView
        },
        {
            id: 2,
            title: 'Scan',
            screen: 'Scan',
            icon: 'camera',
            Component: LeafCapture
        },
        {
            id: 11,
            title: 'History',
            screen: 'DiseaseDetections',
            icon: 'history',
            Component: DiseaseDetections,
        },
        {
            id: 3,
            title: 'Diseases',
            screen: 'Diseases',
            icon: 'bacteria',
            Component: Diseases
        },
        {
            id: 4,
            title: 'Alerts',
            screen: 'Alerts',
            icon: 'alert',
            Component: Alerts
        },
        // {
        //     id: 4,
        //     title: 'Settings',
        //     screen: 'Settings',
        //     icon: 'cog',
        //     Component: LoginScreen
        // },
        // {
        //     id: 5,
        //     title: 'Activity',
        //     screen: 'Notifications',
        //     icon: 'bell',
        //     Component: LoginScreen
        // },
    ]

    const hideTabs = [
        {
            id: 10,
            title: 'DiseaseDetails',
            screen: 'DiseaseDetails',
            icon: 'bacteria',
            Component: DiseaseDetails
        },
        {
            id: 11,
            title: 'AccountDetails',
            screen: 'AccountDetails',
            icon: 'bacteria',
            Component: AccountDetails,
        },
        // {
        //     id: 11,
        //     title: 'DiseaseDetections',
        //     screen: 'DiseaseDetections',
        //     icon: 'bacteria',
        //     Component: DiseaseDetections
        // },
    ]

    const showHeader = () =>{
        return <Header/>;
    }
    
    return(
    <Tab.Navigator
        initialRouteName={'Map'}
        screenOptions={{
            headerShown: true,
            header: showHeader,
            tabBarStyle: styles.tabBar
        }}
    >
        {
            showTabs.map((item, index) => 
                <Tab.Screen
                    key={item.id}
                    name={item.screen}
                    component={item.Component}
                    options={{
                        tabBarShowLabel: false,
                        tabBarButton: (props) => <TabButton item={item} {...props} />
                    }}
                />
            )
        }

        {
            hideTabs.map((item, index) => 
                <Tab.Screen
                    key={item.id}
                    name={item.screen}
                    component={item.Component}
                    options={({ route }) => ({
                        tabBarShowLabel: false,
                        tabBarButton: (props) => null,
                        tabBarVisible: false
                    })}
                />
            )
        }
    </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        position: 'absolute',
        bottom: 25,
        marginHorizontal: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#dadada'
    }
})

export default BottomNav;