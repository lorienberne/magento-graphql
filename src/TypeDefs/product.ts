export const ProductTypeDefs : string = `
    type Images {
        image: String
        small: String
        thumbnail: String
    }

    type Descriptions {
        short: String
        full: String
    }

    type Product {
        id: String,
        sku: String,
        category: String,
        name: String,
        descriptions: Descriptions,
        price: Float,
        images: Images,
        stock: Int
    }

    type Query {
        productsByCategory(category: String!) : [Product]
        productBySku(sku: String!): Product
    }
`