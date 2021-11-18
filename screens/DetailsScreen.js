import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';
//
import { AVATARS, IMAGES } from '../data';
import { AVATAR_SIZE, SPACING } from '../constants';

const DetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const imageObj = IMAGES.find(image => image.id === item + 1);

  return (
    <View style={styles.container}>
      <SharedElement id={`item.${item}.photo`} style={StyleSheet.absoluteFill}>
        <Image
          style={StyleSheet.absoluteFill}
          source={{
            uri: imageObj.uri,
          }}
        />
      </SharedElement>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.goBack()}
      >
        <Feather name="chevron-left" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={styles.innerContainer}>
        <View>
          <Text style={[styles.text, styles.textAvatarsContainer]}>
            Your Team
          </Text>
          <View style={styles.avatarsContainer}>
            {AVATARS.map((uri, index) => (
              <View key={index} style={{ elevation: AVATARS.length - index }}>
                <Image source={{ uri }} style={styles.image} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textLabel]}>Distance</Text>
          <View style={styles.innerTextContainer}>
            <Text style={[styles.text, styles.textQuantity]}>29</Text>
            <Text style={[styles.text, styles.textMeasure]}>km</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textLabel]}>Height</Text>
          <View style={styles.innerTextContainer}>
            <Text style={[styles.text, styles.textQuantity]}>2248</Text>
            <Text style={[styles.text, styles.textMeasure]}>m</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  innerContainer: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  avatarsContainer: {
    flexDirection: 'row',
  },
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: -SPACING / 3,
  },
  text: {
    fontFamily: 'Mulish',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  textAvatarsContainer: {
    marginBottom: SPACING / 2,
  },
  textContainer: {
    marginLeft: SPACING,
  },
  textLabel: {},
  innerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 13,
  },
  textQuantity: {
    fontSize: 25,
    fontFamily: 'MulishBold',
  },
  textMeasure: {
    fontSize: 14,
    marginBottom: 3,
  },
  touchable: {
    position: 'absolute',
    left: SPACING / 2,
    top: SPACING,
  },
});

export default DetailsScreen;
