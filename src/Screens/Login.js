import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Login = props => {
  const [userName, setuserName] = useState('');
  const [Password, setPassword] = useState('');

  const onSignIn = () => {
    if (userName == '' || Password == '') {
      Alert.alert('Alert', 'UserName and Password is required')
    } else {
      // Alert.alert('Work on Progress ...........')
      props.navigation.navigate('Calender')
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <TouchableWithoutFeedback
        style={[{ justifyContent: 'center', height: '100%' }]}
        onPress={() => { Keyboard.dismiss() }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 20, }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 40,
              color: '#3F7B8F',
            }}>
            LogIn
          </Text>
          <View
            style={[
              styles.shado,
              {
                flexDirection: 'row',
                marginBottom: 10,
                borderRadius: 6,
                marginTop: 20,
              },
            ]}>
            <TextInput
              placeholder="User Name"
              keyboardType="default"
              value={userName}
              style={[styles.inputSty]}
              onChangeText={val => { setuserName(val); }}
            />
          </View>
          <View
            style={[
              styles.shado,
              { flexDirection: 'row', marginBottom: 10, borderRadius: 6 },
            ]}>
            <TextInput
              placeholder="Password"
              keyboardType="default"
              secureTextEntry={true}
              value={Password}
              style={[styles.inputSty]}
              onChangeText={val => {
                setPassword(val);
              }}
            />
          </View>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              //   props.navigation.navigate('Forgot Password');
              Alert.alert('Work on Progress ...........')
            }}>
            <Text style={{ color: '#000', textDecorationLine: 'underline' }}>
              {' Forgot Your Password?'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { onSignIn() }}
            style={{
              paddingVertical: 10,
              width: '100%',
              backgroundColor: '#3F7B8F',
              alignItems: 'center',
              marginVertical: 20,
              borderRadius: 8,
            }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFF' }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  shado: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
  },
  inputSty: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#000',
    width: '100%',
  }
});
