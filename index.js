/**
 * Module dependencies
 */

var mongodb     = require('mongodb')
  , MongoClient = mongodb.MongoClient
  , ObjectID    = mongodb.ObjectID
  ;


/**
 * Constructor
 */

function MongoDB (collection, config) {
  var self = this;
  self.config = config;

  MongoClient.connect(config.uri, function (err, db) {
    self.db = db;
    self.collection = db.collection(collection);
  });
}


/**
 * Reset
 */

MongoDB.prototype.reset = function () {
  this.collection.remove({}, function (err) {});
};


/**
 * Create ID
 */

MongoDB.prototype.createID = function () {
  return new ObjectID();
};


/**
 * Save
 */

MongoDB.prototype.save = function(doc, callback) {
  this.collection.insert(doc, function (err, docs) {
    if (err) { return callback(err); }
    callback(null, docs[0]);
  });
};


/**
 * Find
 */

MongoDB.prototype.find = function(conditions, options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }

  this.collection.find(conditions).toArray(function (err, result) {
    if (err) { return callback(err); }
    var reply = (Object.keys(conditions).length === 0) ? result : result[0]
    callback(null, reply);
  });
};


/**
 * Update
 */

MongoDB.prototype.update = function(conditions, update, callback) {
  this.collection.update(conditions, update, function (err) {
    if (err) { return callback(err); }
    callback(null);    
  });
};


/**
 * Destroy
 */

MongoDB.prototype.destroy = function(conditions, callback) {
  this.collection.remove(conditions, function (err) {
    if (err) { return callback(err); }
    callback(null);    
  });
};


/**
 * Exports
 */

module.exports = MongoDB;
