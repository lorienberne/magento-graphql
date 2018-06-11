import fetch from "node-fetch"

export const OrdersResolvers = (host: string, key: string) => {
    return {
        Query: {
            allOrders(root : any, args: any, context: any) {
                return fetch(`${host}/rest/V1/orders?searchCriteria[filter_groups][0][filters][0][field]=customer_id&searchCriteria[filter_groups][0][filters][0][value]=1`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${key}`
                    }
                }).then((res: any) => res.json())
                .then((res: any) => {console.log(JSON.stringify(res)); return res})
            }
        }
    }
} 