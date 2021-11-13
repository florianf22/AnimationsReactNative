import * as React from 'react';
import {
  Image,
  FlatList,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;
const DOT_SIZE = 12;
const DOT_INDICATOR_SIZE = (DOT_SIZE * 3) / 2;
const DOT_LEFT_PADDING = 20;

const images = [
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445',
];

const product = {
  title: 'SOFT MINI CROSSBODY BAG WITH KISS LOCK',
  description: [
    'Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.',
    'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"',
  ],
  price: '29.99£',
};

const Indicator = ({ scrollY, activeIndex }) => {
  const rStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [
        (activeIndex - 1) * ITEM_HEIGHT,
        activeIndex * ITEM_HEIGHT,
        (activeIndex + 1) * ITEM_HEIGHT,
      ],
      [
        ((activeIndex - 1) * DOT_SIZE * 3) / 2,
        0,
        ((activeIndex + 1) * DOT_SIZE * 3) / 2,
      ]
    );

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: DOT_INDICATOR_SIZE,
          width: DOT_INDICATOR_SIZE,
          borderRadius: DOT_INDICATOR_SIZE,
          position: 'absolute',
          top: ITEM_HEIGHT / 2 - DOT_SIZE / 4,
          left: DOT_LEFT_PADDING - DOT_SIZE / 4,
          borderColor: '#333',
          borderWidth: 1,
        },
        rStyle,
      ]}
    />
  );
};

export default () => {
  const scrollY = useSharedValue(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const bottomSheetRef = React.useRef(null);

  const snapPoints = React.useMemo(
    () => [height / 2, height - ITEM_HEIGHT],
    []
  );

  // callbacks
  const handleSheetChanges = React.useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar hidden />
      <View style={{ height: ITEM_HEIGHT }}>
        <FlatList
          data={images}
          renderItem={({ item: uri, index }) => {
            return (
              <Image
                key={index}
                source={{ uri }}
                style={{ height: ITEM_HEIGHT, width: ITEM_WIDTH }}
              />
            );
          }}
          keyExtractor={uri => uri}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate={'normal'}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={e => {
            scrollY.value = withTiming(e.nativeEvent.contentOffset.y);
          }}
        />
      </View>

      <FlatList
        data={images}
        renderItem={({ item: uri, index }) => {
          return (
            <View>
              <View
                style={{
                  height: DOT_SIZE,
                  width: DOT_SIZE,
                  backgroundColor: '#333',
                  borderRadius: DOT_SIZE,
                  marginBottom: DOT_SIZE / 2,
                }}
              />
            </View>
          );
        }}
        keyExtractor={uri => uri}
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{
          position: 'absolute',
          top: ITEM_HEIGHT / 2,
          left: DOT_LEFT_PADDING,
        }}
      />

      <Indicator scrollY={scrollY} activeIndex={activeIndex} />

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>{product.title}</Text>
          <Text>{product.price}</Text>
          {product.description.map((text, index) => (
            <Text key={index}>{text}</Text>
          ))}
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({});
