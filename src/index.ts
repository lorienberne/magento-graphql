const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
var cors = require('cors');

import { makeExecutableSchema, mergeSchemas } from "graphql-tools"

import { ProductTypeDefs, CategoriesTypeDefs, OrdersTypeDefs, CustomersTypeDefs, CartTypeDefs } from "./TypeDefs"
import { ProductResolvers, CategoriesResolvers, OrdersResolvers, CustomersResolvers, CartsResolvers } from "./Resolvers/Magento"


const app = express();

app.use(cors());


let host = "http://localhost:8080"
let key  = "y9ieks8w9rgtw0nukagq7erw9pdhw7c7"

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: mergeSchemas({
        schemas: [
            makeExecutableSchema({
                typeDefs: ProductTypeDefs,
                resolvers: ProductResolvers(host, key)
            }),
            makeExecutableSchema({
                typeDefs: CategoriesTypeDefs,
                resolvers: CategoriesResolvers(host, key)
            }),
            makeExecutableSchema({
                typeDefs: CustomersTypeDefs,
                resolvers: CustomersResolvers(host, key)
            }),
            makeExecutableSchema({
                typeDefs: OrdersTypeDefs,
                resolvers: OrdersResolvers(host, key)
            }),
            makeExecutableSchema({
                typeDefs: CartTypeDefs,
                resolvers: CartsResolvers(host, key)
            })
        ]
    })
}))

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));


let fetch = require('node-fetch')

app.post('/login', bodyParser.json(), (req, res) => {
    fetch("http://localhost/rest/V1/integration/customer/token", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            username: req.body.email,
            password: req.body.password
        })
    }).then(res => res.json()).then(console.log)
})


app.listen(3005)