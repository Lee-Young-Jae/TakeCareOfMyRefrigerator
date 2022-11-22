import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./modules/reducers";
import { applyMiddleware, createStore } from "redux"; // ,compose 배포시 composeWithDevTools 대신 compose 사용
import { Provider } from "react-redux";
import myLogger from "./middlewares/configureStore";
import rootSaga from "./modules/sagas";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, myLogger))
  // compose(applyMiddleware(sagaMiddleware, myLogger))
);

sagaMiddleware.run(rootSaga);

const rootNode = document.getElementById("root");
ReactDOM.createRoot(rootNode).render(
  <Provider store={store}>
    <App />
  </Provider>
);
