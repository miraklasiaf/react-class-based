import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    }
  }

  render() {
    return (
      <div className="text-center">
        <header className="bg-gray-600 m-6 p-6 rounded shadow-lg hover:bg-red-600">
          <img
            src={logo}
            className="h-32 w-32 rounded-full mx-auto App-logo"
            alt="logo"
          />
          <h1 className="text-white text-3xl">Welcome to React</h1>
        </header>
        <p className="text-base">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
