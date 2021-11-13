// Inspiration: https://dribbble.com/shots/14154226-Rolodex-Scrolling-Animation/attachments/5780833?mode=media
// Photo by Sharefaith from Pexels
// Background image: https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/

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
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
const { width, height } = Dimensions.get('screen');
import faker from 'faker';

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      'women',
      'men',
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const PADDING_TOP = 42;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_HEIGHT = AVATAR_SIZE + SPACING * 2;

const Item = ({ item, scrollY, index }) => {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-1, index * ITEM_HEIGHT, ITEM_HEIGHT * (index + 3)],
      [1, 1, 0],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollY.value,
      [-1, index * ITEM_HEIGHT, ITEM_HEIGHT * (index + 1)],
      [1, 1, 0]
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          marginBottom: SPACING,
          backgroundColor: '#fff',
          padding: SPACING,
          borderRadius: 10,
          elevation: 3,
          shadowColor: 'black',
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
        },
        rStyle,
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          borderRadius: AVATAR_SIZE / 2,
        }}
      />
      <View
        style={{
          marginLeft: SPACING,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ fontSize: 14, fontWeight: '700' }}>{item.jobTitle}</Text>
        <Text style={{ fontSize: 12, color: '#0099cc' }}>{item.email}</Text>
      </View>
    </Animated.View>
  );
};

export default () => {
  const scrollY = useSharedValue(0);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }}
        style={[
          {
            width,
            height,
            position: 'absolute',
          },
        ]}
        blurRadius={50}
      />
      <ScrollView
        onScroll={e => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: PADDING_TOP,
        }}
      >
        {DATA.map((item, index) => (
          <Item key={item.key} item={item} scrollY={scrollY} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};
