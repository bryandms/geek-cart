import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react'

class Nav extends Component {
  render() {
    return (
      <Menu secondary fluid attached='top' className='m-b'>
        <Menu.Item name='product-list'>
          <Link className='nav-item' to='/'>
            Shop
          </Link>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='shopping-cart'>
            <Link className='nav-item' to='/shopping-cart'>
              <Icon name='shopping cart' />
              Cart
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Nav
