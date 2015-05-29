'use strict';

/**
 * Disconnect from Riak
 */
module.exports = function(callback){
  this.db.shutdown(function (state) {
    if (state === Riak.Cluster.State.SHUTDOWN) {
      process.exit();
    }
  });
  // no-op
  if (callback) callback();
};
