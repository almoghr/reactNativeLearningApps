import React from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => 
        <Text>{itemData.item.title}</Text>
      }
    />
  );
};
 
ProductsOverviewScreen.navigationOptions = () => {
    return {
        headerTitle: 'All Products',
    },
}

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
