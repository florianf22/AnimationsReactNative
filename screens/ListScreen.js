import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
//
import Card from '../components/Card';
import { height, width, spacing, cardWidth, cardHeight } from '../constants';
import info from '../data';

const ListScreen = ({ navigation }) => {
  const scrollX = useSharedValue(0);
  const activeIndex = useSharedValue(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={info}
        renderItem={({
          item: {
            image,
            id,
            title,
            subTitle,
            avatar,
            fullName,
            position,
            shots,
            followers,
            following,
          },
          index,
        }) => {
          return (
            <View key={id} style={styles.page}>
              <SharedElement style={styles.pageBg} id={`item.${index}.photo`}>
                <Image source={{ uri: image }} style={styles.pageBg} />
              </SharedElement>
              <View style={styles.titleWrapper}>
                <Text style={[styles.text, styles.title]}>{title}</Text>
              </View>
              <View style={styles.titleWrapper}>
                <Text style={[styles.text, styles.subTitle]}>{subTitle}</Text>
              </View>

              <View style={styles.card}>
                <TouchableOpacity
                  style={styles.touchable}
                  onPress={() => navigation.navigate('Details', { id: index })}
                >
                  <Card
                    avatar={avatar}
                    fullName={fullName}
                    position={position}
                    shots={shots}
                    followers={followers}
                    following={following}
                    index={index}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        horizontal
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        onScroll={e => (scrollX.value = e.nativeEvent.contentOffset.x)}
        onMomentumScrollEnd={e =>
          (activeIndex.value = Math.round(
            e.nativeEvent.contentOffset.x / width
          ))
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  page: {
    width,
    height,
  },
  text: {
    color: '#fff',
    fontFamily: 'Mulish',
    fontSize: 20,
  },
  titleWrapper: {
    position: 'absolute',
    maxWidth: width * 0.9,
  },
  title: {
    fontFamily: 'MulishBold',
    fontSize: 24,
    top: spacing * 3,
    left: spacing,
    textTransform: 'capitalize',
  },
  subTitle: {
    top: spacing * 5,
    left: spacing,
    textTransform: 'capitalize',
    fontSize: 14,
    color: 'rgba(256, 256, 256, .8)',
  },
  pageBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  card: {
    position: 'absolute',
    bottom: 50,
    left: width * 0.05,
    width: width * 0.8,
    height: height * 0.22,
  },
  touchable: {
    width: cardWidth,
    height: cardHeight,
  },
});

export default ListScreen;
