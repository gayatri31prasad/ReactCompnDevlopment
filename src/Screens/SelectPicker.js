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
                {/* <Icon name="rocket" size={30} color="#900" /> */}
            </View>
        </SafeAreaView>)
}

export default SelectPicker

const styles = StyleSheet.create({})