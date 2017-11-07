import React, { Component } from 'react';
import {
  Sidebar, Menu, Header,
} from 'semantic-ui-react';
import Questions from './questions';


class QuestionsSidebar extends Component {
  render() {
    return (
      <Sidebar
        as={Menu}
        animation="overlay"
        width="wide"
        direction="right"
        visible={this.props.isVisible}
        vertical
        size="large"
        style={{ textAlign: 'left' }}
        borderless
      >
        <Menu.Item>
          <Header as="h2">
              Questions
          </Header>
        </Menu.Item>
        {Questions.map(ques => (
          <Menu.Item key={ques.id} onClick={() => { this.props.onSelect(ques.id); }}>
            {ques.text}
          </Menu.Item>
            ))}
      </Sidebar>
    );
  }
}

export default QuestionsSidebar;
