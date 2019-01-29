import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Header, Label } from 'semantic-ui-react'

import CartItem from './CartItem'

class ShoppingCart extends Component {
  render() {
    const { cart } = this.props
    localStorage.setItem('cart', JSON.stringify(cart))
    let productCounter = 0
    let total = 0
    const displayCartItems = cart.map((cartItem, i) => {
      productCounter += cartItem.quantity
      total += cartItem.quantity * cartItem.price
      return <CartItem key={ i } cartItem={ cartItem } />
    })

    return (
      <React.Fragment>
        <Header as='h2' dividing>
          Your cart
          <Label>{ productCounter }</Label>
        </Header>
        <Card fluid>
          <Card.Content>
            {
              displayCartItems.length ? displayCartItems :
              <Header as='h4' textAlign='center' disabled>
                No products have been added
              </Header>
            }
          </Card.Content>
          <Card.Content extra>
            <Header as='h3' textAlign='left'>
              Total
              <span className='right'>
                ${ total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }
              </span>
            </Header>
          </Card.Content>
        </Card>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState)(ShoppingCart)
