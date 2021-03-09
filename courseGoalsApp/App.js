import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import GoalItems from "./components/GoalItems";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addGoalHandler = (enteredGoal, setEnteredGoal) => {
    if (!enteredGoal) {
      return
    }
    setCourseGoals((currentGoals) => [
      ...courseGoals,
      { key: Math.random().toString(), value: enteredGoal },
    ]);
    setEnteredGoal("");
    setIsModalOpen(false)
  };
  
  const handleOnDelete = goalKey => {
    setCourseGoals((currentGoals) =>{
      return currentGoals.filter(goal => goal.key !== goalKey);
    })
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsModalOpen(true)}/>
      <GoalInput onAddGoal={addGoalHandler} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <FlatList
        data={courseGoals}
        renderItem={({ item }) => <GoalItems id={item.key} onDelete={handleOnDelete} goal={item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
