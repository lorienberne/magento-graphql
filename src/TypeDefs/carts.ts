export const CartTypeDefs : string = `
    type Query {
        cart(cart: String!): String!
    }

    type Mutation {
        getCart: String!
        addToCart(sku: String!, quantity: String!) : String
    }
`