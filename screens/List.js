import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
//
import data from '../data';
import { width, height } from '../constants';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import AnimatedText from '../components/AnimatedCard';

const IMAGE_HEIGHT = width * 0.9;
const IMAGE_WIDTH = width * 0.7;
const SPACING = 20;

const List = () => {
  const scrollX = useSharedValue(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item: { uri, country, days }, index }) => (
          <AnimatedText
            uri={uri}
            country={country}
            days={days}
            index={index}
            scrollX={scrollX}
          />
        )}
        keyExtractor={item => item.country}
        horizontal
        pagingEnabled
        snapToInterval={IMAGE_WIDTH + SPACING}
        showsHorizontalScrollIndicator={false}
        onScroll={e => (scrollX.value = e.nativeEvent.contentOffset.x)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
    paddingVertical: 60,
    justifyContent: 'space-between',
  },
});

export default List;
