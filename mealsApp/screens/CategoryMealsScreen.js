import React from 'react'
import { StyleSheet, Text, Button, View } from 'react-native'
import { CATEGORIES } from '../data/dummy-data'
import Colors from '../constants/color'
const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(category => category.id === catId);

    return (
        <View style={styles.screen}>
            <Text>CategoryMeal</Text>
            <Button title="go to meals" onPress={() => { 
                props.navigation.navigate({routeName: 'MealDetails'})
            }} />
        </View>
    )
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(category => category.id === catId);

    return{
        headerTitle: selectedCategory.title,
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary: ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary 
    }
}



const styles = StyleSheet.create({
    screen:{
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
    },
})

export default CategoryMealsScreen