import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MealDetailsScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>meal details screen</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
    },
})

export default MealDetailsScreen

