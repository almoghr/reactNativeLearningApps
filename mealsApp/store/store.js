import { createStore, applyMiddle, combineReducers } from "redux";
import mealsReducer from "./reducers/meals";
import { composeWithDevTools } from 'redux-devtools-extension'
const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

export default store;
