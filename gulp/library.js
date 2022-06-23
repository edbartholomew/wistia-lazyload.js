// Gulp
const { src, dest, series } = require('gulp'); // https://www.npmjs.com/package/gulp

// Plugins
const del = require('del'); // https://www.npmjs.com/package/del
const sass = require('gulp-sass')(require('sass')); // https://www.npmjs.com/package/gulp-sass
const cleancss = require('gulp-clean-css'); // https://www.npmjs.com/package/gulp-clean-css
const rename = require('gulp-rename'); // https://www.npmjs.com/package/gulp-rename
const webpack = require('webpack-stream'); // https://www.npmjs.com/package/webpack-stream
const header = require('gulp-header'); // https://www.npmjs.com/package/gulp-header
const decomment = require('gulp-decomment'); // https://www.npmjs.com/package/gulp-decomment
const prettier = require('gulp-prettier'); // https://www.npmjs.com/package/gulp-prettier
const replace = require('gulp-replace'); // https://www.npmjs.com/package/gulp-replace

// Define folders
const origin = 'src';
const destination = 'dist';

// Delete the destination folder
async function clean(cb) {
	await del(destination);
	cb();
}

// Define the header at the top of the file
const pkg = require('../package.json');
const year = new Date().getFullYear();
const banner = [
	'/*!',
	' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.repository.url %>)',
	' * Copyright <%= year %> <%= pkg.author.name %> (<%= pkg.author.url %>)',
	' * Licensed under <%= pkg.license %>',
	' */',
	'',
].join('\n');

// Process SCSS
function scss(cb) {
	src(origin + '/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleancss())
		.pipe(
			rename((path) => {
				path.basename += '.min';
			})
		)
		.pipe(dest(origin));
	cb();
}

// Process JavaScript
function js(cb) {
	src(origin + '/*.js')
		.pipe(
			webpack({
				mode: 'production',
				optimization: {
					minimize: false,
				},
				output: {
					library: 'wistiaLazyload',
					libraryTarget: 'umd',
					filename: `wistia-lazyload.js`,
				},
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: [['@babel/preset-env', { targets: 'defaults' }]],
								},
							},
						},
						{
							test: /\.css/,
							type: 'asset/source',
						},
					],
				},
			})
		)
		.pipe(decomment())
		.pipe(replace('\n', ''))
		.pipe(prettier({ singleQuote: true, useTabs: true, tabWidth: 4 }))
		.pipe(
			header(banner, {
				pkg: pkg,
				year: year,
			})
		)
		.pipe(dest(destination))
		.on('end', () => {
			del(origin + '/*.css');
		});
	cb();
}

// Process JavaScript (minified)
function jsMin(cb) {
	src(origin + '/*.js')
		.pipe(
			webpack({
				mode: 'production',
				output: {
					library: 'wistiaLazyload',
					libraryTarget: 'umd',
					filename: `wistia-lazyload.js`,
				},
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: [['@babel/preset-env', { targets: 'defaults' }]],
								},
							},
						},
						{
							test: /\.css/,
							type: 'asset/source',
						},
					],
				},
			})
		)
		.pipe(
			header(banner, {
				pkg: pkg,
				year: year,
			})
		)
		.pipe(
			rename((path) => {
				path.basename += '.min';
			})
		)
		.pipe(dest(destination))
		.on('end', () => {
			del(origin + '/*.css');
		});
	cb();
}

// Export task
exports.build = series(clean, scss, js, jsMin);