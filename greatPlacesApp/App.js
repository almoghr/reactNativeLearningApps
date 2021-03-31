import React from "react";
import {} from "react-native";
import PlacesNavigator from "./navigation/PlacesNavigator";
import { Provider } from "react-redux";
import store from "./store/store";
import { enableScreens } from "react-native-screens";
import { init } from "./helpers/db";

init().then(() => {
}).catch(err => {
  console.log(err)
});
enableScreens();
console.log(store.getState())
export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
