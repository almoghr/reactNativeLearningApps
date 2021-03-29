import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/colors";
import { signup, login } from "../../store/users/actions/auth";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState()
  const [isSignUp, setIsSignUp] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  const dispatch = useDispatch();
  const authHandler = async () => {
    setError(null)
    if (isSignUp) {
      try {
        setIsLoading(true);
        await dispatch(
          signup(formState.inputValues.email, formState.inputValues.password)
        );
        props.navigation.navigate({routeName: 'Shop'})

      } catch (err) {
        console.log(err)
        setIsLoading(false);
        setError(err.message);
      }
    } else {
      try {
        
        setIsLoading(true);
        await dispatch(
          login(formState.inputValues.email, formState.inputValues.password)
        );
        props.navigation.navigate({routeName: 'Shop'})
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    }
  };

useEffect(() => {
  if(error){
    Alert.alert('An Error Occured!', error, [{ text: 'Okay'}])
  }
}, [error])

  const inputChangeHandler = useCallback(
    (formInputType, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: formInputType,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="please enter a vaild email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="password"
              secureTextEntry
              keyboardType="default"
              required
              minLength={6}
              autoCapitalize="none"
              errorText="please enter a vaild password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary}/>
              ) : (
                <Button
                  title={!isSignUp ? "Login" : "Signup"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={isSignUp ? "Switch to Login" : "switch to Sign Up"}
                color={Colors.secondary}
                onPress={() => setIsSignUp(!isSignUp)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = () => {
  return {
    headerTitle: "Please Authenticate",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
