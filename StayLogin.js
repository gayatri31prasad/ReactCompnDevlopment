//............. step 1
import React from 'react';

export const AuthContext = React.createContext();

////........................................use logout

import { useContext } from 'react';
import { AuthContext } from 'filename'; //where file is stored

const { signOut } = useContext(AuthContext);

signOut();

////........................................use login

import React, { useContext } from 'react';
import { AuthContext } from 'filename'; //where file is stored

const { signIn } = useContext(AuthContext);

// sucess api

signIn(data.username, data.password, res.roles, rd);

/////.............................................main page setlogin state //......................... step 3

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useMemo, useReducer, useEffect } from 'react';
import { StyleSheet, StatusBar, Platform } from 'react-native';
import { AuthContext } from 'filename'; //where file is stored

const initialLogin = {
  isLoading: true,
  userName: null,
  userToken: null,
  userRole: null,
};

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIVE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
        userRole: action.role,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
        userRole: action.role,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userName: null,
        userToken: null,
        isLoading: false,
        userRole: null,
      };
    case 'REGISTER':
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
        userRole: action.role,
      };
  }
};
const [loginState, dispatch] = useReducer(loginReducer, initialLogin);

const authContext = useMemo(
  () => ({
    signIn: async (userName, password, roles, detail) => {
      try {
        let u = JSON.parse(detail);

        dispatch({ type: 'LOGIN', id: userName, token: userName, role: roles });

        await AsyncStorage.setItem('userToken', 'token');
        await AsyncStorage.setItem('USER_ROLE', roles);
      } catch (error) {
        console.log('error', error);
      }
    },
    signOut: async () => {
      try {
        dispatch({ type: 'LOGOUT' });
        await AsyncStorage.clear();
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('USER_ROLE');
        await AsyncStorage.removeItem('doctorObj');
        await AsyncStorage.removeItem('doctorBusinessObj');
      } catch (error) {
        dispatch({ type: 'LOGOUT' });
        console.log('error', error);
      }
    },
    signUp: async (userName, password) => {
      try {
        await AsyncStorage.setItem('userToken', 'token');
      } catch (error) {
        console.log('error', error);
      }
      dispatch({ type: 'REGISTER', id: userName, token: 'token' });
    },
  }),
  [],
);

//..................app.js main tag .................... step 2

return (
  <AuthContext.Provider value={authContext}>
    <StatusBar backgroundColor="#3F7B8F" barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} />
  </AuthContext.Provider>);
