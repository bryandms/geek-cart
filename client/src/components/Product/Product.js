import React, { Component } from 'react'
import { Button, Icon, Item, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Product extends Component {
  render() {
    const { product, addToCart } = this.props

    return (
      <Item key={ product.id }>
        <Item.Image src={ product.image } />

        <Item.Content>
          <Item.Header as='a'>{ product.name }</Item.Header>
          <Item.Meta>
            <span className='cinema'>{ product.category.name }</span>
          </Item.Meta>
          <Item.Description>{ product.description }</Item.Description>
          <Item.Extra>
            <Button as='div' labelPosition='right' size='mini'>
              <Button color='green' size='mini' onClick={() => addToCart(product) }>
                <Icon name='add to cart' />
                Add
              </Button>
              <Label as='a' basic color='green' pointing='left'>
                ${ (product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }
              </Label>
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  addToCart: dispatch.cart.addToCart
})

export default connect(mapState, mapDispatch)(Product)
