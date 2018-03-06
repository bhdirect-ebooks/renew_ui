import { createLogic } from "redux-logic";
import { ACCOUNT_MY_PROFILE_PENDING } from "../constants";
import { myProfileSuccess, myProfileError } from "../actions/AccountActions";

export default createLogic({
  type: ACCOUNT_MY_PROFILE_PENDING,

  validate({ getState, action }, allow, reject) {
    if (
      action.payload &&
      action.payload.firstname &&
      action.payload.lastname &&
      action.payload.email
    ) {
      allow(action);
    } else {
      // empty request, silently reject
      reject();
    }
  },

  process({ httpClient, action }, dispatch, done) {
    const postData = {
      firstname: action.payload.firstname,
      lastname: action.payload.lastname,
      email: action.payload.email,
    };

    httpClient
      .post(`/api/user/v2/profile`, postData)
      .then(() => {
        dispatch(myProfileSuccess(postData));
        done();
      })
      .catch(error => {
        const err =
          error.response && error.response.data ? error.response.data : error;
        dispatch(myProfileError(err));
        done();
      });
  },
});

