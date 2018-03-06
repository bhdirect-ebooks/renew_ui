import * as Constants from "../constants";

export function myProfilePending(payload) {
  return {
    type: Constants.ACCOUNT_MY_PROFILE_PENDING,
    payload,
  };
}

export function myProfileSuccess(payload) {
  return {
    type: Constants.ACCOUNT_MY_PROFILE_SUCCESS,
    payload,
  };
}

export function myProfileError(payload) {
  return {
    type: Constants.ACCOUNT_MY_PROFILE_ERROR,
    payload,
    error: true,
  };
}
