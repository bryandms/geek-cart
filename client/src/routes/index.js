import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from '../App'
import ShoppingCartContainer from '../components/ShoppingCart/ShoppingCartContainer'
import NotFound from '../components/NotFound'

export default () => (
  <Router>
    <Switch>
      <Route path='/' exact component={ App } />
      <Route path='/shopping-cart' exact component={ ShoppingCartContainer } />
      <Route component={ NotFound } />
    </Switch>
  </Router>
)
