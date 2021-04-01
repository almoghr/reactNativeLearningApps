import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import ENV from "../env";
const MapPreview = (props) => {
  const { location, onMapPress } = props;
  let imagePreviewUrl;
  
  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${ENV.googleApiKey}`;
  }
  return (
    <TouchableOpacity onPress={onMapPress} style={{...styles.mapPreview, ...props.style}}>
      {!location ? (
        props.children
      ) : (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
      width: '100%',
      height: '100%',
  },
});

export default MapPreview;
