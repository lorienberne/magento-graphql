"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
exports.OrdersResolvers = function (host, key) {
    return {
        Query: {
            allOrders: function (root, args, context) {
                return node_fetch_1.default(host + "/rest/V1/orders?searchCriteria[filter_groups][0][filters][0][field]=customer_id&searchCriteria[filter_groups][0][filters][0][value]=1", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': "Bearer " + key
                    }
                }).then(function (res) { return res.json(); })
                    .then(function (res) { console.log(JSON.stringify(res)); return res; });
            }
        }
    };
};
