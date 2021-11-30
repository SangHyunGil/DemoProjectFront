import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import users from "./users";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"]
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        users
      })
      return combinedReducer(state, action);
    }
  }
};

export default persistReducer(persistConfig, rootReducer);