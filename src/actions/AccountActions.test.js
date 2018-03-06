import expect from "expect";
import * as Constants from "../constants";
import * as Actions from "./AccountActions";

describe("Account Actions", () => {
  let payload;

  beforeEach(() => {
    payload = {
      gaLabel: "MOCK_GA_LABEL",
      data: {
        code: "MOCK_CODE",
        msg: "MOCK_MSG",
      },
    };
  });

  it("should be a myProfile pending action", () => {
    const expected = {
      type: Constants.ACCOUNT_MY_PROFILE_PENDING,
      payload,
    };

    expect(Actions.myProfilePending(payload)).toEqual(expected);
  });

  it("should be a myProfile success action", () => {
    const expected = {
      type: Constants.ACCOUNT_MY_PROFILE_SUCCESS,
      payload,
    };

    expect(Actions.myProfileSuccess(payload)).toEqual(expected);
  });

  it("should be a myProfile error action", () => {
    const expected = {
      type: Constants.ACCOUNT_MY_PROFILE_ERROR,
      payload,
      error: true,
    };

    expect(Actions.myProfileError(payload)).toEqual(expected);
  });
});
