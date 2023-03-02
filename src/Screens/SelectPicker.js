import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SelectDropdown from './SelectDropdown'
import Icon from 'react-native-vector-icons/FontAwesome';

const SelectPicker = (props) => {
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 15 }}>
                <Text>SelectPicker</Text>
                <SelectDropdown
                    data={monthStr}
                    onSelect={(value, index) => { console.log('..........', value); }} />

                {/* <Icon name="rocket" size={30} color="#900" /> */}
            </View>
        </SafeAreaView>)
}

export default SelectPicker

const styles = StyleSheet.create({})