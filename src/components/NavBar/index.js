import React from 'react';
import {
  Dropdown, Image, Menu,
} from 'semantic-ui-react';
import image from './cilantro.jpg';

const fixedMenuStyle = {
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

const NavBar = () => (
  <Menu
    borderless
    style={fixedMenuStyle}
    fixed="top"
    inverted
  >
    <Menu.Item>
      <Image as="img" src={image} size="mini" alt="img" avatar />
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
  </Menu>
);

export default NavBar;
