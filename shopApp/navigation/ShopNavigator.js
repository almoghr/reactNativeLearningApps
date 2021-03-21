import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/colors";
import { Platform } from "react-native";

const defaulNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductsOverviewScreen,
    },
    ProductDetail: {
      screen: ProductDetailsScreen,
    },
    Cart: {
      screen: CartScreen,
    },
  },
  {
    defaultNavigationOptions: defaulNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    orders: {
      screen: OrdersScreen,
    },
  },
  {
    defaultNavigationOptions: defaulNavOptions,
  }
);

const shopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Order: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary,
    }
})
export default createAppContainer(shopNavigator);
