// Inspiration: https://dribbble.com/shots/14139308-Simple-Scroll-Animation
// Illustrations by: SAMji https://dribbble.com/SAMji_illustrator

import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
const { width, height } = Dimensions.get('screen');

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const imageW = width * 0.6;
const imageH = imageW * 1.54;

const CustomImage = ({ index, uri, translateX }) => {
  const rStyled = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0]
    );

    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, rStyled]}>
      <Image
        source={{ uri }}
        style={{ height: '100%', width: '100%' }}
        blurRadius={40}
      />
    </Animated.View>
  );
};

export default () => {
  const translateX = useSharedValue(0);

  const handleOffsetChange = e => {
    translateX.value = e.nativeEvent.contentOffset.x;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      {data.map((uri, idx) => (
        <CustomImage key={uri} index={idx} uri={uri} translateX={translateX} />
      ))}

      <Animated.ScrollView
        horizontal
        pagingEnabled={true}
        onScroll={handleOffsetChange}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((uri, idx) => (
          <View
            style={{
              height,
              width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={idx}
          >
            <Image
              source={{ uri }}
              style={{
                width: imageW,
                height: imageH,
                resizeMode: 'cover',
                borderRadius: 10,
              }}
            />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};
