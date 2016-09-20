module.exports = function( options ) {

  var seneca = this;
  var senecaEmailer = require("seneca")().client( {port: 3001} );

  seneca.add({area: "orders", action: "create"}, function(args, done) {
    var products = args.products;
    var total = 0.0;
    products.forEach(function(product){
      total += product.price;
    });

    //var orders = this.make("orders");
    var orders = {};
    orders.total = total;
    orders.customer_email = args.email;
    orders.customer_name = args.name;

    //simulate save and save email
    console.log("Saving order...");
    pattern = {
      area: "email",
      action: "send",
      to: args.email,
      toName: args.name,
      subject: "Test email",
      content: "Test email content..."
    };
    senecaEmailer.act(pattern, done);

    /**
    When talking about microservices, this error is especially important. You want
    to be resilient. The fact that an e-mail has failed sending does not mean that the
    order cannot be processed, but the e-mail could be manually sent later by someone
    reprocessing the data. This is what we call eventual consistency; we factor into our
    system the fact that at some point our system is going to crash.
    In this case, if there is a problem sending the e-mail, but we could store the order in
    the database, the calling code, in this case the UI, should have enough information to
    decide whether the customer gets a fatal message or just a warning:
    **/

  });

  seneca.add({area: "orders", action: "fetch"}, function(args, done) {
    var orders = this.make("orders");
    orders.list$({id: args.id}, done);
  });

  seneca.add({area: "orders", action: "delete"}, function(args, done) {
    var orders = this.make("orders");
    orders.remove$({id: args.id}, function(err) {
      done(err, null);
    });
  });

}
