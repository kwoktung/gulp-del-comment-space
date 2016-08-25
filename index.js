var through2 = require('through2');
var util = require('gulp-util');

module.exports = function(){
	return through2.obj(function(chuck,encode,callback){
		// do something with chuck
		util.log(typeof chuck)
		callback(null,chuck);
	})
}
