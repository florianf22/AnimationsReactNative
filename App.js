import * as React from 'react';
import { useFonts } from 'expo-font';
import { Image, Text, View, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
//
import styles from './styles';
import data from './data';
import CardInfo from './components/CardInfo';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AnimatedImage from './components/AnimatedImage';

const { height, width } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.28;
const IMAGE_WIDTH = width;

const App = () => {
  const [fontsLoaded] = useFonts({
    JosefinSansBold: require('./assets/fonts/JosefinSansBold.ttf'),
    JosefinSansRegular: require('./assets/fonts/JosefinSansRegular.ttf'),
  });
  const scrollX = useSharedValue(0);
  const activeIndex = useSharedValue(0);
  const activeBg = useDerivedValue(() => {
    return (scrollX.value / IMAGE_WIDTH) % 1;
  });
  const flatListRef = React.useRef(null);

  const handleScroll = e => {
    scrollX.value = e.nativeEvent.contentOffset.x;
  };

  const handleOnScrollEnd = e => {
    activeIndex.value = Math.round(e.nativeEvent.contentOffset.x / IMAGE_WIDTH);
  };

  const handleScrollNext = () => {
    if (activeIndex.value === data.length - 1) return;

    flatListRef.current.scrollToOffset({
      offset: (activeIndex.value + 1) * IMAGE_WIDTH,
    });

    activeIndex.value = activeIndex.value + 1;
  };

  const handleScrollPrev = () => {
    if (activeIndex.value === 0) return;

    flatListRef.current.scrollToOffset({
      offset: (activeIndex.value - 1) * IMAGE_WIDTH,
    });

    activeIndex.value = activeIndex.value - 1;
  };

  const rStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(activeBg.value, [-1, 0, 1], [180, 0, 180]);

    return {
      transform: [{ rotateY: `${rotateY}deg` }],
    };
  });

  const rStyleBtnPrev = useAnimatedStyle(() => {
    const opacity = withTiming(activeIndex.value === 0 ? 0.6 : 1);

    return {
      opacity,
    };
  });

  const rStyleBtnNext = useAnimatedStyle(() => {
    const opacity = withTiming(activeIndex.value === data.length - 1 ? 0.6 : 1);

    return {
      opacity,
    };
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        <Animated.View style={[styles.innerWrapperBackground, rStyle]} />

        <FlatList
          data={data}
          renderItem={({ item: { url }, index }) => (
            <AnimatedImage
              url={url}
              scrollX={scrollX}
              activeIndex={activeIndex}
              index={index}
            />
          )}
          horizontal
          style={styles.flatList}
          pagingEnabled={true}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleOnScrollEnd}
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
        />

        {data.map((item, index) => (
          <CardInfo
            url={item.url}
            title={item.title}
            museum={item.museum}
            price={item.price}
            scrollX={scrollX}
            index={index}
            key={index}
          />
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <Animated.View style={rStyleBtnPrev}>
          <TouchableOpacity style={styles.touchable} onPress={handleScrollPrev}>
            <Feather
              name="arrow-left"
              size={24}
              color="#000"
              style={styles.icon}
            />
            <Text style={styles.textButton}>PREV</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={rStyleBtnNext}>
          <TouchableOpacity
            style={[styles.touchable, styles.touchableNext]}
            onPress={handleScrollNext}
          >
            <Text style={styles.textButton}>NEXT</Text>
            <Feather name="arrow-right" size={24} color="#000" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default App;
