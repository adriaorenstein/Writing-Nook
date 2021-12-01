import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import user from "./user";
import single_post from "./single_post";
import story from "./story";
import functionality from "./functionality";

const reducer = combineReducers({
  user,
  single_post,
  story,
  functionality,
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;
