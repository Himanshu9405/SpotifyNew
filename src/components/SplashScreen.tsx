import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerImage}>
        <Image source={require('./assests/splash.png')} style={styles.image} />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00331f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage: {
    backgroundColor: '#00331f',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
   
  },
});
