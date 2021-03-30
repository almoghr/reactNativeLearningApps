import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from 'react-native'
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from '../constants/Colors'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white'
};
const PlacesNavigator = createStackNavigator(
  {
    Places: {
      screen: PlacesListScreen,
    },
    PlaceDetails: {
      screen: PlaceDetailsScreen,
    },
    NewPlace: {
      screen: NewPlaceScreen,
    },
    Map: {
      screen: MapScreen,
    },
  },
  { defaultNavigationOptions: defaultNavOptions }
);


export default createAppContainer(PlacesNavigator)