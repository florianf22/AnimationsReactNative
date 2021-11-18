import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
//
import {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SPACING,
} from '../constants';
import { IMAGES } from '../data';

const length = IMAGES.length - 1;

const AnimatedImage = ({ uri, index, scrollY, country, activeIndex }) => {
  const navigation = useNavigation();

  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (length - index - 1) * SPACING,
      (length - index) * SPACING,
      (length - index + 1) * SPACING,
    ];

    const opacity = interpolate(scrollY.value, inputRange, [
      1 - 1 / (length - index + 0.5),
      1,
      0,
    ]);

    const scale = interpolate(scrollY.value, inputRange, [
      1 - 1 / (length - index + 25),
      1,
      1.2,
    ]);

    return {
      opacity,
      transform: [
        { translateY: (-(length - index) * SPACING * 3) / 2 }, // static
        { scale },
      ],
    };
  });

  return (
    <Animated.View style={[styles.imageContainer, rStyle]}>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log(index);
          navigation.navigate('Details', { item: activeIndex });
        }}
      >
        <SharedElement id={`item.${activeIndex}.photo`}>
          <Image source={{ uri }} style={styles.image} />
        </SharedElement>
        <Text style={styles.text}>{country}</Text>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top:
      (SCREEN_HEIGHT - IMAGE_HEIGHT) / 2 +
      Math.floor((((SPACING * 3) / 2) * (IMAGES.length - 1)) / 2),
    left: (SCREEN_WIDTH - IMAGE_WIDTH) / 2,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 20,
  },
  text: {
    position: 'absolute',
    bottom: (SPACING / 3) * 2,
    left: SPACING,
    color: '#fff',
    fontFamily: 'MulishBold',
    fontSize: 32,
    textTransform: 'uppercase',
  },
});

export default AnimatedImage;
