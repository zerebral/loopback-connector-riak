'use strict';

var bucketNameComposer = require('../private/bucket_name_composer');

/**
 * Check if a model instance exists by id
 * @param {String} modelName The model name
 * @param {*} id The id value
 * @param {Function} [apiCallback] The callback function
 *
 */
module.exports = function(modelName, id, apiCallback){
  //var self = this;

  //This probably is not the best way to check if the key exists?
  //Not sure whether the basho-riak-client provides a better way to handle this
  this.db.fetchValue({ bucket: bucketNameComposer(this, modelName), key: id, convertToJs: true },
      function (err, rslt) {
        if (err) {
          throw new Error(err);
        } else {
          if(rslt.values.length > 0){
            apiCallback(err, true); // object for the key found
          }else{
            apiCallback(err, false);
          }
        }
      }
  );

};
