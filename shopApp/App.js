import React from 'react';
import { Provider } from 'react-redux'
import store from './store/store'
import NavigationContainer from './navigation/NavigationContainer'
import AppLoading from "expo-app-loading";
import {useFonts } from 'expo-font'
import { enableScreens } from "react-native-screens";

enableScreens();

export default function App() {

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

