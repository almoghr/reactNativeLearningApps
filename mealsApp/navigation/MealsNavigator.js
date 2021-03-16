import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import Colors from "../constants/color";

const defaultstackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetails: {
      screen: MealDetailsScreen,
    },
  },
  { defaultNavigationOptions: defaultstackNavigationOptions }
);

const FavoriteNavigator = createStackNavigator(
  {
    Favorites: {
      screen: FavoritesScreen,
    },
    MealDetails: {
      screen: MealDetailsScreen,
    },
  },
  { defaultNavigationOptions: defaultstackNavigationOptions }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarColor: Colors.primary,
      tabBarLabel: Plarform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'meals',
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
    },
  },
  Favorites: {
    screen: FavoriteNavigator,
    navigationOptions: {
      tabBarColor: Colors.secondary,
      tabBarLabel: Plarform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle:{ fontFamily: 'open-sans-bold'},
          activeTintColor: Colors.secondary,
        },
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: {
      screen: FiltersScreen,
    },
  },
  { defaultNavigationOptions: defaultstackNavigationOptions }
);

const mainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigtionOptions: {
        drawerLabels: "Meals",
      },
    },
    Filters: {
      screen: FiltersNavigator,
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.secondary,
      labelStyle: { fontFamily: "open-sans-bold" },
    },
  }
);
export default createAppContainer(mainNavigator);
