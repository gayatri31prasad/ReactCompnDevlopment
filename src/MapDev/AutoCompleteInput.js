import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, StyleSheet, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AutoCompleteListView from './AutoCompleteListView';
import axios, { CancelToken } from 'axios';
import Events from './Events';
import { useEffect } from 'react';
import { useRef } from 'react';

const AUTOCOMPLETE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const REVRSE_GEO_CODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';


const AutoCompleteInput = ({
    apiKey,
    language = 'en',
    debounceDuration,
    components = [],
}) => {


    let _input = useRef()

    useEffect(() => {
        _request('')
        fetchAddressForLocation()

        return () => {
            _abortRequest();
        }
    }, [])

    const [state, setState] = useState({
        text: '',
        predictions: [],
        loading: false,
        inFocus: false,
        selection: {
            start: 0,
            end: 0
        }
    })

    let source = CancelToken.source();

    const _abortRequest = () => {
        if (source) {
            source.cancel('Operation canceled by the user.');
        }
    };

    const fetchAddressForLocation = location => {
        let { latitude, longitude } = location;

        if (latitude && longitude) {
            setState({ ...state, loading: true, predictions: [] });
            Events.trigger('IsLoading', true);
            source = CancelToken.source();
            // console.log(">>> URL: ",`${REVRSE_GEO_CODE_URL}?key=${apiKey}&latlng=${latitude},${longitude}`)
            axios.get(`${REVRSE_GEO_CODE_URL}?key=${apiKey}&latlng=${latitude},${longitude}`, {
                cancelToken: source.token,
            })
                .then(({ data }) => {
                    setState({ ...state, loading: false });
                    Events.trigger('IsLoading', false);
                    let { results } = data;
                    if (results.length > 0) {
                        let { formatted_address } = results[0];
                        setState({ ...state, text: formatted_address });
                        if (!state.inFocus) {
                            setState({
                                ...state,
                                selection: {
                                    start: 0,
                                    end: 0
                                }
                            })
                        }
                    }
                })
                .catch(err => {
                    setState({ ...state, loading: false });
                    Events.trigger('IsLoading', false);
                    console.error(err);
                });
        }

    };

    const _request = text => {
        _abortRequest();
        if (text.length >= 3) {
            source = CancelToken.source();
            axios.get(AUTOCOMPLETE_URL, {
                cancelToken: source.token,
                params: {
                    input: text,
                    key: apiKey,
                    language: language,
                    components: components.join('|'),
                },
            })
                .then(({ data }) => {
                    let { predictions } = data;
                    setState({ ...state, predictions });
                })
                .catch(console.error);
        } else {
            setState({ ...state, predictions: [] });
        }
    };

    const _onChangeText = text => {
        _request(text);
        setState({ ...state, text });
    };

    const _onFocus = () => {
        _abortRequest();
        setState({ ...state, loading: false, inFocus: true });
        Events.trigger('IsLoading', false);
        Events.trigger('InputFocus');
    };

    const _onBlur = () => {
        setState({ ...state, inFocus: false });
        // _input.setNativeProps({
        //   selection: {
        //     start: 0,
        //     end: 0
        //   }
        // });
        Events.trigger('InputBlur');
    };

    const blur = () => {
        // _input.setNativeProps({
        //   selection: {
        //     start: 0,
        //     end: 0
        //   }
        // });
        _input.blur();
    };

    const _onPressClear = () => {
        setState({ ...state, text: '', predictions: [] });
    };

    const _getClearButton = () =>
        state.inFocus ? (
            <TouchableOpacity style={styles.btn} onPress={_onPressClear}>
                <MaterialIcons name={'clear'} size={20} />
            </TouchableOpacity>
        ) : null;

    const getAddress = () => (state.loading ? '' : state.text);

    return (
        <Animated.View style={{}}>
            <View style={styles.textInputContainer} elevation={20}>
                <TextInput
                    ref={_input}
                    value={state.loading ? 'Loading...' : state.text}
                    style={styles.textInput}
                    underlineColorAndroid={'transparent'}
                    placeholder={'Search'}
                    onFocus={_onFocus}
                    onBlur={_onBlur}
                    onChangeText={_onChangeText}
                    outlineProvider="bounds"
                    autoCorrect={false}
                    spellCheck={false}
                    selection={state.selection}
                    onSelectionChange={({ nativeEvent: { selection } }) => {
                        if (state.inFocus) {
                            setState({ ...state, selection })
                        }
                    }}
                />
                {state.loading && <ActivityIndicator
                    size="small"
                    color="#035250"
                    style={{ marginRight: 15 }}
                />}
                {_getClearButton()}
            </View>
            <View style={styles.listViewContainer}>
                <AutoCompleteListView predictions={state.predictions} />
            </View>
        </Animated.View>
    )
}

export default AutoCompleteInput

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection: 'row',
        height: 40,
        zIndex: 99,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: '#404752',
        paddingEnd: 10
    },
    btn: {
        width: 30,
        height: 30,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listViewContainer: {
        paddingLeft: 3,
        paddingRight: 3,
        paddingBottom: 3,
    },
});
