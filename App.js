import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
//
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default () => {
  const [loaded] = useFonts({
    Mulish: require('./assets/fonts/Mulish.ttf'),
    MulishBold: require('./assets/fonts/MulishBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingVertical: 60,
    justifyContent: 'space-between',
  },
});
