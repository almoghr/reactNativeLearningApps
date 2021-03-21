import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
  Button,
  TouchableNativeFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/colors";
import { addToCart } from '../../store/products/actions/cart'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";



const ProductDetailsScreen = (props) => {
    const dispatch = useDispatch 
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((p) => p.id === productId)
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.buttonContainer}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => dispatch(addToCart(selectedProduct))} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => {
  const productTitle = navData.navigation.getParam("productTitle");
  return {
    headerTitle: productTitle,
    headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Cart"
              iconName="ios-cart"
              onPress={() => {  
                // navData.navigation.navigate({routeName: });
              }}
            />
          </HeaderButtons>
        );
      },  

  };
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
});

export default ProductDetailsScreen;
