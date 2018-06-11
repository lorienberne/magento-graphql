"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var ToProduct = function (item) {
    var attr = item.custom_attributes.reduce(function (acc, att) { acc[att.attribute_code] = att.value; return acc; }, {});
    return __assign({}, item, { descriptions: {
            short: attr.short_description,
            full: attr.description
        }, images: {
            image: attr.image,
            small: attr.small_image,
            thumbnail: attr.thumbnail
        } });
};
exports.ProductResolvers = function (host, key) {
    return {
        Query: {
            productsByCategory: function (_, args, context) {
                return node_fetch_1.default(host + "/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=" + args.category, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': "Bearer " + key
                    }
                }).then(function (res) { return res.json(); })
                    .then(function (res) {
                    console.log(JSON.stringify(res));
                    return res.items.map(ToProduct);
                });
            },
            productBySku: function (root, args, context) {
                return Promise.all([
                    node_fetch_1.default(host + "/rest/V1/products/" + args.sku, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': "Bearer " + key
                        }
                    }).then(function (res) { return res.json(); }),
                    node_fetch_1.default(host + "/rest/V1/stockItems/TEST", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': "Bearer " + key
                        }
                    }).then(function (res) { return res.json(); })
                ]).then(function (_a) {
                    var product = _a[0], stock = _a[1];
                    var attr = product.custom_attributes.reduce(function (acc, att) { acc[att.attribute_code] = att.value; return acc; }, {});
                    return __assign({}, product, { descriptions: {
                            short: attr.short_description,
                            full: attr.description
                        }, images: {
                            image: attr.image,
                            small: attr.small_image,
                            thumbnail: attr.thumbnail
                        }, stock: stock.qty });
                });
            }
        }
    };
};
