import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [location, setLocation] = useState();
  const pickedLocation = props.navigation.getParam("pickedLocation");
    const { onLocationPicked } = props
  useEffect(() => {
    if (pickedLocation) {
      setLocation(pickedLocation);
      onLocationPicked(pickedLocation);

    }
  }, [pickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "you need to grant location permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    try {
      setIsFetching(true);
      const userLocation = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setLocation({
        lat: userLocation.coords.latitude,
        lng: userLocation.coords.longitude,
      });
      onLocationPicked({
        lat: userLocation.coords.latitude,
        lng: userLocation.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could now fetch location",
        "Please try again later or pick a location on the map."[
          {
            text: "Okay",
          }
        ]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate({ routeName: "Map" });
  };
  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={location}
        onMapPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" Colors={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
