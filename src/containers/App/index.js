import React, { Component } from 'react';
import { Dimmer, Segment } from 'semantic-ui-react';
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
      <Dimmer.Dimmable as={Segment} dimmed={this.state.isSidebarVisible}>
        <Dimmer
          page
          active={this.state.isSidebarVisible}
          onClickOutside={() => this.setState({ isSidebarVisible: !this.state.isSidebarVisible })}
        >
          <QuestionsSidebar
            isVisible={this.state.isSidebarVisible}
            onSelect={(id) => {
              this.setState({
                isSidebarVisible: !this.state.isSidebarVisible, idSelected: id, changed: true,
              });
            }}
          />
        </Dimmer>
        <NavBar />
        <Editor
          idSelected={this.state.idSelected}
          changed={this.state.changed}
          toggled={(visibility) => {
               this.setState({ isSidebarVisible: visibility });
            }}
        />
      </Dimmer.Dimmable>
    );
  }
}

export default App;
