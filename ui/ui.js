var seneca = require( 'seneca' )()
  .use(require('./plugins/ui-plugin.js'), {})
  .listen( { port:3003 } );

seneca.ready(function(err){

  //exposure REST api

  seneca.act('role:web', {
    use:{
      prefix: '/api',
      pin: {area:'ui',action:'*'},
      map:{
        products: { GET: true}, // http://localhost:3003/api/products
        createorder: {POST: true} // http://localhost:3003/api/createorder?pid=57d64716f0fcb26860b868bb
        /**
        {
          "email": "ktos@kupujacy.pl",
          "name": "Ktos"
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
app.listen(3003);
