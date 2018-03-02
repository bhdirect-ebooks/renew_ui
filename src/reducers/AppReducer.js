import * as Constants from "../constants";

const defaultState = {
  initialized: false
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case Constants.APP_ON_INIT:
      return Object.assign({}, state, {
        initialized: action.payload.customvalue
      })

    default:
      return state;
  }
}
