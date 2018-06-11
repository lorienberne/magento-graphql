"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartTypeDefs = "\n    type Query {\n        cart(cart: String!): String!\n    }\n\n    type Mutation {\n        getCart: String!\n        addToCart(sku: String!, quantity: String!) : String\n    }\n";
