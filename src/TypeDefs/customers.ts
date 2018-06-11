export const CustomersTypeDefs = `
    type Customer {
        id: String!
    }

    type Query {
        allCustomers: Customer
    }

    type Mutation {
        signup(email: String!, firstname: String!, lastname: String!, password: String!): String
        login(email: String!, password: String!): String
        resetPassword(email: String!): String
        addAddress(): String
    }
`