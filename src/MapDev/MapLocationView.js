import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'

const MapLocationView = () => {

    const API_KEY = 'AIzaSyAGRrUn4-Tl1wuD8V1ZVPTfGqpFE7yOwaA'

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ padding: 15, }}>
                <Text>MapLocationView</Text>
                <MapView
                    provider={'AIzaSyAGRrUn4-Tl1wuD8V1ZVPTfGqpFE7yOwaA'}
                    style={{ height: '100%', width: '100%', }}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }} />
            </View>
        </SafeAreaView>
    )
}

export default MapLocationView

const styles = StyleSheet.create({})