import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlaceDetailsScreen = () => {
    return (
        <View>
            <Text>place details</Text>
        </View>
    )
}

PlaceDetailsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'place'
    }
}


const styles = StyleSheet.create({})

export default PlaceDetailsScreen