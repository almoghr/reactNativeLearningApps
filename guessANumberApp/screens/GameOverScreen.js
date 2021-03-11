import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";
const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          // source={require("../assets/success.png")}
          source={{
            uri:
              "https://media.istockphoto.com/photos/businessman-standing-on-mountain-peak-picture-id1082721304?k=6&m=1082721304&s=612x612&w=0&h=Qpir2I76ZejZlu5qMUTZqGRmXjMGfPaB6z4CO-McZNo=",
          }}
        />
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Your Phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
      </View>
      <MainButton onPress={onRestart}>NEW GAME</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
  },
  resultContainer: {
      marginHorizontal: 30,
      marginVertical: 15

  },
  resultText: {
    fontFamily: "open-sans",
    textAlign: "center",
    fontSize: 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
