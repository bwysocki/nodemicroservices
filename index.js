var product_manager = require('./product-manager/product-manager.js')
var express = require('express');
var app = express();
var senecaweb = product_manager.export('web');
app.use(require("body-parser").json());
// This is how you integrate Seneca with Express
app.use( senecaweb );
app.listen(3000);
