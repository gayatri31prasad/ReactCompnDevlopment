import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapViewToGetLocation from '../MapDev/MapViewToGetLocation'
import { Alert } from 'react-native';
import { useState } from 'react';

const SelectLocation = () => {

    GOOGLE_API_KEY = 'AIzaSyAGRrUn4-Tl1wuD8V1ZVPTfGqpFE7yOwaA'

    const [mapVisible, setMapVisible] = useState(false);
    const [location, setLocation] = useState({ latitude: 18.549486373855533, longitude: 73.94077395493241 });
    const [adress, setadress] = useState();

    const onLocationChange = _location => {
        // console.log('get map location', _location);
        if (_location?.address) {
            setMapVisible(false);
            setLocation(_location);
            AddressDetails(
                _location?.latitude.toString(),
                _location?.longitude.toString(),
                GOOGLE_API_KEY,)
                .then(res => {
                    // console.log('address12357', res);
                    if (res != null) {
                        setadress({
                            city: res?.city,
                            state: res?.state,
                            map_address: _location?.address,
                            pincode: res?.pincode,
                        });
                    }
                })
                .catch(err => {
                    console.log('err4', err);
                });
        } else {
            Alert.alert('Empty Location', 'Please select valid location.');
        }
    };


    return (
        <View>
            <Text>SelectLocation</Text>
            <MapViewToGetLocation
                key={location?.latitude}
                visible={mapVisible}
                location={location}
                onLocationChange={_location => onLocationChange(_location)}
                onClose={() => setMapVisible(false)}
            />
        </View>

    )
}

export default SelectLocation

const styles = StyleSheet.create({})