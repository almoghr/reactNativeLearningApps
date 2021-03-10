import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);


  useEffect(() => {
    if (currentGuess === props.userChoice){
        
    }
  }, [])
  const nextGuessHandler = (direction) => {
    if (
      (direction === "LOWER" && currentGuess < props.userChoice) ||
      (direction === "GREATER" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong", [
        { text: "sorry!", style: "cancel" },
      ]);
    }
    if (direction === "LOWER") {
      currentHigh.current = currentGuess;
    } else if (direction === "GREATER") {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow, currentHigh, currentGuess)
    setCurrentGuess(nextNumber)
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler("LOWER")} />
        <Button title="GREATER" onPress={() => nextGuessHandler("GREATER")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
