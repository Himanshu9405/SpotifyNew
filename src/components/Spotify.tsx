import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrackPlayer, {RepeatMode, useProgress} from 'react-native-track-player';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import {TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {playListData} from './constants';

type TrackData = {
  album: String;
  artist: String;
  artwork: String;
  title: String;
  id: Number;
  url: string | undefined;
};

const Spotify = () => {
  const [isTrackStart, setIsTrackStart] = useState(false);
  const {position, duration} = useProgress(200);
  const navigation = useNavigation();
  const param = useRoute();
  const data = param?.params?.index;
  const [currentTrack, setCurrentTrack] = useState<TrackData | undefined>(data);

  const getTrackActive = async (data: any) => {
    try {
      await TrackPlayer.skipToPrevious();
      await TrackPlayer.skip(data.id - 1);
      await TrackPlayer.play();
    } catch (err) {
      console.error('getTrackActive', err);
    }
  };

  const skipTonext = async () => {
    await TrackPlayer.skipToNext();
    const data11 = await TrackPlayer.getActiveTrack();
    setCurrentTrack(data11);
  };

  const skipToPrevios = async () => {
    await TrackPlayer.skipToPrevious();
    const data11 = await TrackPlayer.getActiveTrack();
    setCurrentTrack(data11);
  };

  const start = async (data: any) => {
    getTrackActive(data);
    setIsTrackStart(true);
  };

  function format(seconds: any) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  async function changeUI() {
    const currentPlay = await TrackPlayer.getActiveTrack();
    setCurrentTrack(currentPlay);
  }

  useEffect(() => {
    changeUI();
  }, [duration]);

  useEffect(() => {
    start(data);
    isTrackActive();
  }, []);

  const isTrackActive = async () => {
    try {
      const activeState = await TrackPlayer.getPlaybackState();
      if (activeState.state === 'paused') {
        setIsTrackStart(false);
      } else {
        setIsTrackStart(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#00331f', '#1affa3']}
        style={styles.linearGradient}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate('listing')}>
          <FontAwesome6 name={'less-than'} size={20} />
        </TouchableOpacity>
        <View style={styles.trackImageContainer}>
          <Image
            source={{
              uri: currentTrack?.artwork,
            }}
            style={styles.trackImage}
          />
        </View>
      </LinearGradient>

      <View style={{height: 130, marginTop: 5}}>
        <View style={{height: 70, paddingLeft: 10}}>
          <View>
            <Text style={styles.mainText}>{currentTrack?.title}</Text>
            <Text style={styles.secondaryText}>{currentTrack?.artist}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 12}}>
          <Slider
            maximumValue={duration}
            minimumValue={0}
            style={{width: '100%', height: 40}}
            maximumTrackTintColor="#ffffff"
            minimumTrackTintColor="#ffffff"
            value={position}
            // onSlidingStart={async () => {}}
            onValueChange={value => TrackPlayer.seekTo(value)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          }}>
          <Text style={styles.text}>{format(position)}</Text>
          <Text style={styles.text}>{format(duration)}</Text>
        </View>
      </View>
      <View style={styles.bottomTap}>
        <TouchableOpacity onPress={skipToPrevios}>
          <Image
            source={require('./assests/previos-removebg-preview.png')}
            style={{height: 30, width: 25}}
          />
        </TouchableOpacity>

        <View>
          {isTrackStart ? (
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.pause(), setIsTrackStart(false);
              }}>
              {/* <Image
                source={require('./assests/pause-removebg-preview.png')}
                style={{height: 40, width: 40}}
              /> */}
              <FontAwesome name="pause" size={30} style={{color: 'black'}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.play(), setIsTrackStart(true);
              }}>
              <Image
                source={require('./assests/play-removebg-preview.png')}
                style={{height: 50, width: 40}}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={skipTonext}>
          <Image
            source={require('./assests/previos-removebg-preview.png')}
            style={{height: 30, width: 20, transform: [{rotate: '180deg'}]}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Spotify;

const styles = StyleSheet.create({
  linearGradient: {
    height: 650,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  container: {
    backgroundColor: '#00804d',
    flex: 1,
  },
  imageContainer: {
    backgroundColor: 'grey',
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackImageContainer: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackImage: {
    height: 300,
    width: 300,
    backgroundColor: 'black',
  },
  mainText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  secondaryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '300',
    margin: 3,
  },
  text: {
    color: 'white',
  },
  bottomTap: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
