import React from "react";
import { StyleSheet, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from '../../store/products/actions/cart'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

const ProductsOverviewScreen = (props) => {
    const dispatch = useDispatch()
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          onViewDetail={() =>
            props.navigation.navigate({
              routeName: "ProductDetail",
              params: {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              },
            })
          }
          onAddToCart={() => dispatch(addToCart(itemData.item))}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
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
      )
    },
    headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Cart"
              iconName={Platform.OS === 'android' ? "md-cart" : "ios-cart"}
              onPress={() => {  
                navData.navigation.navigate({routeName: 'Cart'});
              }}
            />
          </HeaderButtons>
        );
      },  
  };
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
