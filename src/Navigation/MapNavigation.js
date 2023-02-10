import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapLocationView from '../MapDev/MapLocationView';

const MapNavigation = () => {
    const MapNav = createStackNavigator();
    return (
        <MapNav.Navigator initialRouteName="MapLocationView">
            <MapNav.Screen
                options={{
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#74AEC2',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontSize: 18,
                        width: '100%',
                    },
                    headerTitle: 'MapView',
                }}
                name="MapLocationView"
                component={MapLocationView}
            />
        </MapNav.Navigator>
    )
}

export default MapNavigation

const styles = StyleSheet.create({})