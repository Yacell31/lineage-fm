import React, { useEffect, useState } from "react";
import { View, StyleSheet,Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayerScreen from "./screens/PlayerScreen";

import SplashScreenComponent from "./screens/SplashScreen";
import LoadingScreen from "./screens/LoadingScreen";



const Stack = createNativeStackNavigator();
export default function App() {
	

	return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreenComponent} options={{ headerShown: false }} />
      <Stack.Screen name="MainScreen" component={PlayerScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
