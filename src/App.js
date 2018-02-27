import * as R from 'ramda';
import React, { Component } from 'react';
import { withHandlers, withState } from 'recompose';
import { componentDidMount } from 'react-functional-lifecycle';
import './App.css';

const fetchName = () => 
    Promise.resolve({name: "Kevin"});

const getName = props => fetchName().then(props.setName);

const App = props => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to React, {props.name.name}</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);

export default R.compose(
  withState('name', 'setName', ""),
    withHandlers({
        getName
    }),
    componentDidMount(R.compose(
        R.tap(getName)
    ))
)(App);
