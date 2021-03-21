import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'

import CartScreen from '../screens/shop/CartScreen'
// import OrdersScreen from '../screens/shop/OrdersScreen'
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import Colors from '../constants/colors'
import { Platform } from 'react-native'

const ProductsNavigator = createStackNavigator({
    ProductsOverview:{
        screen: ProductsOverviewScreen
    },
    ProductDetail:{
       screen: ProductDetailsScreen,
    },
    Cart:{
        screen: CartScreen,
    }
}, {
    defaultNavigationOptions: {
        headerStyle: { 
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS==='android' ? 'white' : Colors.primary
    }
})

export default createAppContainer(ProductsNavigator)