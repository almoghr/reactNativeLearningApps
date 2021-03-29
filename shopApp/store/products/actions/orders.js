import { ADD_ORDER, SET_ORDERS } from "../constants/orders";
import Order from '../../../models/order' 
export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
      const date = new Date()
    const response = await fetch(
        "https://rn-shopapp-f11bd-default-rtdb.firebaseio.com/orders/u1.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartItems, totalAmount, date: date.toISOString() }),
        }
      );
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
  
      const resData = await response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: { id: resData.name, items: cartItems, amount: totalAmount, date: date },
    });
  };
};

export const fetchOrders = () => {
    return async (dispatch) => {
      try {
        const response = await fetch(
          "https://rn-shopapp-f11bd-default-rtdb.firebaseio.com/orders/u1.json"
        );
        if (!response.ok) {
          throw new Error("something went wrong!");
        }
        const resData = await response.json();
        const loadedOrders = [];
        for (const key in resData) {
          loadedProducts.push(
            new Order(
              key,
              resData.cartItems,
              resData[key].totalAmount,
              new Date(resData[key].date)
            )
          );
        }
        dispatch({ type: SET_ORDERS, orders: loadedOrders });
      } catch (err) {
        throw err;
      }
    };
  };
  
