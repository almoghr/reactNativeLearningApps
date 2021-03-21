import { ADD_ORDER } from '../constants/orders'

export const addOrder = (cartItems, totalAmount) => {
    return { type: ADD_ORDER, orderData: { items: cartItems, amount: totalAmount}}
}