import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number App" />
      {!userNumber ? (
        <StartGameScreen onStartGame={startGameHandler} />
      ) : !guessRounds ? (
        <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      ) : (
        <GameOverScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
