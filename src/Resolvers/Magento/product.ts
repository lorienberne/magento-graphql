import fetch from "node-fetch"

const ToProduct = item => {
    let attr = item.custom_attributes.reduce((acc, att) => {acc[att.attribute_code] = att.value; return acc}, {})
    return {
        ...item,
        descriptions: {
            short: attr.short_description, 
            full: attr.description
        },
        images: {
            image: attr.image,
            small: attr.small_image,
            thumbnail: attr.thumbnail
        } 
    }
}

export const ProductResolvers = (host: string, key: string) => {
    return {
        Query: {
            productsByCategory(_ : any, args: any, context: any) {
                return fetch(`${host}/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${args.category}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${key}`
                    }
                }).then((res: any) => res.json())
                .then((res: any) => {console.log(JSON.stringify(res)); 
                    return res.items.map(ToProduct)
                })        
            },
            productBySku( root: any, args: any, context: any) {
                return Promise.all([
                    fetch(`${host}/rest/V1/products/${args.sku}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${key}`
                        }
                    }).then((res: any) => res.json()),
                    fetch(`${host}/rest/V1/stockItems/TEST`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${key}`
                        }
                    }).then((res: any) => res.json())
                ]).then(([product, stock]) => {
                    let attr = product.custom_attributes.reduce((acc, att) => {acc[att.attribute_code] = att.value; return acc}, {})
                    return {
                        ...product,
                        descriptions: {
                            short: attr.short_description, 
                            full: attr.description
                        },
                        images: {
                            image: attr.image,
                            small: attr.small_image,
                            thumbnail: attr.thumbnail
                        },
                        stock: stock.qty
                    }
                })  
            }
    }
}}