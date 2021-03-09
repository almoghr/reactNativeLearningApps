import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

const StartGameScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <View style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <TextInput />
        <View style={styles.buttonContainer}>
          <Button title="reset" color="red" onPress={() => {}}/>
          <Button title="confirm" color="blue" onPress={() => {}}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,

  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    //shadows for ios
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    // shadows for android
    elevation: 5,
    padding: 20,
    borderRadius: 20

  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  }
});

export default StartGameScreen;
