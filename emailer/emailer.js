var seneca = require( 'seneca' )()
  .use(require('./plugins/emailer-plugin.js'), {})
  .listen( { port:3001 } );

seneca.ready(function(err){

  //exposure REST api

  seneca.act('role:web', {
    use:{
      prefix: '/email',
      pin: {area:'email',action:'*'},
      map:{
        send: { POST: true}, // http://localhost:3001/email/send
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

/*var express = require('express');
var app = express();
var senecaweb = seneca.export('web');
app.use(require("body-parser").json());
// This is how you integrate Seneca with Express
app.use( senecaweb );
app.listen(3001);*/
