/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Spotify from './components/Spotify';
import SpotifyListing from './components/SpotifyListing';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';

function App(): React.JSX.Element {


  return (
    <>
      {/* <StatusBar barStyle={'light-content'} backgroundColor={'#00331f'} /> */}
      <NavigationContainer>
        <Auth />
      </NavigationContainer>
      {/* <Spotify /> */}
      {/* <SpotifyListing /> */}
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
