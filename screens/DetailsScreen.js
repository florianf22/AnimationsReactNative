import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { height, width } from '../constants';
import MasonryList from '@react-native-seoul/masonry-list';
import { SharedElement } from 'react-navigation-shared-element';
import { MaterialIcons } from '@expo/vector-icons';
//
import info from '../data';
import Card from '../components/Card';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DetailsScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const infoObj = info.find(el => el.id === id);
  const scrollY = useSharedValue(0);

  const rStyleMasonry = useAnimatedStyle(() => {
    const inputRange = [0, height * 0.3];

    const translateY = interpolate(scrollY.value, inputRange, [
      0,
      -height * 0.3,
    ]);

    return {
      transform: [{ translateY }],
    };
  });

  const rStyleCard = useAnimatedStyle(() => {
    const inputRange = [0, height * 0.3];

    const top = interpolate(scrollY.value, inputRange, [0, -height * 0.3]);

    return {
      transform: [{ top: height / 2 }],
    };
  });

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          scrollY.value = withTiming(height * 0.3);
        }
      }}
    >
      <FlingGestureHandler
        direction={Directions.DOWN}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            scrollY.value = withTiming(0);
          }
        }}
      >
        <View style={styles.container}>
          <SharedElement id={`item.${id}.photo`}>
            <Image source={{ uri: infoObj.image }} style={styles.image} />
          </SharedElement>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
          </TouchableOpacity>

          <Card
            avatar={infoObj.avatar}
            fullName={infoObj.fullName}
            position={infoObj.position}
            shots={infoObj.shots}
            followers={infoObj.followers}
            following={infoObj.following}
            style={[styles.card, rStyleCard]}
          />

          <Animated.View style={[styles.masonryContainer, rStyleMasonry]}>
            <MasonryList
              data={info}
              keyExtractor={item => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: { image, id } }) => (
                <Image
                  key={id}
                  source={{ uri: image }}
                  style={[
                    styles.masonryImage,
                    {
                      height: id === 0 ? width / 2 : (width / 2) * 1.6,
                      paddingBottom: height * 0.15,
                    },
                  ]}
                />
              )}
              refreshing={false}
              contentContainerStyle={{
                padding: 5,
                marginTop: height * 0.07 + 5,
              }}
            />
          </Animated.View>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: height / 2,
    width,
    resizeMode: 'cover',
  },
  masonryContainer: {
    height: height * 0.8,
    width,
  },
  masonryImage: {
    width: width / 2 - 15,
    resizeMode: 'cover',
    margin: 5,
  },
  card: {
    position: 'absolute',
    left: width * 0.05,
    elevation: 1,
    zIndex: 1,
  },
  touchable: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
  },
});

export default DetailsScreen;
