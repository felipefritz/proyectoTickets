import { TICKET_CONSTANTS } from "../constants/ticketConstants";
import axios from "axios";
import { useSelector } from "react-redux";

export const ticketList =
  (query = "") =>
  async (dispatch, getState) => {
    try {
      const {
        userLogin: { user },
      } = getState();

      dispatch({ type: TICKET_CONSTANTS.TICKET_LIST_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/tickets/list/${query}`, config);
      dispatch({ type: TICKET_CONSTANTS.TICKET_LIST_SUCCESS, payload: data });
      console.log(data);
    } catch (error) {
      console.log(error);

      dispatch({
        type: TICKET_CONSTANTS.TICKET_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const ticketCreate = (ticket, user) => async (dispatch, getState) => {
  try {
    dispatch({ type: TICKET_CONSTANTS.TICKET_CREATE_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post("/api/tickets/add/", ticket, config);
    dispatch({ type: TICKET_CONSTANTS.TICKET_CREATE_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error);

    dispatch({
      type: TICKET_CONSTANTS.TICKET_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
