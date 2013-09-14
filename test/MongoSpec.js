var chai = require('chai') 
  , expect = chai.expect
  , MongoDB = require('../index')
  , ObjectID = require('mongodb').ObjectID
  ;

chai.should();

describe('MongoDB', function () {

  this.timeout(5000);


  var backend, doc, docs;


  before(function (done) {
    backend = new MongoDB('widgets', {
      uri: 'mongodb://USERNAME:PASSWORD@HOST:PORT/DB'
    });
    setTimeout(function () {
      backend.reset();
      done();
    }, 1500);
  });


  describe('createID', function () {

    it('should create an ObjectID', function () {
      id = backend.createID();
      expect(id instanceof ObjectID).equals(true);
    });

  });


  describe('save', function () {

    before(function (done) {
      backend.save({ foo: 'bar' }, function (err, result) {
        doc = result;
        done();
      });
    });

    it('should insert an object into a collection', function () {
      doc._id.should.be.defined;
    });

  });


  describe('find', function () {

    describe('by id', function () {

      before(function (done) {
        backend.find({ _id: doc._id }, function (err, result) {
          doc = result;
          done();
        });
      });

      it('should retrieve an object', function () {
        doc._id.should.be.defined;
      });

    });

    describe('by attribute', function () {

      before(function (done) {
        backend.find({ foo: 'bar' }, function (err, result) {
          doc = result;
          done();
        });
      });

      it('should retrieve an object', function () {
        doc.foo.should.equal('bar');
      });

    });    

    describe('list', function () {

      before(function (done) {
        backend.save({ x: 1 }, function (e, r) {
          backend.find({}, function (err, result) {
            docs = result;
            done();
          });
        });
      });

      it ('should retrieve a set of objects', function () {
        docs.length.should.equal(2);
        (Array.isArray(docs)).should.equal(true);
      });

    });

  });
  

  describe('update', function () {

    var updated;
    
    before(function (done) {
      backend.update({ _id: doc._id }, { foo: 'baz'}, function (err) {
        backend.find({ _id: doc._id }, function (err, result) {
          updated = result;
          done();
        });
      });
    });

    it('should update objects in a collection', function () {
      updated.foo.should.equal('baz');
    });

  });

  describe('destroy', function () {

    var count;

    before(function (done) {
      backend.destroy({ _id: doc._id}, function (err) {
        backend.find({}, function (err, result) {
          docs = result;
          done();
        });
      });
    });

    it('should remove objects from a collection', function () {
      docs.length.should.equal(1);
    });

  });

});