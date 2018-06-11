"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var _a = require('apollo-server-express'), graphqlExpress = _a.graphqlExpress, graphiqlExpress = _a.graphiqlExpress;
var bodyParser = require('body-parser');
var cors = require('cors');
var graphql_tools_1 = require("graphql-tools");
var TypeDefs_1 = require("./TypeDefs");
var Magento_1 = require("./Resolvers/Magento");
var app = express();
app.use(cors());
var host = "http://localhost:8080";
var key = "y9ieks8w9rgtw0nukagq7erw9pdhw7c7";
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: graphql_tools_1.mergeSchemas({
        schemas: [
            graphql_tools_1.makeExecutableSchema({
                typeDefs: TypeDefs_1.ProductTypeDefs,
                resolvers: Magento_1.ProductResolvers(host, key)
            }),
            graphql_tools_1.makeExecutableSchema({
                typeDefs: TypeDefs_1.CategoriesTypeDefs,
                resolvers: Magento_1.CategoriesResolvers(host, key)
            }),
            graphql_tools_1.makeExecutableSchema({
                typeDefs: TypeDefs_1.CustomersTypeDefs,
                resolvers: Magento_1.CustomersResolvers(host, key)
            }),
            graphql_tools_1.makeExecutableSchema({
                typeDefs: TypeDefs_1.OrdersTypeDefs,
                resolvers: Magento_1.OrdersResolvers(host, key)
            }),
            graphql_tools_1.makeExecutableSchema({
                typeDefs: TypeDefs_1.CartTypeDefs,
                resolvers: Magento_1.CartsResolvers(host, key)
            })
        ]
    })
}));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));
var fetch = require('node-fetch');
app.post('/login', bodyParser.json(), function (req, res) {
    fetch("http://localhost/rest/V1/integration/customer/token", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            username: req.body.email,
            password: req.body.password
        })
    }).then(function (res) { return res.json(); }).then(console.log);
});
app.listen(3005);
