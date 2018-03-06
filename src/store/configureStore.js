/* eslint global-require: "off" */
import axios from "axios";
import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import { createLogicMiddleware } from "redux-logic";
import rootReducer from "../reducers/index";

import logic from "../logic";

const deps = {
  httpClient: axios.create({ withCredentials: true }),
};

const logicMiddleware = createLogicMiddleware(logic, deps);

// Uncomment the following line to enable debugging of the Observables in redux-logic
// logicMiddleware.monitor$.subscribe(x => console.log(x));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(logicMiddleware, logger),
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
