import { USER_CONSTANTS } from "../constants/userConstants";
import axios from "axios";
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CONSTANTS.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      { username: username, password: password },
      config
    );
    dispatch({
      type: USER_CONSTANTS.USER_LOGIN_SUCCESS,
      payload: data,
    });
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_CONSTANTS.USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.detail // detail es porque en el backend se configuro asi
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = (user) => (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios.post("/api/users/logout/", user, config);
    localStorage.removeItem("user");

    dispatch({ type: USER_CONSTANTS.USER_LOGOUT_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};
