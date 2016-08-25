## gulp 插件制作教程

1. gulp是基于流的的自动化构建工具，其优势 ？

传统读取文件（String｜Buffer）

fs.readFile('path/to/file',callback);

流模型读取文件 (Stream)


fs.createReadStream('path/to/file')

.pipe()

.on('data',function(chuck){//do something with chuck });



仔细观察：

传统读取方式，是将所有的文件文件直接全部读出来，然后再callback中进行数据处理，如此做法在频繁读取大文件的时候，将会产生比较大消耗。

流模型读取方式，可以在流的基础上使用事件对数据进行处理，例如有新的数据到来的时候，流将会发射（Emit）data事件通知监听者来处理，从而可以将管道化处理。

所以最大的区别是：流模型有事件机制;





