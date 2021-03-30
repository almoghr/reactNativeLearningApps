import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MapScreen = () => {
    return (
        <View>
            <Text>map</Text>
        </View>
    )
}


MapScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Map'
    }
}

const styles = StyleSheet.create({})

export default MapScreen