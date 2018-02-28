import * as R from 'ramda';
import React from 'react';
import { withHandlers, withState } from 'recompose';
import { componentDidMount } from 'react-functional-lifecycle';
import loadCurrentUser from './api';
import './App.css';

const fetchUser = () =>
  Promise.resolve(loadCurrentUser())

const getUser = props => fetchUser().then(props.setUser)

const App = props => (
  <div className="App">
    <header>
      <h1 className="text-center mt-4 font-weight-light">Welcome to Renew, {R.prop('first_name', props.user.profile)}</h1>
    </header>
    <div className="profile">
      <div className="user-icon">
        <img alt="user avatar" src={R.prop('user_icon', props.user.profile)} />
      </div>
      <form className="form">
        <div className="form-group">
          <label className="text-uppercase text-left small" for="screen-name">Screen Name</label>
          <input className="form-control" id="screen-name" placeholder="Enter screen name" value={R.prop('screen_name', props.user.profile)}/>
        </div>
        <div className="form-group">
          <label className="text-uppercase text-left small" for="email">Email</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={R.prop('email', props.user.profile)}/>
        </div>
        <div className="form-group">
          <label className="text-uppercase text-left small" for="first-name">First Name</label>
          <input id="first-name" className="form-control" type="text" value={R.prop('first_name', props.user.profile)} />
        </div>
        <div className="form-group">
          <label className="text-uppercase text-left small" for="first-name">Last Name</label>
          <input id="last-name" className="form-control" type="text" value={R.prop('last_name', props.user.profile)} />
        </div>
        <div className="form-group">
          <label className="text-uppercase text-left small" for="time-zone">Time Zone</label>
          <input className="form-control" id="time-zone" placeholder="Time Zone" value={R.prop('time_zone', props.user.profile)} />
        </div>
        <div className="text-right full">
          <button type="submit" className="btn btn-sm btn-dark">Save</button>
        </div>
      </form>
    </div>
  </div>
);

export default R.compose(
  withState('user', 'setUser', {}),
  withHandlers({
    getUser
  }),
  componentDidMount(R.compose(
    R.tap(getUser)
  ))
)(App);
