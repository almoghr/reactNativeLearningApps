import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";

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

const GameScreen = ({ userChoice, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  const [pastGuesses, setPastGuesses] = useState([]);
  // const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
  useEffect(() => {
    const updateLayout = () => {
      // setAvailableDeviceWidth(Dimensions.get('window').width)
      setAvailableDeviceHeight(Dimensions.get('window').height)
    }
    Dimensions.addEventListener("change", updateLayout)
    return () => {
      Dimensions.removeEventListener("change", updateLayout)
    }
  })
  const nextGuessHandler = (direction) => {
    if (
      (direction === "LOWER" && currentGuess < userChoice) ||
      (direction === "GREATER" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong", [
        { text: "sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "LOWER") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((currentRounds) => currentRounds + 1);
    setPastGuesses((currentPastGuesses) => [nextNumber, ...currentPastGuesses]);
  };
  const renderListItems = (value, numOfRounds) => (
    <View key={value} style={styles.listItem}>
      <Text style={styles.text}>#{numOfRounds}</Text>
      <Text style={styles.text}>{value}</Text>
    </View>
  );

  if (availableDeviceHeight
    ) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>{" "}
        <MainButton onPress={() => nextGuessHandler("LOWER")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <View style={styles.control}>
          <MainButton onPress={() => nextGuessHandler("LOWER")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => nextGuessHandler("GREATER")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItems(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler("LOWER")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler("GREATER")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItems(guess, pastGuesses.length - index)
          )}
        </ScrollView>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 350,
    maxWidth: "90%",
  },
  text: {
    fontSize: 18,
    fontFamily: "open-sans",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  controls:{
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: "center",
    width: "80%",
  }, 
  listContainer: {
    flex: 1,
    width: "80%",
    textAlign: "center",
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default GameScreen;
