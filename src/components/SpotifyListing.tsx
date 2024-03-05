import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {playListData} from './constants';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

const {height: windowHeight} = Dimensions.get('window');

const SpotifyListing = () => {
  const navigation = useNavigation();
  const handleCardPress = async (index: any) => {
    navigation.navigate('details', {index});
  };

  async function getState() {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(playListData);
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      // await TrackPlayer.play();
    } catch (err) {
      // console.error(err);
      console.error('start', err);
    }
  }

  useEffect(() => {
    getState();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Playlist</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={playListData}
          renderItem={items => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleCardPress(items.item)}>
                <View>
                  <Image
                    source={{uri: items?.item?.artwork}}
                    style={{height: 70, width: 70, borderRadius: 50, margin: 5}}
                  />
                </View>
                <View>
                  <Text style={{color: 'black', fontSize: 22, marginLeft: 2}}>
                    {items?.item?.album}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      marginLeft: 2,
                      fontWeight: '300',
                    }}>
                    {items?.item?.artist}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
{
  /* {currentTrack && (
    <View style={styles.currenTrack}>
      <Image source={{uri: currentTrack.artwork}} style={{padding: 3,height: 80, width: 80, backgroundColor: 'black', borderRadius: 50}} />
    </View>
  )} */
}

export default SpotifyListing;

const styles = StyleSheet.create({
  card1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 4,
  },
  elevatedCard: {
    backgroundColor: '#808080',
    elevation: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#00331f',
  },
  linearGradient: {
    height: windowHeight,
  },
  textContainer: {
    padding: windowHeight / 35,
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  cardContainer: {
    margin: 20,
    backgroundColor: 'black',
    height: 670,
    borderRadius: 20,
  },
  card: {
    margin: 10,
    backgroundColor: '#40bf40',
    height: 80,
    borderRadius: 20,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'flex-end',
  },
  currenTrack: {
    margin: 2,
    backgroundColor: 'white',
    height: 80,
    borderRadius: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  container1: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
  },
  card1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    margin: 4,
    borderRadius: 4,
  },
  cardOne: {
    backgroundColor: '#ff0000',
  },
  cardTwo: {
    backgroundColor: '#008000',
  },
  cardThree: {
    backgroundColor: '#0000FF',
  },
});
