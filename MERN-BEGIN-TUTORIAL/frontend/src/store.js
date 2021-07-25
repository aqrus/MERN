import { applyMiddleware, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import rootReducers from "./Reducers/index";

const composeEnhencer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducers,
    composeEnhencer(applyMiddleware(thunk))
);
export default store;