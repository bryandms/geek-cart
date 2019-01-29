import React, { Component } from 'react'
import { Feed, Icon, Input, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

class CartItem extends Component {
  render() {
    const { cartItem, removeToCart, addToCart, deleteToCart } = this.props

    return (
      <Feed>
        <Feed.Event>
          <Feed.Label image={ cartItem.image } />
          <Feed.Content>
            <Feed.Summary>
              { cartItem.name }
              <Feed.Date className='right'>
                ${ (cartItem.price * cartItem.quantity).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }
              </Feed.Date>
            </Feed.Summary>
            <Feed.Meta className='w-100'>
              <Input labelPosition='left' type='text' placeholder='Amount' size='mini'>
                <Label onClick={ () => addToCart(cartItem) }>
                  <Icon name='add' />
                </Label>
                <span className='box-number'>
                  { cartItem.quantity }
                </span>
                <Label className='br-l-0' onClick={ () => removeToCart(cartItem) }>
                  <Icon name='minus' />
                </Label>
              </Input>
              <Input labelPosition='right' type='text' placeholder='Amount' size='mini'>
                <Label className='right' onClick={ () => deleteToCart(cartItem) }>
                  <Icon name='trash' />
                </Label>
              </Input>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  addToCart: dispatch.cart.addToCart,
  removeToCart: dispatch.cart.removeToCart,
  deleteToCart: dispatch.cart.deleteToCart
})

export default connect(mapState, mapDispatch)(CartItem)
