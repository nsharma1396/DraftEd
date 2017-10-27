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
      idSelected: -1,
    };
  }


  render() {
    return (
      <div className="App" >
        <QuestionsSidebar
          isVisible={this.state.isSidebarVisible}
          onSelect={(id) => {
           this.setState({ isSidebarVisible: !this.state.isSidebarVisible, idSelected: id });
          }}
        >
          <NavBar />
          <Editor
            idSelected={this.state.idSelected}
            toggled={(visibility) => {
               this.setState({ isSidebarVisible: visibility });
            }}
          />
        </QuestionsSidebar>
      </div>
    );
  }
}

export default App;
