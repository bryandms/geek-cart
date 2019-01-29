import React from "react";
import { Grid, Header, Icon } from "semantic-ui-react";

import Nav from './Nav'

const NotFound = () => {
  return (
    <React.Fragment>
      <Nav />
      <Grid>
        <Grid.Row centered textAlign="center">
          <Icon circular name="map outline" color="grey" size="huge" />
        </Grid.Row>
        <Grid.Row centered textAlign="center">
          <Header as="h1">Lost?</Header>
        </Grid.Row>
        <Grid.Row centered textAlign='center'>
          <a href='/'>Shop</a>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  )
}

export default NotFound
