import * as R from 'ramda';
import React from 'react';
import { withHandlers, withState } from 'recompose';
import { componentDidMount } from 'react-functional-lifecycle';
import loadCurrentUser, { loadUserName } from './api';
import './App.css';

const fetchUser = () =>
  Promise.resolve(loadCurrentUser())

const getUser = props => fetchUser().then(props.setUser)

const App = props => (
  <div className="App">
    <header>
      <h1>Welcome to Renew, {R.prop('first_name', props.user.profile)}</h1>
    </header>
    <p>
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <form>
      <div className="form-group">
        <label for="first-name">First Name</label>
        <input id="first-name" value={R.prop('first_name', props.user.profile)} />
      </div>
      <div className="form-group">
        <label for="first-name">Last Name</label>
        <input id="last-name" value={R.prop('last_name', props.user.profile)} />
      </div>
      <div className="form-group">
        <label for="email">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={R.prop('email', props.user.profile)}/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label for="time-zone">Time Zone</label>
        <input className="form-control" id="time-zone" placeholder="Time Zone" value={R.prop('time_zone', props.user.profile)} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
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
