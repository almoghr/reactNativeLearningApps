import { createStore, combineReducers } from 'redux'
import productsReducer from './products/reducers/products'
import cartReducer from './products/reducers/cart'
const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
})

const store = createStore(rootReducer)

export default store