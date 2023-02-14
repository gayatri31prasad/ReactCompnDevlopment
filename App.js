import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Orientation from 'react-native-orientation';
import Devlopment from './src/Navigation/Devlopment';
import MapNavigation from './src/Navigation/MapNavigation';

const App = () => {
  // Orientation.lockToPortrait();

  return (
    <NavigationContainer>
      {true ? <Devlopment /> : <MapNavigation />}
    </NavigationContainer>
  );
};

{
  /* full screen
    <DoctorStack.Screen
  name="PreviewSelectedPre"
  component={PreviewSelectedPre}
  options={{headerShown: false,}}/> 

  <DoctorStack.Screen
    options={{
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => props.navigation.navigate('Area Of Service Note')}>
          <Feather name="info" color="white" size={20} />
        </TouchableOpacity>
      ),
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#74AEC2',
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 18,
        width: '120%',
      },
      headerTitle: 'Areas Of Service',
    }}
    name="Area Of Service"
    component={CreateAreaOfService}
  />
  */
}

export default App;

const styles = StyleSheet.create({});
