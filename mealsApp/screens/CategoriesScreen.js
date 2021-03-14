import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  Button,
  View,
  TouchableOpacity,
  Platform
} from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Colors from '../constants/color'
const CategoriesScreen = (props) => {


    
  renderGridItem = (itemData) => {
    return (
      <TouchableOpacity style={styles.gridItem} onPress={() => {
          props.navigation.navigate({ routeName: 'CategoryMeals', params: {categoryId: itemData.item.id} })
      }}>
        <View >
          <Text>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = () => {
    return {
        headerTitle: 'welcome',
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary: ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default CategoriesScreen;
