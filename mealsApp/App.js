import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MealsNavigator from './navigation/MealsNavigator'
import AppLoading from 'expo-app-loading';
import { useFonts } from "expo-font";


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
