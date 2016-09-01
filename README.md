# Gulp Plugin

![Build Status](https://travis-ci.org/kwoktung/gulp-del-comment-space.svg?branch=master)

> Delete comments (/* comment */) and blank space

The purpose of plugin is to learn to write Gulp Plugin and publish npm module;

Keep learning, Keep thinking.


## Install

	$ npm install gulp-del-comment-space -D

## Usage

	var gulp = require('gulp');
	var delCommentSpace = require('gulp-del-comment-space')
	gulp.src('path/to/file')
		.pipe(delCommentSpace())
		.pipe(gulp.dest('path/to/dest'))

## License

MIT




