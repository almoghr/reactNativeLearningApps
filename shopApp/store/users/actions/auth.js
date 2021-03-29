import { SIGN_UP } from "../constants/auth";
import axios from "axios";

// export const signup = (email, password) => {
//   return async (dispatch) => {
//     const response = await axios.post(
//       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFzzX5Lz0bP5b4GwPHueULEzZDOg_RcdU",
//       {
//         email: email,
//         password: password,
//         returnSecureToken: true,
//       }
//     );
//     console.log("done");

//     const resData = response.data
//     console.log(resData);
//     dispatch({ type: SIGN_UP });
//   };
// };

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFzzX5Lz0bP5b4GwPHueULEzZDOg_RcdU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("something went wrong!");
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGN_UP });
  };
};
