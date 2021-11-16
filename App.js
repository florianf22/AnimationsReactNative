import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

export default () => {
  const [loaded] = useFonts({
    Mulish: require('./assets/fonts/Mulish.ttf'),
    MulishBold: require('./assets/fonts/MulishBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    ></View>
  );
};
