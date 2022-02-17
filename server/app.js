const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());


mongoose.connection.once('open', () => {
    console.log('conneted to database');
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true

}));

mongoose.connect('mongodb+srv://irakli:irakli@cluster0.2lzau.mongodb.net/shop?retryWrites=true&w=majority', () => {
    app.listen(4000, () => {
        console.log('now listening for requests on port 4000');
    });
})

