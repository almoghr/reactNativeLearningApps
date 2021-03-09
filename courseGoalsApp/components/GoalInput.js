import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const GoalInput = ({ onAddGoal, isOpen, setIsModalOpen }) => {
  const [enteredGoal, setEnteredGoal] = useState("");
  const goalInputHandler = (enteredText) => {
     setEnteredGoal(enteredText);
  };

  return (
    <Modal visible={isOpen} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goals"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.formButtons}>
          <View style={styles.button}>
            <Button
              style={styles.addButton}
              title="ADD"
              onPress={() => onAddGoal(enteredGoal, setEnteredGoal)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="CANCEL"
              color="red"
              onPress={() => setIsModalOpen(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
      width: "48%",
  }
});
export default GoalInput;
