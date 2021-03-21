import { createStore, combineReducers } from 'redux'
import productsReducer from './products/reducers/products'
import cartReducer from './products/reducers/cart'
import ordersReducer from './products/reducers/orders'
const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
})

const store = createStore(rootReducer)

export default store