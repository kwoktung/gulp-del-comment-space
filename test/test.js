var assert = require('assert');
var util = require('gulp-util');
var through2 = require('through2');
var fs = require('fs');
var Plugin = require('../');

describe('Gulp Plugin', function() {	
  describe('Buffer Input', function() {
  	var file, PluginStream;
  	beforeEach(function(){
  		file = new util.File({
  			path:'/test/origin/normalize.css',
  			contents:fs.readFileSync('test/origin/normalize.css')
  		}),
  		PluginStream = Plugin()
  	})
    it('should delete comment and blank space', function() {
      PluginStream.write(file);
      PluginStream.end();
      assert.equal(file.contents.toString(),fs.readFileSync('test/expect/normalize.css','utf-8'))
    });
  });

  describe('Stream Input',function(){
  	var file, writeableStream, PluginStream;
  	beforeEach(function(){
  		file = new util.File({
  			path:'/test/origin/normalize.css',
  			contents:fs.createReadStream('test/origin/normalize.css')
  		},
  		PluginStream = Plugin()
  		)
  	})

  	it('should delete comment and blank space', function(done) {
  	  PluginStream.pipe(through2.obj(function(file,encode,callback){
  	  	if(!util.isNull(file)){
  	  		file.pipe(through2(function(chuck,encode,callback){
  	  			if(!util.isNull(chuck)){
  	  				assert.equal(chuck.toString(),fs.readFileSync('test/expect/normalize.css','utf-8'))
  	  				done();
  	  			}
  	  		}))
  	  	}
  	  }));
      PluginStream.write(file);
      PluginStream.end();
    });
  })
});