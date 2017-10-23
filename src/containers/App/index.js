import React, { Component } from 'react';
import './main.css';
import Editor from '../Editor';
import NavBar from '../../components/NavBar';
import QuestionsSidebar from '../../components/QuestionsSidebar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarVisible: false,
    };
  }

  render() {
    return (
      <div className="App">
        <QuestionsSidebar
          isVisible={this.state.isSidebarVisible}
          onSelect={(id) => {
            console.log(id);
            this.setState({ isSidebarVisible: !this.state.isSidebarVisible });
          }}
        >
          <NavBar />
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Editor />
        </QuestionsSidebar>
      </div>
    );
  }
}

export default App;
