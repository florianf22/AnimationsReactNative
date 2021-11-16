import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
//
import styles from '../styles';

const { height, width } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.28;
const IMAGE_WIDTH = width;

const CardInfo = ({ url, title, museum, price, scrollX, index }) => {
  const rStyled = useAnimatedStyle(() => {
    const inputRange = [
      (index - 0.2) * IMAGE_WIDTH,
      index * IMAGE_WIDTH,
      (index + 0.2) * IMAGE_WIDTH,
    ];

    const opacity = interpolate(scrollX.value, inputRange, [0, 1, 0]);

    const rotateY = interpolate(scrollX.value, inputRange, [90, 0, 90]);

    return {
      opacity,
      transform: [{ rotateY: `${rotateY}deg` }],
    };
  });

  return (
    <Animated.View style={[styles.card, rStyled]}>
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={styles.textDescription}>{museum}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.textPrice}>{price}</Text>
        <Text style={styles.textCurrency}>USD</Text>
      </View>
    </Animated.View>
  );
};

export default CardInfo;
