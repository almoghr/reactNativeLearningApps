import * as FileSystem from "expo-file-system";
import { ADD_PLACE, SET_PLACES } from "./places-constants";
import { insertPlace, fetchPlaces } from "../helpers/db";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(title, newPath, "somehting", location.lat, location.lng);
      dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title: title, image: newPath  } });

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };
};

export const loadPlaces = () => {
    return async dispatch => {
        try{
            const dbResult = await fetchPlaces()
            
            dispatch({ type: SET_PLACES, places: dbResult.rows._array })
        } catch(err) {
            throw err
        }
    }
}
