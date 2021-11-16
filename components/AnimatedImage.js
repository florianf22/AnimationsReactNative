import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
//
import styles from '../styles';

const { height, width } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.28;
const IMAGE_WIDTH = width;

const AnimatedImage = ({ url, scrollX, activeIndex, index }) => {
  const rStyled = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * IMAGE_WIDTH,
      index * IMAGE_WIDTH,
      (index + 1) * IMAGE_WIDTH,
    ];

    const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5]);

    const translateY = interpolate(scrollX.value, inputRange, [20, 0, 50]);

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View style={[styles.imageWrapper, rStyled]}>
      <Image source={{ uri: url }} style={styles.image} />
    </Animated.View>
  );
};

export default AnimatedImage;
