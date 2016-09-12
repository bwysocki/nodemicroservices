module.exports = function( options ) {

  /**
  * Adds a product.
  */
  this.add( {area: 'product', action: 'add'}, function(args, done) {
    var products = this.make('products');

    products.category = args.category;
    products.name = args.name;
    products.description = args.description;
    products.price = args.price
    products.save$(function(err, product){
      done(err, products.data$(false));
    });
  });

}
