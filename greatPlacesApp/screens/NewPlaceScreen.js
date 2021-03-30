import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import {useDispatch} from 'react-redux'
import { addPlace } from '../store/places-actions'

const NewPlaceScreen = props => {
    const dispatch = useDispatch()
    const [titleValue, setTitleValue] = useState('')

    const titleChangeHandler = text => {
        setTitleValue(text)
    }

    const savePlaceHandler = (title) => {
        dispatch(addPlace(title))
        props.navigation.goBack()
    }
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />
        <Button title="Save Place" color={Colors.primary} onPress={() => savePlaceHandler(titleValue)} />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Add Place",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
