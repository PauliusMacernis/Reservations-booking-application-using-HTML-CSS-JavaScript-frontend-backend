const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const onHeaders = require('on-headers');

const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');

const app = express();

dotenv.config();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const graphqlStatusCodeRewriter = (req, res, next) => {
    onHeaders(res, () => res.statusCode = 200);
    next();
};

app.use('/graphql', graphqlStatusCodeRewriter);
app.use('/graphql', graphQlHttp.graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

const run = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${ process.env.MONGO_USER }:${
                process.env.MONGO_PASSWORD
            }@cluster0.agves.mongodb.net/${ process.env.MONGO_DB }?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        await app.listen(process.env.PORT);
        console.log('App started at port: ' + process.env.PORT);
    } catch (error) {
        console.log(error);
    }
};

run().then();
