export const CategoriesTypeDefs : string = `
    type Category {
        id: String,
        name: String,
        children_data: [Category]
    }

    type Query {
        categories: [Category]
    }
`