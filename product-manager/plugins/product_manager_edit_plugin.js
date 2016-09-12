module.exports = function( options ) {

  /**
  * Edits a product fetching it by id first.
  */
  this.add({area: "product", action: "edit"}, function(args, done) {
    this.act({area: "product", action: "fetch", criteria: "byId", pid: args.pid}, function(err, result) {
      result.data$({
        name: args.name,
        category: args.category,
        description: args.description,
        price: args.price
      });
      result.save$(function(err, product){
        done(err, product.data$(false));
      });
    });
  });

}
