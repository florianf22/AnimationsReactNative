import * as React from 'react';
import { Image, Text, View, StyleSheet, Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
//
import unsplash from './api/unsplash';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');
const BOTTOM_FLAT_LIST_SIZE = 80;

import data from './data';

export default () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const mainFlatListRef = React.useRef(null);
  const bottomFlatListRef = React.useRef(null);

  const handleOnMomentumScrollEnd = e => {
    setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH));
    bottomFlatListRef.current.scrollToOffset({
      offset: activeIndex * BOTTOM_FLAT_LIST_SIZE,
      animated: true,
    });
  };

  const onClickEvent = index => {
    mainFlatListRef.current.scrollToOffset({
      animated: true,
      offset: index * SCREEN_WIDTH,
    });

    bottomFlatListRef.current.scrollToOffset({
      offset: index * BOTTOM_FLAT_LIST_SIZE,
      animated: true,
    });

    setActiveIndex(index);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item: uri }) => (
          <View style={[{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }]}>
            <Image
              source={{ uri }}
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
          </View>
        )}
        keyExtractor={uri => uri}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={handleOnMomentumScrollEnd}
        ref={mainFlatListRef}
      />
      <FlatList
        data={data}
        renderItem={({ item: uri, index }) => (
          <TouchableOpacity
            style={{
              height: BOTTOM_FLAT_LIST_SIZE,
              width: BOTTOM_FLAT_LIST_SIZE,
              marginRight: 7,
            }}
            onPress={() => onClickEvent(index)}
          >
            <Image
              source={{ uri }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderWidth: 2,
                borderColor: activeIndex === index ? '#fff' : null,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={uri => uri}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          position: 'absolute',
          bottom: BOTTOM_FLAT_LIST_SIZE / 3,
          paddingLeft: 7,
        }}
        ref={bottomFlatListRef}
      />
    </View>
  );
};
