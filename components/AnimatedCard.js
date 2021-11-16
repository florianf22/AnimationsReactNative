import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
//
import { width, height } from '../constants';

const IMAGE_HEIGHT = width * 0.9;
const IMAGE_WIDTH = width * 0.7;
const SPACING = 20;

const AnimatedCard = ({ country, uri, days, index, scrollX }) => {
  const navigation = useNavigation();

  const rStyleText = useAnimatedStyle(() => {
    const inputRange = [
      (IMAGE_WIDTH + SPACING) * (index - 1),
      (IMAGE_WIDTH + SPACING) * index,
      (IMAGE_WIDTH + SPACING) * (index + 1),
    ];

    const translateX = interpolate(scrollX.value, inputRange, [50, 0, -50]);

    return {
      transform: [{ translateX }],
    };
  });

  const rStyledImage = useAnimatedStyle(() => {
    const inputRange = [
      (IMAGE_WIDTH + SPACING) * (index - 1),
      (IMAGE_WIDTH + SPACING) * index,
      (IMAGE_WIDTH + SPACING) * (index + 1),
    ];

    const scale = interpolate(scrollX.value, inputRange, [1.2, 1, 1.2]);

    return {
      transform: [{ scale }],
    };
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push('Details', { country })}
    >
      <SharedElement id={`item.${country}.photo`}>
        <Animated.Image source={{ uri }} style={[styles.image, rStyledImage]} />
      </SharedElement>

      <Animated.Text style={[styles.textCountry, rStyleText]}>
        {country}
      </Animated.Text>

      <View style={styles.pagesContainer}>
        <Text style={styles.textDays}>{days}</Text>
        <Text style={styles.textDaysLabel}>days</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: IMAGE_WIDTH / 12,
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    marginRight: 20,
  },
  textCountry: {
    fontSize: 20,
    fontFamily: 'MulishBold',
    position: 'absolute',
    color: '#fff',
    top: SPACING / 2,
    left: (SPACING / 3) * 2,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  textDays: {
    fontSize: 20,
    fontFamily: 'MulishBold',
    color: '#fff',
  },
  textDaysLabel: {
    fontSize: 16,
    fontFamily: 'Mulish',
    color: '#fff',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: IMAGE_WIDTH / 12,
  },
  pagesContainer: {
    position: 'absolute',
    bottom: SPACING / 2,
    left: (SPACING / 3) * 2,
    height: 60,
    width: 60,
    backgroundColor: 'orangered',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
});

export default AnimatedCard;
