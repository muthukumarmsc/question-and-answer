import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from 'redux-thunk';
import rootReducer from "./reducer";

const middleware = [thunk];

let store;
store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
    )
);

export default store;


