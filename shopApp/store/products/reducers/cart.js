import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cart";
import { ADD_ORDER } from '../constants/orders'
import { DELETE_PRODUCT } from '../constants/products'
import CartItem from "../../../models/cart-item";
const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      if (state.items[addedProduct.id]) {
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        let newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      const currentQuantity = selectedCartItem.quantity;
      let updatedCartItems
      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items , [action.productId]: updatedCartItem}
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      }
      case ADD_ORDER:
        return initialState
      case DELETE_PRODUCT:
        if(!state.items[action.productId]){
          return state
        }
        const updatedItems = {...state.items}
        const itemTotal = state.items[action.productId].sum
        delete updatedItems[action.productId]
        return{
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - itemTotal
        }




    default:
      return state;
  }
  return state;
};
