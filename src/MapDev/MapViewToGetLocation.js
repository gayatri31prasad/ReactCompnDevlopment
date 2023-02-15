import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Modal,
    StyleSheet,
    Platform,
    PermissionsAndroid,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
// import LocationView from "react-native-location-view";
import Geolocation from 'react-native-geolocation-service';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapLocationView from "./MapLocationView";


GOOGLE_API_KEY = 'AIzaSyAGRrUn4-Tl1wuD8V1ZVPTfGqpFE7yOwaA'

const defaultLatLong = { // Default Pune location set
    latitude: 18.5204,
    longitude: 73.8567
}


const MapViewToGetLocation = ({
    style,
    visible,
    location,
    onLocationChange,
    onClose
}) => {
    const [latitude, setLatitude] = useState({ latCoordinates: defaultLatLong.latitude });
    const [longitude, setLongitude] = useState({ longCoordinates: defaultLatLong.longitude });
    const [isLoading, setIsLoading] = useState();
    const [cancelVisibility, setCancelVisibility] = useState(true)
    const [currentlocationobject, setcurrentlocationobject] = useState({});

    console.log("lllllllllllllllllllllllllll", location);
    useEffect(() => {
        if (location) {
            let newLat = latitude
            newLat.latCoordinates = location?.latitude
            setLatitude({ ...newLat });

            let newLong = longitude
            newLong.longCoordinates = location?.longitude
            setLongitude({ ...newLong });

            setCurrentLocationontarget()
        } else {
            setCurrentLocation();
        }
    }, [location]);

    const requestLocationPermissionForAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === 'granted') {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    };

    const setCurrentLocation = async () => {
        try {
            setIsLoading(true);
            let isPermissionGranted = false;
            if (Platform.OS === 'android') {
                isPermissionGranted =
                    await requestLocationPermissionForAndroid();
            } else {
                const status = await Geolocation.requestAuthorization('whenInUse');
                if (status === 'granted') {
                    isPermissionGranted = true;
                }
            }

            if (isPermissionGranted) {
                Geolocation.getCurrentPosition(
                    position => {

                        if (
                            position?.coords?.latitude &&
                            position?.coords?.longitude
                        ) {
                            let newLat = latitude
                            newLat.latCoordinates = position.coords.latitude
                            setLatitude({ ...newLat });

                            let newLong = longitude
                            newLong.longCoordinates = position.coords.longitude
                            setLongitude({ ...newLong });


                        } else {
                            let newLat = latitude
                            newLat.latCoordinates = defaultLatLong.latitude
                            setLatitude({ ...newLat });

                            let newLong = longitude
                            newLong.longCoordinates = defaultLatLong.longitude
                            setLongitude({ ...newLong });
                        }
                        setIsLoading(false);
                        setcurrentlocationobject({ ...position.coords })

                    },
                    error => {
                        setLatitude(defaultLatLong.latitude);
                        setLongitude(defaultLatLong.longitude);
                        console.log(error);
                        setIsLoading(false);
                        setcurrentlocationobject({ ...defaultLatLong })

                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000,
                    },
                );
            } else {
                setLatitude(defaultLatLong.latitude);
                setLongitude(defaultLatLong.longitude);
                setcurrentlocationobject({ ...defaultLatLong })
                setIsLoading(false);
            }

        }
        catch (error) {
            setLatitude(defaultLatLong.latitude);
            setLongitude(defaultLatLong.longitude);
            setcurrentlocationobject({ ...defaultLatLong })
            console.log(error);
            setIsLoading(false);
        }
    }

    const setCurrentLocationontarget = async () => {

        try {
            setIsLoading(true);
            let isPermissionGranted = false;
            if (Platform.OS === 'android') {
                isPermissionGranted =
                    await requestLocationPermissionForAndroid();
            } else {
                const status = await Geolocation.requestAuthorization('whenInUse');
                if (status === 'granted') {
                    isPermissionGranted = true;
                }
            }

            if (isPermissionGranted) {

                Geolocation.getCurrentPosition(
                    position => {
                        console.log("positionposition", position.coords);
                        setcurrentlocationobject({ ...position.coords })
                        setIsLoading(false);

                    },
                    error => {
                        setLatitude(defaultLatLong.latitude);
                        setLongitude(defaultLatLong.longitude);
                        console.log(error);
                        setIsLoading(false);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000,
                    },
                );
            }
        }
        catch (error) {
            setLatitude(defaultLatLong.latitude);
            setLongitude(defaultLatLong.longitude);
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                visible={visible}>
                <MapLocationView
                    apiKey={GOOGLE_API_KEY}
                    key={latitude?.latCoordinates}
                    initialLocation={{
                        latitude: latitude?.latCoordinates,
                        longitude: longitude?.longCoordinates
                    }}
                    markerColor="#3F7B8F"
                    actionText="Set Location"
                    actionButtonStyle={styles.btnStyles}
                    actionTextStyle={styles.btnText}
                    onLocationSelect={(location) => onLocationChange(location)}
                    onsetCurrentLocation={() => setCurrentLocationontarget()}
                    //    handlecancelVisibility={cancelVisibility}
                    currentlocationobjectData={currentlocationobject}
                    handlesetCancelVisibility={setCancelVisibility}
                />

                {cancelVisibility ? <></> :
                    onClose && <TouchableOpacity style={{
                        height: 50, width: 50,
                        position: "absolute",
                        // backgroundColor: "#EEE",
                        top: Platform.OS === 'ios' ? 55 : 20,
                        right: 20,
                        borderRadius: 20
                    }}
                        onPress={() => { setCancelVisibility(true); onClose() }}
                    >
                        <MaterialIcons
                            name="cancel"
                            color="#3F7B8F"
                            size={35}
                        />
                    </TouchableOpacity>}
                {isLoading &&
                    (<View style={styles.loaderContainer} >
                        <ActivityIndicator size="large" color="#3F7B8F" />
                    </View>)
                }
            </Modal>
        </SafeAreaView>
    )
}

export default MapViewToGetLocation;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loaderContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00000080"
    },
    btnStyles: {
        height: 45,
        borderRadius: 7,
        backgroundColor: '#3F7B8F',
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 10
    },
    locationText: {
        color: '#fff',
        fontSize: 10,
        marginTop: 5
    }
});
