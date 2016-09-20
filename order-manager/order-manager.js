var seneca = require( 'seneca' )()
  .use(require('./plugins/order-plugin.js'), {})
  .listen(3002);

seneca.ready(function(err){

  //exposure REST api

  seneca.act('role:web', {
    use:{
      prefix: '/orders',
      pin: {area:'orders',action:'*'},
      map:{
        create: { POST: true}, // http://localhost:3002/orders/create
        /*
        {
          "to": "wysockibartosz@gmail.com",
          "toName": "Bartosz Wysocki",
          "subject": "Test email",
          "content": "Test email content..."
        }
        */
      }
    }
  });

});

var express = require('express');
var app = express();
var senecaweb = seneca.export('web');
app.use(require("body-parser").json());
// This is how you integrate Seneca with Express
app.use( senecaweb );
app.listen(3002);
