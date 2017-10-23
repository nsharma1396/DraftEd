import React, { Component } from 'react';
import {
  Sidebar, Segment, Menu, Header,
} from 'semantic-ui-react';

export default class QuestionsSidebar extends Component {
  render() {
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          width='wide'
          direction='right'
          visible={this.props.isVisible}
          vertical
          size='large'
          style={{textAlign: 'left'}}
          borderless
        >
          <Menu.Item>
            <Header as='h2'>
              Questions
            </Header>
          </Menu.Item>        
          <Menu.Item onClick={()=>{this.props.onSelect(1)}}>
            Why is glass radioactive ? Why is glass radioactive ? Why is glass radioactive ?
          </Menu.Item>
          <Menu.Item onClick={()=>{this.props.onSelect(2)}}>
            Why is cocaine red ?
          </Menu.Item>
          <Menu.Item onClick={()=>{this.props.onSelect(3)}}>
            Why is apple purple ?
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher dimmed={this.props.isVisible} >
          {this.props.children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}