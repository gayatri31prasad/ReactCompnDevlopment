import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    FlatList,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    TouchableNativeFeedback,
} from 'react-native';
import Events from './Events';

const AutoCompleteListView = ({
    predictions = [],
    onSelectPlace,
}) => {

    const [state, setState] = useState({
        inFocus: false,
    });

    useEffect(() => {
        Events.listen('InputBlur', 'ListViewID', _onTextBlur);
        Events.listen('InputFocus', 'ListViewID', _onTextFocus);

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        return () => {
            Events.rm('InputBlur', 'ListViewID');
            Events.rm('InputFocus', 'ListViewID');
        }
    },)

    const _onTextFocus = () => {
        setState({ ...state, inFocus: true });
    };

    const _onTextBlur = () => {
        setState({ ...state, inFocus: false });
    };


    const _renderItem = ({ item }) => {
        console.log(">>> item", item)
        const TouchableControl = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
        const { structured_formatting } = item;
        return (
            <TouchableControl onPress={() => Events.trigger('PlaceSelected', item.place_id)}>
                <View style={styles.row}>
                    <Text style={styles.primaryText} numberOfLines={1}>
                        {structured_formatting.main_text}
                    </Text>
                    <Text style={styles.secondaryText} numberOfLines={1}>
                        {structured_formatting.secondary_text}
                    </Text>
                </View>
            </TouchableControl>
        );
    }

    const _getFlatList = () => {
        const style = state.inFocus ? null : { height: 0 };
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                elevation={3}
                style={[styles.list, style]}
                data={predictions}
                renderItem={_renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                keyboardShouldPersistTaps={'handled'}
                keyExtractor={item => item.id}
            />
        );
    };

    return Platform.OS === 'android' ? (
        _getFlatList()
    ) : (
        <View style={styles.listContainer}>{_getFlatList()}</View>
    );
}

export default AutoCompleteListView

const styles = StyleSheet.create({
    row: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        paddingLeft: 8,
        paddingRight: 5,
    },
    list: {
        backgroundColor: 'white',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        maxHeight: 220,
    },
    listContainer: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.24,
        backgroundColor: 'transparent',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    primaryText: {
        color: '#545961',
        fontSize: 14,
    },
    secondaryText: {
        color: '#A1A1A9',
        fontSize: 13,
    },
});