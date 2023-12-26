import React from 'react';
import { View, StyleSheet, Dimensions ,ActivityIndicator} from 'react-native';


const windowWidth = Dimensions.get('window').width;

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={styles.textBlock} />
      <View style={styles.textBlockSmall} />
      <View style={styles.waveform} />
      <View style={styles.controls}>
        <View style={styles.controlButton} />
        <View style={[styles.controlButton, styles.playButton]}>
        <ActivityIndicator style={styles.activity} size="large" color="#6495ED" />
        </View>
        <View style={styles.controlButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'EBF5FB'
  },

  activity:{
    padding:10
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D7DBDD',
    marginBottom: 20,
  },
  textBlock: {
    width: windowWidth - 100,
    height: 20,
    backgroundColor: '#D7DBDD',
    marginBottom: 10,
  },
  textBlockSmall: {
    width: windowWidth - 150,
    height: 20,
    backgroundColor: '#D7DBDD',
    marginBottom: 20,
  },
  waveform: {
    width: windowWidth - 50,
    height: 50,
    backgroundColor: '#D7DBDD',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#D7DBDD',
    marginHorizontal: 10,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,

  },
});

export default SkeletonLoader;
