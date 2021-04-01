import React, { useEffect } from "react";
import { StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import { loadPlaces } from "../store/places-actions";

const PlacesListScreen = (props) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.places);
  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);
  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          onSelect={() => {
            props.navigation.navigate({
              routeName: "PlaceDetails",
              params: {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id,
              },
            });
          }}
          image={itemData.item.imageUri}
          address={itemData.item.address}
          title={itemData.item.title}
        />
      )}
    />
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
