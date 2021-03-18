import PRODUCTS from '../../../data/dummy-data'

const initialState = {
    availableProducts: PRODUCTS,// all the products which i never created
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'), // all the products which i created
}


export default (state = initialState, action) => {
    return state
}