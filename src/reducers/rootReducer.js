import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import users from "./users";
import roomReducer from "./roomReducer";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        users,
        roomReducer
      })
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;