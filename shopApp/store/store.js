import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import productsReducer from './products/reducers/products'
import cartReducer from './products/reducers/cart'
import ordersReducer from './products/reducers/orders'
import authReducer from './users/reducers/auth'
const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default store