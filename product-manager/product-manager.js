var seneca = require( 'seneca' )()
  .use('entity')
  .use(require('./plugins/product_manager_fetch_plugin.js'), {})
  .use(require('./plugins/product_manager_add_plugin.js'), {})
  .use(require('./plugins/product_manager_remove_plugin.js'), {})
  .use(require('./plugins/product_manager_edit_plugin.js'), {})
  .use("mongo-store", {
    name: "seneca",
    host: "127.0.0.1",
    port: "27017"
  });


seneca.ready(function(err){

  //exposure REST api

  seneca.act('role:web', {
    use:{
      prefix: '/products',
      pin: {area:'product',action:'fetch', criteria: '*'},
      map:{
        all: { GET: true}, // http://localhost:3000/products/all
        byCategory: { GET: true }, //http://localhost:3000/products/byCategory?category=AAA
        byId: { GET: true }, //http://localhost:3000/products/byId?pid=57d64632aae8849d281987c7
        edit: { PUT: true },
        delete: { GET: false, DELETE: true }
      }
    }
  });

  seneca.act('role:web', {
    use:{
      prefix: '/products',
      pin: {area:'product',action:'*'},
      map:{
        add: { POST: true }, // http://localhost:3000/products/add
        /*
          {
            "category": "ABC",
            "name": "abcName",
            "description": "abc desc",
            "price": 200
          }
        */
        edit: { PUT: true}, // http://localhost:3000/products/edit?pid=57d64632aae8849d281987c7
        /*
          {
            "category": "ABC",
            "name": "abcName",
            "description": "abc desc",
            "price": 200
          }
        */
        remove: { DELETE: true} //http://localhost:3000/products/remove?pid=57d64632aae8849d281987c7
      }
    }
  });

});

module.exports = seneca;
