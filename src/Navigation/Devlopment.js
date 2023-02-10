import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Calender from '../Screens/Calender';
import Login from '../Screens/Login';
import SelectPicker from '../Screens/SelectPicker';

const Devlopment = () => {
    const Dev = createStackNavigator();
    return (
        <Dev.Navigator initialRouteName="SelectPicker">
            <Dev.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
            />
            <Dev.Screen
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
                    headerTitle: 'MyCalender',
                    headerTitleAlign: 'center',
                }}
                name="Calender"
                component={Calender}
            />
            <Dev.Screen
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
                    headerTitle: 'SelectPicker',
                    headerTitleAlign: 'center',
                }}
                name="SelectPicker"
                component={SelectPicker}
            />
        </Dev.Navigator>
    )
}

export default Devlopment

const styles = StyleSheet.create({})