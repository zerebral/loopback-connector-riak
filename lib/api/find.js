'use strict';

var jsonToNativeTypes  = require('../private/json_to_native_types');
var bucketNameComposer = require('../private/bucket_name_composer');

/**
 * Find a model instance by id
 * @param {String} modelName The model name
 * @param {*} id The id value
 * @param {Function} [apiCallback] The callback function
 */
module.exports = function(modelName, id, apiCallback){
  var self = this;

  this.db.fetchValue({ bucket: bucketNameComposer(this, modelName), key: id, convertToJs: true },
      function (err, rslt) {
        if (err) {
          throw new Error(err);
        } else {
          if(rslt.values.length > 0){
            var riakObj = rslt.values.shift();
            apiCallback(err, riakObj); // object for the key found
          }else{
            apiCallback(err, null); // not found
          }
        }
      }
  );

  this.db.get(bucketNameComposer(this, modelName), id, function(error, result, response){
    if (response && response.statusCode === 404) return apiCallback(null, null);

    apiCallback(error, jsonToNativeTypes(self, modelName, result));
  });
};
