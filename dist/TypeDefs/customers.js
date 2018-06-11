"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersTypeDefs = "\n    type Customer {\n        id: String!\n    }\n\n    type Query {\n        allCustomers: Customer\n    }\n\n    type Mutation {\n        signup(email: String!, firstname: String!, lastname: String!, password: String!): String\n        login(email: String!, password: String!): String\n        resetPassword(email: String!): String\n        addAddress(): String\n    }\n";
