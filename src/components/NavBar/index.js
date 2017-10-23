import React, { Component } from 'react';
import {
  Container, Dropdown, Image, Menu, Visibility,
} from 'semantic-ui-react';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFixed: false,
    };
  }

  stickTopMenu() {
    this.setState({ menuFixed: true });
  }

  unStickTopMenu() {
    this.setState({ menuFixed: false });
  }

  render() {
    return (
      <Visibility
        onBottomPassed={() => this.stickTopMenu()}
        onBottomVisible={() => this.unStickTopMenu()}
        once={false}
      >
        <Menu
          borderless
          fixed={this.state.menuFixed ? 'top' : null}
          style={this.state.menuFixed ? fixedMenuStyle : menuStyle}
        >
          <Container text>
            <Menu.Item>
              <Image size="mini" src="/logo.svg" />
            </Menu.Item>
            <Menu.Item header>Cilantro</Menu.Item>
            <Menu.Item as="a">Blog</Menu.Item>
            <Menu.Item as="a">Articles</Menu.Item>
            <Menu.Menu position="right">
              <Dropdown text="Dropdown" pointing className="link item">
                <Dropdown.Menu>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>
      </Visibility>
    );
  }
}
