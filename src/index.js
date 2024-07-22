import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import {createStore, combineReducers, applyMiddleware, compose} from "redux";
// import thunk from "redux-thunk";
//
// import profileReducer from './store/reducers/profileReducer';

// const rootReducer = combineReducers({
//     prof: profileReducer,
// })
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
    <>
        <App/>
    </>,
    document.getElementById("root")
);