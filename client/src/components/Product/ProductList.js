import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Item } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { products } from '../../queries/index'
import Product from './Product'

class ProductList extends Component {
  render() {
    const { products } = this.props
    const displayProducts = products.map(product =>
      <Product key={ product.id } product={ product } />
    )

    return <Item.Group divided>{ displayProducts }</Item.Group>
  }
}

const mapState = state => ({
  products: state.products
})

export default compose(
  connect(mapState),
  graphql(products)
)(ProductList)
