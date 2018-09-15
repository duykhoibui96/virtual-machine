import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./core/reducers";
import middleware from "./core/middleware";
import Main from "./main";
import middleware from "./core/middlewares";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(middleware)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
