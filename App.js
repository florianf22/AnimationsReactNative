import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
//
import ListScreen from './screens/ListScreen';
import DetailsScreen from './screens/DetailsScreen';

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
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          sharedElements={(route, otherRoute, showing) => {
            const { id } = route.params;
            return [`item.${id}.photo`];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
