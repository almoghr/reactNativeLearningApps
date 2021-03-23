import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import productsReducer from './products/reducers/products'
import cartReducer from './products/reducers/cart'
import ordersReducer from './products/reducers/orders'
const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default store