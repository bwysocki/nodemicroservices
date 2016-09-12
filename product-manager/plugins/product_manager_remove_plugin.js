module.exports = function( options ) {

  /**
  * Removes a product by id.
  */
  this.add({area: 'product', action: 'remove'}, function(args, done) {
    var product = this.make('products');
    product.remove$(args.pid, function(err) {
      done(err, null);
    });
  });

}
