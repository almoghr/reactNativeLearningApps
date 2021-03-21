import { ADD_TO_CART } from "../constants/cart";
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
      const prodtitle = addedProduct.title;
      if (state.items[addedProduct.id]) {
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id.sum + prodPrice]
        );
        return {
            ...state,
            items: { ...state.items, [addedProduct.id]: newCartItem},
            totalAmount: state.totalAmount + prodPrice
        }
      } else {
        const newCartItem = new CartItem(1, prodPrice, prodtitle, prodPrice);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + prodPrice

        };
      }
    default:
  }
  return state;
};
