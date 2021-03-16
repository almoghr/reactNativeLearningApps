import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import MealsNavigator from './navigation/MealsNavigator'
import AppLoading from 'expo-app-loading';
import { useFonts } from "expo-font";
import { enableScreens } from 'react-native-screens'

enableScreens()

export default function App() {

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
  if (!fontsLoaded) {
    return <AppLoading />
  }

  
  return (
    <MealsNavigator />
  );
}

const styles = StyleSheet.create({});
