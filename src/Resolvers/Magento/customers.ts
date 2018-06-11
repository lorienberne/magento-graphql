import fetch from "node-fetch"

export const CustomersResolvers = (host: string, key: string) => {
    return {
        Query: {
            allCustomers(root : any, args: any, context: any) {
                return fetch(`${host}/rest/V1/customers/1`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${key}`
                    }
                }).then((res: any) => res.json())
                .then((res: any) => {console.log(JSON.stringify(res)); return res})
            }
        },
        Mutation: {
            signup(root: any, args: any, context: any) {
                return fetch(`${host}/rest/V1/customers`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${key}`
                    },
                    body: JSON.stringify({
                        customer: {
                            email: args.email,
                            firstname: args.firstname,
                            lastname: args.lastname
                        },
                        password: args.password
                    })
                }).then(res => res.text())
            },
            login(root: any, args: any, context: any) {
                return fetch(`${host}/rest/V1/integration/customer/token`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        "Authorization": `Bearer ${key}`
                    },
                    body: JSON.stringify({
                        "username": args.email,
                        "password": args.password,
                      })
                }).then(res => res.text())
            },
            resetPassword(root: any, args: any, context: any) {
                return fetch(`${host}/rest/V1/customers/password`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': "application/json",
                        "Authorization": `Bearer ${key}`
                    },
                    body: JSON.stringify({
                        "email": args.email,
                        "template": "reset_password",
                        "websiteId": 1
                      })
                }).then(res => res.text())
            }
        }
    }
} 