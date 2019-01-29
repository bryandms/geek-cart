import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { Grid, Header } from 'semantic-ui-react'

import { products } from './queries/index'
import Nav from './components/Nav'
import ProductList from './components/Product/ProductList'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'

class App extends Component {
  async componentDidMount() {
    await this.props.data.refetch()
    const products = await this.props.data.products
    this.props.setProducts(products)
  }

  render() {
    return (
      <React.Fragment>
        <Nav />
        <Grid container stackable columns={ 2 }>
          <Grid.Column computer={ 10 }>
            <Header as='h2' dividing>
              Product List
            </Header>
            <ProductList />
          </Grid.Column>
          <Grid.Column computer={ 6 }>
            <ShoppingCart />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  setProducts: dispatch.products.setProducts
})

export default compose(
  connect(mapState, mapDispatch),
  graphql(products)
)(App)
