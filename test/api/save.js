var assert = require('assert');
var sinon = require('sinon');
var loopbackRiak = require('../../lib/riak');

describe("api/save", function(){
  var saveStub;
  var modelName = "TestModel";
  var datasource = { settings: {"node_list" : "localhost"}, "bucketPrefix":"topic-" };

  beforeEach(function(){
    loopbackRiak.initialize(datasource);

    //saveStub = sinon.stub(datasource.connector.db, "storeValue");
    //saveStub.yieldsAsync(null, true);
  });

  afterEach(function(){
    //saveStub.restore();
  });

  describe("without an id", function(){
    it("throws an error", function(done){
      var doc = { wow: "bbq" };
      console.log("Storing doc to bucket - " + modelName + " without id");
      datasource.connector.save(modelName, doc, function(error, result){
        console.log(error);
        assert.ok(error);
        //assert.ok(!saveStub.lastCall);

        done();
      });
    });
  });

  describe("with an id", function(){
    it("calls save with the document", function(done){
      var doc = { id: "cucumber", wow: "bbq" };
      console.log("Storing doc to bucket - " + modelName + " with id - " + doc.id);
      datasource.connector.save(modelName, doc, function(error, result){
        console.log(error);
        assert.ok(!error);
        console.log(result);
        assert.ok(result);
        //assert.ok(!saveStub.lastCall);

        done();
      });
    });
  });
});
