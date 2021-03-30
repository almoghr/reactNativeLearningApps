import React from "react";
import { StyleSheet, Text, View, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector } from 'react-redux'
const PlacesListScreen = () => {
  const places = useSelector((state) => state.places.places)
  return (
    <FlatList data={places} renderItem={(itemData) => <PlaceItem onSelect={() => {props.navigation.navigate({routeName: 'PlaceDetails'})}} image={null} address={null} title={itemData.item.title}/> }/>
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All places",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add place"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              navData.navigation.navigate({ routeName: "NewPlace" });
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
