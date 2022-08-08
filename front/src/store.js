import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducers } from "./reducers/userReducers";
import {
  TicketListReducer,
  TicketCreateReducer,
} from "./reducers/ticketReducers";
const reducer = combineReducers({
  userLogin: userReducers,
  ticketList: TicketListReducer,
  ticketCreate: TicketCreateReducer,
});

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  userLogin: { user: userFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
