export const OrdersTypeDefs = `
    type Order {
        id: String
    }

    type Query {
        allOrders: [Order]
    }
`