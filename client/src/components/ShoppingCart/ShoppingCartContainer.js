import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import Nav from '../../components/Nav'
import ShoppingCart from './ShoppingCart'

class ShoppingCartContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <Grid container centered stackable columns={ 1 }>
          <Grid.Column computer={ 10 }>
            <ShoppingCart />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

export default ShoppingCartContainer
