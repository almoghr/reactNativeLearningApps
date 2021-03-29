import React, {useState, useEffect, useCallback} from "react";
import { FlatList, Platform, View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrders } from '../../store/products/actions/orders'
import Colors from '../../constants/colors'
const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders.orders);

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      dispatch(fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading]);


  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadOrders)

    return () => {
      willFocusSub.remove()
    }
  }, [loadOrders])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};


OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  centered:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default OrdersScreen;
