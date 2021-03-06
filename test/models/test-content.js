var chai = require('chai');
var should = chai.should();

var mongoose = require('mongoose');
var config = require('../../server/config.json');

var Content = require('../../server/models/content');
var User = require('../../server/models/user');

describe('Content Model', function() {
  
  var schema = Content.schema.paths;
  var ObjectId = mongoose.Types.ObjectId;
  var testAccount;
  
  before(function(done){
    mongoose.disconnect();
    mongoose.connect(config.testURI);
    User.collection.drop();
    Content.collection.drop();
    User.register({ email: 'email@test.com' }, 'password', function(err, account) {
      testAccount = account;
      done();
    });
  });
  after(function(){
    User.collection.drop();
    Content.collection.drop();
    mongoose.disconnect();
  });
  
  describe('Schema', function(){
    it('should have userid field', function(){
      schema.userid.should.exist;
      schema.userid.instance.should.equal('ObjectID');
    });
    it('should have content field', function(){
      schema.content.should.exist;
      schema.content.instance.should.equal('String');
    });
    it('should have original field', function(){
      schema.original.should.exist;
      schema.original.instance.should.equal('String');
    });
    it('should have embed field', function(){
      schema.embed.should.exist;
      schema.embed.instance.should.equal('String');
    });
    it('should have title field', function(){
      schema.title.should.exist;
      schema.title.instance.should.equal('String');
    });
    it('should have img field', function(){
      schema.img.should.exist;
      schema.img.instance.should.equal('String');
    });
    it('should have type field', function(){
      schema.type.should.exist;
      schema.type.instance.should.equal('String');
    });
    it('should have half field', function(){
      schema.half.should.exist;
      schema.half.instance.should.equal('Boolean');
    });
    it('should have postdate field', function(){
      schema.postdate.should.exist;
      schema.postdate.instance.should.equal('Date');
    });
    it('should have lastupdate field', function(){
      schema.lastupdate.should.exist;
      schema.lastupdate.instance.should.equal('Date');
    });
  });
  
  describe('Functions', function(){
    
    beforeEach(function(done){
      var newContent = {
        userid: testAccount._id,
        type: 'STRING',
        half: false,
        content: 'test string'
      };
      Content.save(newContent, function(err){
        if(err) { throw err; }
        done();
      });
    });
    afterEach(function(){
      Content.collection.drop();
    });
    
    it('should return contents on valid findContents', function(done){
      Content.findContents(testAccount._id, function(err, contents){
        if(err) { throw err }
        contents.should.be.a.array;
        contents.length.should.equal(1);
        contents[0].should.have.property('type');
        contents[0].type.should.equal('STRING');
        contents[0].should.have.property('half');
        contents[0].half.should.equal(false);
        contents[0].should.have.property('content');
        contents[0].content.should.equal('test string');
        done();
      });
    });
    it('should return saved content on valid save', function(done){
      var newContent = {
        userid: testAccount._id,
        type: 'STRING',
        half: false,
        content: 'save string'
      };
      Content.save(newContent, function(err){
        if(err) { throw err; }
        done();
      });
    });
    it('should return posted on valid post', function(done){
      Content.post(testAccount._id, "post string", function(err, content){
        content.should.have.property('_id');
        content.should.have.property('type');
        content.type.should.equal('STRING');
        content.should.have.property('half');
        content.half.should.equal(false);
        content.should.have.property('content');
        content.content.should.equal('post string');
        done();
      });
    });
    it('should delete posted content', function(done){
      Content.post(testAccount._id, "delete string", function(err, content){
        content.should.have.property('_id');
        Content.findOneAndRemove({ _id: content._id }, function(err, deleted){
          deleted.should.have.property('_id');
          (content._id+"").should.equal((deleted._id+""));
          done();
        });
      });
    });
  });
  
  describe('Helper Functions', function(){
    
  });
});