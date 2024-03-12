import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SpotifyListing from './components/SpotifyListing';
import Spotify from './components/Spotify';
import SplashScreen from './components/SplashScreen';
import Artist from './components/Artist';

const Stack = createNativeStackNavigator();

const Auth = () => {
  const [splashScreen, setSplashScreen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 1500);
  }, []);
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'#00331f'} />
      {splashScreen ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}} >
          <Stack.Screen name="listing" component={SpotifyListing} />
          <Stack.Screen name="details" component={Spotify} />
          <Stack.Screen name="artist" component={Artist} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Auth;

const styles = StyleSheet.create({});
