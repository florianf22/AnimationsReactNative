import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
//
import data from '../data';
import { width, height } from '../constants';

const IMAGE_HEIGHT = width * 0.9;
const IMAGE_WIDTH = width * 0.7;
const SPACING = 20;

const customAnim = {
  from: {
    opacity: 0,
    scale: 0,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
};

const Details = ({ route }) => {
  const { country } = route.params;
  const item = data.find(item => item.country === country);

  return (
    <View style={styles.container}>
      <SharedElement
        id={`item.${country}.photo`}
        style={StyleSheet.absoluteFill}
      >
        <Image
          source={{ uri: item.uri }}
          style={[StyleSheet.absoluteFill, styles.image]}
        />
      </SharedElement>

      <Text style={styles.textCountry}>{country}</Text>

      <Animatable.View
        style={{ height: 200, width: 200, backgroundColor: 'red' }}
        animation={customAnim}
        delay={400 + 400}
      />
      <Animatable.View
        style={{ height: 200, width: 200, backgroundColor: 'blue' }}
        animation={customAnim}
        delay={400 + 400 + 400}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  textCountry: {
    fontSize: 35,
    fontFamily: 'MulishBold',
    position: 'absolute',
    color: '#fff',
    top: SPACING * 3,
    left: (SPACING * 3) / 2,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  image: {},
});

export default Details;
