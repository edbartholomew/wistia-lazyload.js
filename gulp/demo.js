// Gulp
const { src, dest, series, parallel } = require('gulp'); // https://www.npmjs.com/package/gulp

// Plugins
const del = require('del'); // https://www.npmjs.com/package/del
const postcss = require('gulp-postcss'); // https://www.npmjs.com/package/gulp-postcss
const tailwindcss = require('tailwindcss'); // https://www.npmjs.com/package/tailwindcss
const autoprefixer = require('autoprefixer'); // https://www.npmjs.com/package/autoprefixer
const sass = require('gulp-sass')(require('sass')); // https://www.npmjs.com/package/gulp-sass
const cleancss = require('gulp-clean-css'); // https://www.npmjs.com/package/gulp-clean-css
const rename = require('gulp-rename'); // https://www.npmjs.com/package/gulp-rename
const webpack = require('webpack-stream'); // https://www.npmjs.com/package/webpack-stream
const TerserPlugin = require('terser-webpack-plugin'); // https://webpack.js.org/plugins/terser-webpack-plugin/

// Define folders
const origin = 'demo/src';
const destination = 'demo/dist';

// Delete the destination folder
async function clean(cb) {
	await del('demo/dist');
	cb();
}

// Process HTML
function html(cb) {
	src(origin + '/*.html').pipe(dest(destination));
	cb();
}

// Process SCSS
function scss(cb) {
	src(origin + '/assets/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([tailwindcss('demo/tailwind.config.js'), autoprefixer()]))
		.pipe(cleancss())
		.pipe(
			rename((path) => {
				path.basename += '.min';
			})
		)
		.pipe(dest(destination + '/assets/css/'));
	cb();
}

// Process JavaScript
function js(cb) {
	src(origin + '/assets/js/*.js')
		.pipe(
			webpack({
				mode: 'production',
				output: {
					filename: 'script.js',
				},
				optimization: {
					minimize: true,
					minimizer: [
						new TerserPlugin({
							extractComments: false,
						}),
					],
				},
			})
		)
		.pipe(
			rename((path) => {
				path.basename += '.min';
			})
		)
		.pipe(dest(destination + '/assets/js/'));
	cb();
}

// Process fonts
function fonts(cb) {
	src(origin + '/assets/fonts/*.{woff,woff2}').pipe(dest(destination + '/assets/fonts/'));
	cb();
}

// Process images
function images(cb) {
	src(origin + '/assets/images/*.{svg,jpg}').pipe(dest(destination + '/assets/images/'));
	cb();
}

// Export task
exports.build = series(clean, parallel(html, scss, js, fonts, images));