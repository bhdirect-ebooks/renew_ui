import * as Constants from "../constants";

const defaultState = {
  initialized: false,
  user: {
    id: null,
    created_at: null,
    projects: [],
    profile: {
      time_zone: "America/Chicago",
      screen_name: "",
      last_name: "",
      first_name: "",
      email: ""
    }
  }
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case Constants.APP_ON_INIT:
      return Object.assign({}, state, {
        initialized: action.payload.customvalue
      })

    case Constants.ACCOUNT_MY_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload
      })

    default:
      return state;
  }
}
