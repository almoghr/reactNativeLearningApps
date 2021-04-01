import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";
import * as Permissions from "expo-permissions";

const ImgPicker = (props) => {
  const [imageUri, setImageUri] = useState("");
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "you need to grant camera permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.2,
    });
    setImageUri(image.uri);
    props.onImageTaken(image.uri)
  };

  
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!imageUri ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: imageUri }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
