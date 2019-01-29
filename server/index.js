if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const mongoose = require('mongoose')
const jwt = require('express-jwt')
const cors = require('cors')

const PORT = process.env.PORT
const app = express()

const auth = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
})

app.use(cors())

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true
})
mongoose.connection.once('open', () => {
    console.log('Connected to dabase')
})

app.use('/graphql', auth, graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: {
        user: req.user
    }
})))

app.listen(PORT, () => {
    console.log(`Listening for request on http://localhost:${PORT}/graphql`)
})
