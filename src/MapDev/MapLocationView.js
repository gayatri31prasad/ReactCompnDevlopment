// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import {
    View, StyleSheet, Animated, Platform, UIManager,
    TouchableOpacity, Text, ViewPropTypes, SafeAreaView
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import MapView from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
import AutoCompleteInput from './AutoCompleteInput';
import { useEffect } from 'react';
import { useRef } from 'react';
import Events from './Events';

const PLACE_DETAIL_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
const DEFAULT_DELTA = { latitudeDelta: 0.015, longitudeDelta: 0.0121 };

const MapLocationView = ({
    apiKey = 'AIzaSyAGRrUn4-Tl1wuD8V1ZVPTfGqpFE7yOwaA', // PropTypes.string.isRequired
    initialLocation = {
        latitude: 0.015,
        longitude: 0.0121,
    },
    // : PropTypes.shape({
    //     latitude: PropTypes.number,
    //     longitude: PropTypes.number,
    //   }).isRequired
    markerColor = 'black',    // PropTypes.string
    actionButtonStyle,  // ViewPropTypes.style
    actionTextStyle,    // Text.propTypes.style
    actionText = 'DONE',  // PropTypes.string
    onLocationSelect = () => ({}),    // PropTypes.func
    debounceDuration = 300,   //number
    components = [],  //PropTypes.arrayOf(PropTypes.string)
    timeout = 15000,  //number
    maximumAge = Infinity,    //number
    enableHighAccuracy = true,    //bool
    handlecancelVisibility, //string
    handlesetCancelVisibility,  //func
    onsetCurrentLocation,   //func
    currentlocationobjectData,  //object
}) => {

    let _input = useRef()
    let _map = useRef()

    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        Events.listen('InputBlur', constructor.displayName, _onTextBlur);
        Events.listen('InputFocus', constructor.displayName, _onTextFocus);
        Events.listen('PlaceSelected', constructor.displayName, _onPlaceSelected);
        Events.listen('IsLoading', constructor.displayName, _onLoading);
        // Events.listen('CurrentLocation', constructor.displayName, _onMapRegionChangeOnTarget(currentlocationobjectData));

        return () => {
            Events.rm('InputBlur', constructor.displayName);
            Events.rm('InputFocus', constructor.displayName);
            Events.rm('PlaceSelected', constructor.displayName);
            Events.rm('IsLoading', constructor.displayName);
            // Events.rm('CurrentLocation', constructor.displayName);
        }

    }, [])


    const [state, setState] = useState({
        inputScale: new Animated.Value(1),
        inFocus: false,
        isLoading: true,
        region: {
            ...DEFAULT_DELTA,
            ...initialLocation,
        },
    })

    const _animateInput = () => {
        Animated.timing(state.inputScale, {
            toValue: state.inFocus ? 1.2 : 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    };

    const _onMapRegionChange = region => {

        clearTimeout(timer);

        if (state.isLoading != true) {
            setState({ ...state, isLoading: true });
            handlesetCancelVisibility(true)
        }
        _setRegion(region, false);
        if (state.inFocus) {
            _input.blur();

        }

    };

    const _onMapRegionChangeOnTarget = region => {

        _setRegion(region, false);
        if (state.inFocus) {
            _input.blur();
        }
    };

    const _onMapRegionChangeComplete = region => {
        // setState({...state, isLoading: true});
        // handlesetCancelVisibility(true)
        timer = setTimeout(() => {
            // _input.fetchAddressForLocation(region)
        }, 1200);

    };

    const _onTextFocus = () => {
        state.inFocus = true;
        _animateInput();
    };

    const _onTextBlur = () => {
        state.inFocus = false;
        _animateInput();
    };

    const _onLoading = (_isLoading) => {
        handlesetCancelVisibility(_isLoading)
        setState({ ...state, isLoading: _isLoading });
    }

    const _setRegion = (region, animate = true) => {
        // state.region = { ...state.region, ...region };
        setState({ ...state, region })
        if (animate) _map.animateToRegion(state.region);
    };

    const _onPlaceSelected = placeId => {
        _input.blur();
        axios.get(`${PLACE_DETAIL_URL}?key=${apiKey}&placeid=${placeId}`).then(({ data }) => {
            let region = (({ lat, lng }) => ({ latitude: lat, longitude: lng }))(data.result.geometry.location);
            _setRegion(region);
            setState({ ...state, placeDetails: data.result });
        });
    };

    const _getCurrentLocation = () => {
        // const { timeout, maximumAge, enableHighAccuracy } = props;
        let options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
        }
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                _setRegion({ latitude, longitude });
            },
            error => console.log(error.message),
            options
        );
    };

    let { inputScale } = state;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FCF6ED" }}>
            <View style={styles.container}>
                <MapView
                    ref={mapView => (_map = mapView)}
                    style={styles.mapView}
                    region={state.region}
                    showsMyLocationButton={false}
                    showsUserLocation={true}
                    onPress={({ nativeEvent }) => _setRegion(nativeEvent.coordinate)}
                    onRegionChange={_onMapRegionChange}
                    onRegionChangeComplete={_onMapRegionChangeComplete()}
                />
                <Entypo
                    name={'location-pin'}
                    size={50}
                    color={markerColor}
                    style={{ backgroundColor: 'transparent' }}
                />
                <View style={styles.fullWidthContainer}>
                    <AutoCompleteInput
                        ref={_input}
                        apiKey={apiKey}
                        style={[styles.input, { transform: [{ scale: inputScale }] }]}
                        debounceDuration={debounceDuration}
                        components={components}
                    />
                </View>

                {state.isLoading ? <></> :
                    <TouchableOpacity
                        style={[styles.currentLocBtn, { backgroundColor: markerColor }]}
                        onPress={() => { onsetCurrentLocation(); _onMapRegionChangeOnTarget(currentlocationobjectData) }}>
                        <MaterialIcons name={'my-location'} color={'white'} size={25} />
                    </TouchableOpacity>}

                {state.isLoading ? <></> :
                    <TouchableOpacity
                        style={[styles.actionButton, actionButtonStyle, { opacity: state.isLoading ? 0.7 : 1 }]}
                        disabled={state.isLoading}
                        onPress={() => {
                            onLocationSelect({ ...state.region, address: _input.getAddress(), placeDetails: state.placeDetails })
                        }}>
                        <View>
                            <Text style={[styles.actionText, actionTextStyle]}>{actionText}</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    );

    // const API_KEY = 'AIzaSyAGRrUn4-Tl1wuD8V1ZVPTfGqpFE7yOwaA'

    // return (
    //     <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
    //         <View style={{ padding: 15, }}>
    //             <MapView
    //                 provider={PROVIDER_GOOGLE}
    //                 style={{ height: '100%', width: '100%', }}
    //                 region={{
    //                     latitude: 37.78825,
    //                     longitude: -122.4324,
    //                     latitudeDelta: 0.015,
    //                     longitudeDelta: 0.0121,
    //                 }} />
    //         </View>
    //     </SafeAreaView>
    // )
}

export default MapLocationView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapView: {
        ...StyleSheet.absoluteFillObject,
    },
    fullWidthContainer: {
        position: 'absolute',
        width: '100%',
        top: 80,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 5,
    },
    currentLocBtn: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        position: 'absolute',
        bottom: 70,
        right: 10,
    },
    actionButton: {
        backgroundColor: '#000',
        height: 50,
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    actionText: {
        color: 'white',
        fontSize: 23,
    },
});
