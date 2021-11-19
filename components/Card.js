import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated from 'react-native-reanimated';
//
import { height, width, spacing, cardHeight, cardWidth } from '../constants';

const Card = ({
  avatar,
  fullName,
  position,
  shots,
  followers,
  following,
  style,
  index,
  animatedStyle,
}) => {
  return (
    <Animated.View style={[styles.card, style, animatedStyle]}>
      <View style={styles.cardCol}>
        <Image source={{ uri: avatar }} style={styles.avatar} />

        <View style={styles.nameAndPosWrapper}>
          <Text style={[styles.text, styles.name]}>{fullName}</Text>
          <Text style={[styles.text, styles.position]}>{position}</Text>
        </View>
      </View>
      <View style={styles.cardColTwo}>
        <View style={styles.statsWrapper}>
          <Text style={[styles.text, styles.statsTitle]}>Shots</Text>
          <Text style={[styles.text, styles.statsNumber]}>{shots}</Text>
        </View>

        <View style={styles.statsWrapper}>
          <Text style={[styles.text, styles.statsTitle]}>Followers</Text>
          <Text style={[styles.text, styles.statsNumber]}>{followers}</Text>
        </View>

        <View style={styles.statsWrapper}>
          <Text style={[styles.text, styles.statsTitle]}>Following</Text>
          <Text style={[styles.text, styles.statsNumber]}>{following}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: cardWidth,
    height: cardHeight,
    padding: spacing,
    justifyContent: 'center',
  },
  cardCol: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardColTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing / 2,
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  nameAndPosWrapper: {
    marginLeft: spacing / 2,
  },
  name: {
    color: '#000',
    fontFamily: 'MulishBold',
    fontSize: 18,
  },
  position: {
    color: '#333',
    fontSize: 13,
  },
  statsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsTitle: {
    fontFamily: 'MulishBold',
    color: '#000',
  },
  statsNumber: {
    color: '#333',
    fontFamily: 'Mulish',
    fontSize: 15,
  },
  text: {
    color: '#fff',
    fontFamily: 'Mulish',
    fontSize: 20,
  },
});

export default Card;
