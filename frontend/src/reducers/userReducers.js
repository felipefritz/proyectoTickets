import { USER_CONSTANTS } from "../constants/userConstants";

export const userReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_CONSTANTS.USER_LOGIN_REQUEST:
      return {
        isFetching: true,
        isAuthenticated: false,
      };
    case USER_CONSTANTS.USER_LOGIN_SUCCESS:
      return {
        isFetching: false,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: "",
      };
    case USER_CONSTANTS.USER_LOGIN_FAILURE:
      return {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload,
      };

    case USER_CONSTANTS.USER_LOGOUT_SUCCESS:
      return {
        isFetching: false,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
