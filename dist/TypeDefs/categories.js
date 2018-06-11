"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesTypeDefs = "\n    type Category {\n        id: String,\n        name: String,\n        children_data: [Category]\n    }\n\n    type Query {\n        categories: [Category]\n    }\n";
