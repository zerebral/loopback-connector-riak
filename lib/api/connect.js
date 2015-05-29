'use strict';

var riak = require('basho-riak-client');

/**
* Connect to Riak
*
* @param {Function} [apiCallback] The callback function
*
* @callback callback
* @param {Error} err The error object
* @param {Db} db The riak client object
*/
module.exports = function(apiCallback){
  var self = this;

  this.db = new riak.Client(this.settings.node_list.split(","));
  this._models = this._models || {};

  if (!apiCallback) return;

  this.ping(function(error, response){
    if (error)         onConnectionFailure(error);
    else if (response) onConnectionSuccess();
    else               onUnexpectedError();

    apiCallback(error, self.db);
  });

  function onConnectionSuccess(){
    self._logger('connection is established to host:', self.settings.host, "port:", self.settings.port);
  }

  function onConnectionFailure(error){
    self._logger('connection failed:', error);
  }

  function onUnexpectedError(){
    self._logger("unexpected issue connecting to Riak");
  }
}
