var sinon        = require('sinon');
var loopbackRiak = require('../../lib/riak');
var assert       = require('assert');

describe("api/exists", function(){
  var existsStub, errorSpy, existsSpy;
  var datasource = { settings: {"node_list" : "192.168.0.101,192.168.0.15,localhost,192.168.0.111"} };
  var modelName = 'TestModel';

  beforeEach(function(){
    loopbackRiak.initialize(datasource);

    existsStub = sinon.stub(datasource.connector, "exists");

    errorSpy = sinon.spy();
    existsSpy = sinon.spy();

    existsStub.yieldsAsync(errorSpy, existsSpy);
  });

  afterEach(function(){
    existsStub.restore();
  });

  it("calls exists with the model name and id", function(done){
    var id = "some id";

    datasource.connector.exists(modelName, id, function(error, exists){
      assert.equal(error, errorSpy);
      assert.equal(exists, existsSpy);

      done();
    });
  });
});
