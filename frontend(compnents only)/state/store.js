import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import redusers from "./reducers/index";

const store = createStore(redusers,{},applyMiddleware(thunk));
export default store;
