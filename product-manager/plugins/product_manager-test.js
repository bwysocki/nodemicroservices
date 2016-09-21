var seneca = require( 'seneca' )()
  .use('entity')
  .use(require('./product_manager_fetch_plugin.js'), {})
  .use(require('./product_manager_add_plugin.js'), {})
  .use(require('./product_manager_remove_plugin.js'), {})
  .use(require('./product_manager_edit_plugin.js'), {});

var chai = require('chai');
var sinon = require('sinon');

chai.should();
var expect = chai.expect;

describe('When add command is launched', function(){
  it('should return saved product', function(fin) {
    seneca.act({area: 'product', action: 'add', category: 'C', name: 'c', price: 1, description: 'ccc'}, function (err, out) {
      expect(out.price).to.be.an('number');
      expect(out.price).to.equal(1);
      expect(out.name).to.equal('c');
      expect(out.category).to.equal('C');
      expect(out.description).to.equal('ccc');
      fin();
    });
  });
});

//istanbul cover node_modules/mocha/bin/_mocha -- product-manager\plugins\product_manager-test.js
