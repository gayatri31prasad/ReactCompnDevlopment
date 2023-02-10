import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import SelectDropdown from '../Screens/SelectDropdown'
import { Alert } from 'react-native/Libraries/Alert/Alert'

const MapLocationView = () => {

    const API_KEY = 'AIzaSyAGRrUn4-Tl1wuD8V1ZVPTfGqpFE7yOwaA'

    const monthStr = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ padding: 15, }}>
                {/* <MapView
                provider={'AIzaSyAGRrUn4-Tl1wuD8V1ZVPTfGqpFE7yOwaA'}
                style={{ height: '100%', width: '100%', }}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }} /> */}
                <SelectDropdown
                    data={monthStr}
                    onSelect={(value, index) => { console.log('..........', value); }}
                    dropdownStyle={{
                        borderWidth: 0,
                        elevation: 3,
                        margin: 0,
                        padding: 2,
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.1,
                        shadowRadius: 3,
                    }}
                    /* buttonStyle={styles.select} */
                    buttonStyle={[
                        { backgroundColor: '#f0f0f0', width: '100%', borderRadius: 10 },
                    ]}
                    buttonTextStyle={{
                        justifyContent: 'flex-start',
                        fontSize: 14,
                        textAlign: 'left',
                        paddingLeft: 0,
                    }}
                    dropdownOverlayColor={'transparent'}
                    rowStyle={{
                        backgroundColor: '#fff',
                        height: 39,
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff',
                    }}
                    rowTextStyle={{ fontSize: 14, textAlign: 'left', paddingLeft: 5 }}
                />
                {/* <Text>hhhhhhh</Text> */}
            </View>
        </SafeAreaView>
    )
}

export default MapLocationView

const styles = StyleSheet.create({})