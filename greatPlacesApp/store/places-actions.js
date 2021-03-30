import { ADD_PLACE } from './places-constants'

export const addPlace = (title) => {
    return { type: ADD_PLACE, placeData: { title: title}}
}