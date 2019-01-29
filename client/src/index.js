import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'

import 'semantic-ui-css/semantic.min.css'
import './index.css'

import Routes from './routes/index'
import store from './store/index'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Routes />
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
)
