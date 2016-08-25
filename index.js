var through2 = require('through2');
var util = require('gulp-util');

commentReg = /\/\*[\s\S]*?\*\//gm

blankSpaceReg = /\s/g

module.exports = function(){
	return through2.obj(function(file,encode,callback){
		if(file.isNull()){
			callback(null,file);
		}
		if(file.isStream()){
			file.contents = file.contents.pipe(through2(function(chuck,encode,callback){
				if(util.isNull(chuck)){
					callback(null, chuck);
				}
				if(util.isBuffer(chuck)){
					chuck = new Buffer(String(chuck)
						.replace(commentReg, '')
						.replace(blankSpaceReg,''))
				}
				callback(null,chuck);
			}));
		}
		if(file.isBuffer()){
			file.contents = new Buffer(String(file.contents)
				.replace(commentReg, '')
				.replace(blankSpaceReg,''));
		}
		callback(null,file);
	})
}
