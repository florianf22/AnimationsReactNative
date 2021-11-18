import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
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
import AnimatedImage from '../components/AnimatedImage';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SPACING } from '../constants';
import { IMAGES } from '../data';

const IMAGES_REVERSE = IMAGES.slice().reverse();

const ListScreen = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollY = useSharedValue(0);

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          if (activeIndex <= 0) return;

          setActiveIndex(activeIndex - 1);
          scrollY.value = withTiming(SPACING * (activeIndex - 1));
        }
      }}
    >
      <FlingGestureHandler
        direction={Directions.DOWN}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            if (activeIndex >= IMAGES.length - 1) return;

            setActiveIndex(activeIndex + 1);
            scrollY.value = withTiming(SPACING * (activeIndex + 1));
          }
        }}
      >
        <View style={styles.container}>
          <FlatList
            data={IMAGES_REVERSE}
            renderItem={({ item: { uri, id, country }, index }) => {
              return (
                <AnimatedImage
                  uri={uri}
                  index={index}
                  scrollY={scrollY}
                  country={country}
                  activeIndex={activeIndex}
                />
              );
            }}
            style={styles.flatList}
            scrollEnabled={false}
            visi
          />
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

export default ListScreen;
