"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
exports.CategoriesResolvers = function (host, key) {
    return {
        Query: {
            categories: function (root, args, context) {
                return node_fetch_1.default(host + "/rest/V1/categories", {
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
