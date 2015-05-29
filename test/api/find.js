var sinon        = require('sinon');
var loopbackRiak = require('../../lib/riak');
var assert       = require('assert');
var datasource = { settings: {"node_list" : "192.168.0.101,192.168.0.15,localhost,192.168.0.111"} };

describe("api/find", function(){
  var getStub, errorSpy;
  var anticipatedResult = {
    plaything: "stick",
    playmate: "puppy",
    someDate: new Date()
  };

  var jsonResult = JSON.parse(JSON.stringify(anticipatedResult));

  var datasource = { settings: {} };
  var models = {
    BlackCat: {
      properties: {
        plaything: {
          type: String
        },

        playmate: {
          type: String
        },

        someDate: {
          type: Date
        }
      }
    }
  };

  var modelName = Object.keys(models)[0];

  beforeEach(function(){
    loopbackRiak.initialize(datasource);
    datasource.connector._models = models;

    //getStub = sinon.stub(datasource.connector.db, "get");

    errorSpy = sinon.spy();

    //getStub.yieldsAsync(errorSpy, jsonResult);
  });

  afterEach(function(){
    //getStub.restore();
  });

  it("calls find with the model name and id", function(done){
    var id = "some id";
    this.connector.find(modelName, id, function(error, result){
      assert.ok(!error);
      assert.equal(result.id,id);
    });

  });

  //it("returns the document as native types", function(done){
  //  var id = "some id";
  //
  //  datasource.connector.find(modelName, id, function(error, result){
  //    assert.equal(error, errorSpy);
  //    assert.equal(anticipatedResult.foo, result.foo);
  //    assert.equal(anticipatedResult.that, result.that);
  //
  //    assert.equal(anticipatedResult.someDate.constructor, Date);
  //
  //    done();
  //  });
  //});
});
