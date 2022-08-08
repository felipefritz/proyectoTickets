import { TICKET_CONSTANTS } from "../constants/ticketConstants";

export const TicketListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case TICKET_CONSTANTS.TICKET_LIST_REQUEST:
      return { loading: true, tickets: [] };
    case TICKET_CONSTANTS.TICKET_LIST_SUCCESS:
      return {
        loading: false,
        tickets: action.payload.results,
        page: action.payload.current,
        pages: action.payload.num_pages,
      };
    case TICKET_CONSTANTS.TICKET_DETAIL_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const TicketCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_CONSTANTS.TICKET_CREATE_REQUEST:
      return { loading: true };
    case TICKET_CONSTANTS.TICKET_CREATE_SUCCESS:
      return { loading: false, ticket: action.payload };
    case TICKET_CONSTANTS.TICKET_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
