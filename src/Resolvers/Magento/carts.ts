import fetch from "node-fetch"

export const CartsResolvers = (host: string, key: string) => {
    return {
        Query: {
            cart(root: any, args: any, context: any) {
                return fetch(`${host}/rest/V1/carts/${args.cart}/items`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${key}`
                    }
                }).then((res: any) => res.text())
            }
        },
        Mutation: {
            getCart(root: any, args: any, context: any) {
                return fetch(`${host}/rest/V1/carts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${key}`
                    }
                }).then((res: any) => res.text())
            },
            addToCart(root : any, args: any, context: any) {
                return fetch(`${host}/rest/V1/categories`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${key}`
                    },
                    body: JSON.stringify({
                        "quoteId": args.quote_id,
                        "cartItem": {
                          "item_id": 0,
                          "sku": "string",
                          "qty": 0,
                          "name": "string",
                          "price": 0,
                          "product_type": "string",
                          "quote_id": "string",
                          "product_option": {
                            "extension_attributes": {
                              "custom_options": [
                                {
                                  "option_id": "string",
                                  "option_value": "string",
                                  "extension_attributes": {
                                    "file_info": {
                                      "base64_encoded_data": "string",
                                      "type": "string",
                                      "name": "string"
                                    }
                                  }
                                }
                              ],
                              "bundle_options": [
                                {
                                  "option_id": 0,
                                  "option_qty": 0,
                                  "option_selections": [
                                    0
                                  ],
                                  "extension_attributes": {}
                                }
                              ],
                              "configurable_item_options": [
                                {
                                  "option_id": "string",
                                  "option_value": 0,
                                  "extension_attributes": {}
                                }
                              ],
                              "downloadable_option": {
                                "downloadable_links": [
                                  0
                                ]
                              },
                              "giftcard_item_option": {
                                "giftcard_amount": "string",
                                "custom_giftcard_amount": 0,
                                "giftcard_sender_name": "string",
                                "giftcard_recipient_name": "string",
                                "giftcard_sender_email": "string",
                                "giftcard_recipient_email": "string",
                                "giftcard_message": "string",
                                "extension_attributes": {}
                              }
                            }
                          },
                          "extension_attributes": {
                            "negotiable_quote_item": {
                              "item_id": 0,
                              "original_price": 0,
                              "original_tax_amount": 0,
                              "original_discount_amount": 0,
                              "extension_attributes": {}
                            }
                          }
                        }
                      })
                }).then((res: any) => res.json())
                .then((res: any) => {console.log(JSON.stringify(res)); return res})
            }
        }
    }
} 