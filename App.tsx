/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BasicDetailsScreen from './src/screens/BasicDetailsScreen';
import HeightWeightScreen from './src/screens/HeightWeightScreen';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  

  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="BasicDetails">
        <Stack.Screen
          name="BasicDetails"
          component={BasicDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="HeightWeight" component={HeightWeightScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
