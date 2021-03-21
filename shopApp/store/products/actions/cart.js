import {ADD_TO_CART} from '../constants/cart'


export const addToCart = product => {
    return { type: ADD_TO_CART, product: product}
}