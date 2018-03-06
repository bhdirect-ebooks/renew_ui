import { createLogic } from "redux-logic";
import { ACCOUNT_MY_PROFILE_PENDING } from "../constants";
import { myProfileSuccess, myProfileError } from "../actions/AccountActions";
import loadCurrentUser from '../api';

const fetchUser = () =>
  Promise.resolve(loadCurrentUser())

export default createLogic({
  type: ACCOUNT_MY_PROFILE_PENDING,

  /*validate({ getState, action }, allow, reject) {
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
  },*/

  process({ httpClient, action }, dispatch, done) {

	  //console.log('in process');
    fetchUser()
      .then((data) => {
        dispatch(myProfileSuccess(data));
      })
      .catch(error => {
        dispatch(myProfileError(error));
      })
      .then(() => done());

    /*
    const postData = {
      firstname: action.payload.firstname,
      lastname: action.payload.lastname,
      email: action.payload.email,
    };

    httpClient
      .post(`/api/user/v2/profile`, postData)
      .then(() => {
        dispatch(myProfileSuccess(postData));
      })
      .catch(error => {
        const err =
          error.response && error.response.data ? error.response.data : error;
        dispatch(myProfileError(err));
      })
      .then(() => done());
      */
  },
});

