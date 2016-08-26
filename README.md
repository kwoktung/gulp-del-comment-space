### Gulp 插件 

![Build Result](https://travis-ci.org/kwoktung/gulp-plugin-tutorial.svg?branch=master)

- - -

#### 本文插件事例

实现一个删除`简单注释(/**/)`和`空白符`的Gulp插件。

用法：

	var gulp = require('gulp');
	var stripComment = require('kwoktung/gulp-plugin-tutorial');
		gulp.src('path/to/read')
		.pipe(stripComment())
		.pipe(gulp.dest('path/to/write'))

- - - 

#### Gulp 一种基于流的的自动化构建工具

1.传统读取文件（String｜Buffer）

	var fs=require('fs');
	fs.readFile('path/to/file',function(err,content){
		// do somethig in callback
	});

将所有的文件直接全部读出来，在callback中进行处理，如此做法在频繁读取大文件的时候，会产生比较大消耗。

2.流模型读取文件 (Stream)
	
	var fs = require('fs');
	var stream = fs.createReadStream('path/to/file');
	var writeStream = fs.createWriteStream('path/to/anotherfile');
	stream.on('data',function(chuck){
		//do something with chuck 
		});
	stream.pipe(writeStream)

使用事件进行数据处理，例如有新数据到来，流将会发射(Emit)data事件通知监听者来处理，从而实现管道化处理.


结论区别：**流模型有事件机制**，管道化的基石。

- - - 

#### Node 流基本原理

[官方文档](https://nodejs.org/docs/latest/api/stream.html) [中文文档](http://nodeapi.ucdok.com/api/)

[stream-handbook](https://github.com/substack/stream-handbook) [中文文档](https://github.com/jabez128/stream-handbook)

Gulp基于`Transform Stream`模型, 采用非官方库 [through2](https://github.com/rvagg/through2)

部分基于`Object Stream`(允许传送 `Javascript` 对象，而限制单纯的 `String`对象和`Buffer`对象)

[Object Stream文章](https://nodesource.com/blog/understanding-object-streams/)

`through2` 使用方法:
	
	var fs=require('fs');
	var through2 = require('through2')
	fs.createReadStream('path/to/readable')
	.pipe(through2.object(function(chuck,encode,callback){
			// do something with chuck
			callback(null,chuck)
		}))

在 `througt2.object` 里面处理 `chuck` 的数据，然后调用 `callback`,将其数据传送到下游流中。

- - - 

#### Gulp 基本原理

`Gulp` 内部实现一种虚拟的文件格式([vinfy](https://github.com/gulpjs/vinyl))。

`Gulp.src` 方法往下游传送的数据块就是这种文件格式。其中的 `vinfy.contents` 就是传送过来的数据。

插件的任务是修改其中的数据，并且将其传送到下游数据流中。

具体实现：

1. 插件函数（假设为plugin）调用，应该返回一个 Transform Stream 数据流（假设为 stream。
2. stream 需要实现至少一个方法 transform，处理上游数据，同时将处理好的数据传输到下游流中。





