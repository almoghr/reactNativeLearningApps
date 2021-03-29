import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux'
import Colors from "../constants/colors";
import {authenticate, logout} from '../store/users/actions/auth' 

const startupScreen = (props) => {
    const dispatch = useDispatch()
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if(!userData){
          props.navigation.navigate({routeName: 'Auth'})
          return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate} = transformedData
      const expirationDate = new Date(expiryDate)

      if(expirationDate <= new Date() || !token || !userId){
        props.navigation.navigate({routeName: 'Auth'})
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate({routeName: 'Shop'});
      dispatch(authenticate(userId, token, expirationTime))
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default startupScreen;
