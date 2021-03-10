import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const GameOverScreen = ({roundsNumber, userNumber, onRestart}) => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
            <Text>Number of Rounds: {roundsNumber}</Text>
            <Text>Number was: {userNumber}</Text>
            <Button title="NEW GAME" onPress={onRestart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})



export default GameOverScreen

