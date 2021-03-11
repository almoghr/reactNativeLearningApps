import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import Colors from '../constants/colors'
const Header = ({title}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'purple',
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: platform.OS === 'ios' ? '#ccc' : transparent,
        borderBottomWidth: platform.OS === 'ios' ? 1 : 0
    },
    headerTitle: {
    color: Platform.OS === 'ios' ? Colors.primary : "white",
    fontFamily: 'open-sans-bold',
    fontSize: 30,
    }
})

export default Header
