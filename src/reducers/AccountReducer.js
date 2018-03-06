import * as Constants from "../constants";

const defaultState = {
  initialized: false,
  profile: {
    time_zone: "America/Chicago",
    screen_name: "",
    last_name: "",
    first_name: "",
    email: ""
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
        profile: action.payload.profile
      })

    default:
      return state;
  }
}
