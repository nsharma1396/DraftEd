import React, { Component } from 'react';
import './main.css';
import Editor from '../Editor';
import NavBar from '../../components/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Editor />
      </div>
    );
  }
}

export default App;
