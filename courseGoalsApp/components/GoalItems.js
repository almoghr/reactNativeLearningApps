import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
const GoalItems = ({ goal, id, onDelete }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onDelete(id)}>
      <View style={styles.listItems}>
        <Text>{goal}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItems: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },
});
export default GoalItems;
