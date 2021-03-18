import React, { useEffect, useCallback } from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/CustomHeaderButton";
import DefaultText from "../Components/DefaultText";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";
const MealDetailsScreen = (props) => {

  const dispatch = useDispatch();
  
  const meals = useSelector((state) => state.meals.meals);
  const mealId = props.navigation.getParam("mealId");
  const currentMealIsFavorite = useSelector((state) => state.meals.favoriteMeals.some(meal => meal.id === mealId))
  const selectedMeal = meals.find((meal) => meal.id === mealId);

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);
  
  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite })
  } ,[currentMealIsFavorite])

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText style={styles.detailsText}>
          {selectedMeal.duration} Min
        </DefaultText>
        <DefaultText style={styles.detailsText}>
          {selectedMeal.complexity}
        </DefaultText>
        <DefaultText style={styles.detailsText}>
          {selectedMeal.affordability}
        </DefaultText>
      </View>
      <Text style={styles.title}>ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <DefaultText style={styles.listItem} key={ingredient}>
          {ingredient}
        </DefaultText>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <DefaultText style={styles.listItem} key={step}>
          {step}
        </DefaultText>
      ))}
      <View style={styles.screen}>
        <Text>{selectedMeal.title}</Text>
      </View>
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
  const title = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam('toggleFav')
  isFavorite = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: title,
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Favorite"
            iconName={isFavorite ? "ios-star" : 'ios-star-outline' }
            onPress={toggleFavorite}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
    backgroundColor: "#ccc",
  },
  detailsText: {
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "orange",
    borderWidth: 2,
    padding: 10,
  },
});

export default MealDetailsScreen;
