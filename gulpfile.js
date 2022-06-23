// Gulp
const { watch } = require('gulp'); // https://www.npmjs.com/package/gulp

// Plugins
const argv = require('yargs').argv; // https://www.npmjs.com/package/yargs

// Define library tasks
const library = require('./gulp/library').build;

// Define demo tasks
const demo = require('./gulp/demo').build;

// Watcher task
exports.watch = (cb) => {
	if (!argv.demo) {
		watch('src/*.{js,scss}').on('change', library);
	} else {
		watch(['demo/src/**/*.{html,js,scss,svg}', 'demo/tailwind.config.js']).on('change', demo);
	}
	cb();
};

// Default task
exports.default = (cb) => {
	if (!argv.demo) {
		library();
	} else {
		demo();
	}
	cb();
};