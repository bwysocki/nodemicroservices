module.exports = function( options ) {

  /**
  * Fetch the list of all the products.
  */
  this.add( {area: 'product', action: 'fetch', criteria: 'all'},  function (msg, done) {
    var products = this.make('products');
    products.list$({}, done);
  });

  /**
  * Fetch the list of products by category.
  */
  this.add( {area: 'product', action: 'fetch', criteria: 'byCategory'}, function(args, done) {
    var products = this.make('products');
    products.list$({category: args.category}, done);
  });

  /**
  * Fetch a product by id.
  */
  this.add( {area: "product", action: "fetch", criteria: "byId"}, function(args, done) {
    var product = this.make("products");
    product.load$(args.pid, done);
  });

}
