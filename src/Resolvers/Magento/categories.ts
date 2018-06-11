import fetch from "node-fetch"

export const CategoriesResolvers = (host: string, key: string) => {
    return {
        Query: {
            categories(root : any, args: any, context: any) {
                return fetch(`${host}/rest/V1/categories`, {
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