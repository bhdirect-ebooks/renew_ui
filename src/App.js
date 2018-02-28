import * as R from 'ramda';
import React from 'react';
import { withHandlers, withState } from 'recompose';
import { componentDidMount } from 'react-functional-lifecycle';
import loadCurrentUser from './api';
import './App.css';
import TimezonePicker from './TimezonePicker/TimezonePicker';

const fetchUser = () =>
  Promise.resolve(loadCurrentUser())

const getUser = props => fetchUser().then(props.setUser)

const updateProfile = (props, property, value) => {
  if (property === "screen_name") {
    // ensure screen name is unique
  }
  if (property === "email") {
    // validate email
  }
  let update_user = props.user
  update_user.profile[property] = value
  props.setUser(update_user)
}

const saveProfile = (props, event) => {
  console.log(props.user.profile)
  event.preventDefault()
}

const App = props => (
  <div className="App">
    <header>
      <h1 className="text-center mt-4 font-weight-light">Welcome to Renew, {R.prop('first_name', props.user.profile)}</h1>
    </header>
    <div className="profile">
      <div className="user-icon">
        <img alt="user avatar" src={R.prop('user_icon', props.user.profile)} />
      </div>
      <form className="form" onSubmit={event => saveProfile(props, event)}>
        <div className="form-group">
          <label className="text-uppercase text-left small">
            Screen Name
            <input
              className="form-control"
              onChange={event => updateProfile(props, "screen_name", event.target.value)}
              value={R.prop('screen_name', props.user.profile)}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-uppercase text-left small">
            Email
            <input
              aria-describedby="emailHelp"
              className="form-control"
              onChange={event => updateProfile(props, "email", event.target.value)}
              type="email"
              value={R.prop('email', props.user.profile)}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-uppercase text-left small">
            First Name
            <input
              className="form-control"
              onChange={event => updateProfile(props, "first_name", event.target.value)}
              value={R.prop('first_name', props.user.profile)}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-uppercase text-left small">
            Last Name
            <input
              className="form-control"
              onChange={event => updateProfile(props, "last_name", event.target.value)}
              value={R.prop('last_name', props.user.profile)}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-uppercase text-left small">
          Time Zone
            <TimezonePicker 
              defaultValue="America/Chicago"
              value={R.prop('time_zone', props.user.profile)}
              onChange={timezone => updateProfile(props, "time_zone", timezone)}
              inputProps={{
                placeholder: 'Select Timezone...',
                name: 'timezone',
              }}
              className="form-control"
            />
          </label>
        </div>
        <div className="text-right full">
          <button type="submit" className="btn btn-sm btn-dark">Save</button>
        </div>
      </form>
    </div>
  </div>
);

// using this in withState prevents this: 'Warning: A component is changing an uncontrolled input of type undefined to be controlled.'
const empty_user = {
  profile: {
    time_zone: "America/Chicago",
    screen_name: "",
    last_name: "",
    first_name: "",
    email: ""
  }
}

export default R.compose(
  withState('user', 'setUser', empty_user),
  withHandlers({
    getUser
  }),
  componentDidMount(R.compose(
    R.tap(getUser)
  ))
)(App);
