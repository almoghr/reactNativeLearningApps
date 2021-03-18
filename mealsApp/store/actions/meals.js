import { TOGGLE_FAVORITE, SET_FILTERS } from "../consts/meals";

export const toggleFavorite = (id) => {
  return {
    type: TOGGLE_FAVORITE,
    mealId: id,
  };
};

export const setFilters = (filtersSettings) => {
  return { type: SET_FILTERS, filters: filtersSettings };
};
