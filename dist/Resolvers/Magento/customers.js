"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
exports.CustomersResolvers = function (host, key) {
    return {
        Query: {
            allCustomers: function (root, args, context) {
                return node_fetch_1.default(host + "/rest/V1/customers/1", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': "Bearer " + key
                    }
                }).then(function (res) { return res.json(); })
                    .then(function (res) { console.log(JSON.stringify(res)); return res; });
            }
        },
        Mutation: {
            signup: function (root, args, context) {
                return node_fetch_1.default(host + "/rest/V1/customers", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + key
                    },
                    body: JSON.stringify({
                        customer: {
                            email: args.email,
                            firstname: args.firstname,
                            lastname: args.lastname
                        },
                        password: args.password
                    })
                }).then(function (res) { return res.text(); });
            },
            login: function (root, args, context) {
                return node_fetch_1.default(host + "/rest/V1/integration/customer/token", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        "Authorization": "Bearer " + key
                    },
                    body: JSON.stringify({
                        "username": args.email,
                        "password": args.password,
                    })
                }).then(function (res) { return res.text(); });
            },
            resetPassword: function (root, args, context) {
                return node_fetch_1.default(host + "/rest/V1/customers/password", {
                    method: "PUT",
                    headers: {
                        'Content-Type': "application/json",
                        "Authorization": "Bearer " + key
                    },
                    body: JSON.stringify({
                        "email": args.email,
                        "template": "reset_password",
                        "websiteId": 1
                    })
                }).then(function (res) { return res.text(); });
            }
        }
    };
};
