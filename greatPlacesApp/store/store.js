import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import placesReducer from './places-reducers'

const rootReducer = combineReducers({
    places: placesReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default store