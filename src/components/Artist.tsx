import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {songs} from './constants';

const {height: windowHeight} = Dimensions.get('window');

const Artist = ({route}: any) => {
  const [artistData, setArtistData] = useState([]);
  useEffect(() => {
    {
      songs.map(
        (obj: any) =>
          Object.keys(obj)[0] === route.params &&
          setArtistData(obj[route.params]),
      );
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Artist</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={artistData}
          keyExtractor={({item}, index) => index.toString()}
          renderItem={item => {
            return (
              <TouchableOpacity
                style={styles.card}
                // onPress={() => handleCardPress(items.item)}
              >
                <View>
                  <Image
                    source={{uri: item?.item?.artwork}}
                    style={{height: 70, width: 70, borderRadius: 50, margin: 5}}
                  />
                </View>
                <View>
                  <Text style={{color: 'black', fontSize: 22, marginLeft: 2}}>
                    {item?.item?.album}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      marginLeft: 2,
                      fontWeight: '300',
                    }}>
                    {item?.item?.artist}
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

export default Artist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00331f',
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
    borderRadius: 20,
  },
  card: {
    margin: 10,
    backgroundColor: '#40bf40',
    height: 80,
    borderRadius: 20,
    flexDirection: 'row',
  },
});
