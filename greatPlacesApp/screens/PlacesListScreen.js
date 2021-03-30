import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
const PlacesListScreen = () => {
  return (
    <View>
      <Text>places list</Text>
    </View>
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All places",
    headerRight: () => {
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate({ routeName: "NewPlace" });
          }}
        />
      </HeaderButtons>;
    },
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
