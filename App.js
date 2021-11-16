import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
//
import List from './screens/List';
import Details from './screens/Details';

const Stack = createSharedElementStackNavigator();

export default () => {
  const [loaded] = useFonts({
    Mulish: require('./assets/fonts/Mulish.ttf'),
    MulishBold: require('./assets/fonts/MulishBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="List" component={List} />
        <Stack.Screen
          name="Details"
          component={Details}
          sharedElements={(route, otherRoute, showing) => {
            const { country } = route.params;
            return [`item.${country}.photo`];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
