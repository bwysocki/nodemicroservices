module.exports = function(options) {

  var seneca = this;

  var senecaEmailer = require("seneca")().client( {port: 3001} );
  var senecaProductManager = require("seneca")().use('entity').client( {port: 3000} );
  var senecaOrderProcessor = require("seneca")().client( {port: 3002} );

  /**
  * Gets the full list of products
  */
  seneca.add({area: "ui", action: "products"}, function(args, done) {
    senecaProductManager.act({area: "product", action: "fetch", criteria: "all"}, function(err, result) {
      done(err, result);
    });
  });

  /**
  * Creates an order to buy a single prodct.
  */
  seneca.add({area: "ui", action: "createorder"}, function(args, done) {
    senecaProductManager.act({area: "product", action: "fetch", criteria: "byId", pid: args.pid}, function(err, product) {
      if(err) done(err, null);
      console.log(args.pid, 'aaaaaaaaaaaaaa', product)
      senecaOrderProcessor.act({area: "orders", action: "create", products: [product], email: args.email, name: args.name}, function(err, order) {
          done(err, order);
        }
      );
    });
  });
};
