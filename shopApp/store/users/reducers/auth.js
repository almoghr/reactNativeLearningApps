import { AUTHENTICATE, LOGOUT } from "../constants/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
      case AUTHENTICATE:
          return{
              token: action.token,
              userId: action.userId
          }; // fits for both the situations
        case LOGOUT: 
          return initialState
    // case SIGN_IN:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    // case SIGN_UP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   }; 
    default:
      return state;
  }
};
