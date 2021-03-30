import React from "react";
import { } from "react-native";
import PlacesNavigator from "./navigation/PlacesNavigator";
import { Provider } from "react-redux";
import store from "./store/store";
import { enableScreens } from "react-native-screens";

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

