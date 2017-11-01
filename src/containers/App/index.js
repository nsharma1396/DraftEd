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
      changed: false,
    };
  }

  componentDidUpdate() {
    if (this.state.changed) {
      this.onUpdate();
    }
  }

  onUpdate() {
    this.setState({ changed: false });
  }

  render() {
    return (
      <div className="App">
        <QuestionsSidebar
          isVisible={this.state.isSidebarVisible}
          onSelect={(id) => {
            this.setState({
              isSidebarVisible: !this.state.isSidebarVisible, idSelected: id, changed: true,
            });
          }}
        >
          <NavBar />
          <Editor
            idSelected={this.state.idSelected}
            changed={this.state.changed}
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
