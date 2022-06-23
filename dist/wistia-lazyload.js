/*!
 * wistia-lazyload.js v1.0.0 (https://github.com/edbartholomew/wistia-lazyload.js)
 * Copyright 2022 Ed Bartholomew (https://edbartholomew.com)
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if (typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if (typeof define === 'function' && define.amd) define([], factory);
	else if (typeof exports === 'object') exports['wistiaLazyload'] = factory();
	else root['wistiaLazyload'] = factory();
})(self, () => {
	return (() => {
		'use strict';
		var __webpack_require__ = {};
		(() => {
			__webpack_require__.d = (exports, definition) => {
				for (var key in definition) {
					if (
						__webpack_require__.o(definition, key) &&
						!__webpack_require__.o(exports, key)
					) {
						Object.defineProperty(exports, key, {
							enumerable: true,
							get: definition[key],
						});
					}
				}
			};
		})();
		(() => {
			__webpack_require__.o = (obj, prop) =>
				Object.prototype.hasOwnProperty.call(obj, prop);
		})();
		(() => {
			__webpack_require__.r = (exports) => {
				if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
					Object.defineProperty(exports, Symbol.toStringTag, {
						value: 'Module',
					});
				}
				Object.defineProperty(exports, '__esModule', { value: true });
			};
		})();
		var __webpack_exports__ = {};
		__webpack_require__.r(__webpack_exports__);
		__webpack_require__.d(__webpack_exports__, {
			default: () => wistia_lazyload,
		});
		const wistia_lazyload_min_namespaceObject =
			'.wistia-lazyload{position:relative;width:100%;height:100%;box-sizing:border-box;aspect-ratio:16/9;background:rgba(0,0,0,.05)}.wistia-lazyload>img{width:100%;height:100%;object-fit:cover}.wistia-lazyload>div{position:absolute;top:0;left:0;visibility:hidden;width:100%;height:100%}.wistia-lazyloaded>div{visibility:visible}';
		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError('Cannot call a class as a function');
			}
		}
		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ('value' in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}
		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps)
				_defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, 'prototype', {
				writable: false,
			});
			return Constructor;
		}
		var WistiaLazyload = (function () {
			function WistiaLazyload() {
				_classCallCheck(this, WistiaLazyload);
				this.pluginName = 'wistia-lazyload.js';
				this.loadingClassName = 'wistia-lazyload';
				this.loadedClassName = 'wistia-lazyloaded';
				this.loadedVideos = [];
				this.init();
			}
			_createClass(WistiaLazyload, [
				{
					key: 'lazyLoad',
					value: function lazyLoad(target) {
						var _this = this;
						var videoId = target.lastElementChild.dataset.videoId;
						if (!this.loadedVideos.includes(videoId)) {
							this.loadedVideos.push(videoId);
							var childElements = target.childElementCount;
							var embed = document.querySelector(
								'.'
									.concat(
										this.loadingClassName,
										' > [data-video-id="'
									)
									.concat(videoId, '"]')
							);
							var placeholder =
								embed.parentElement.querySelector('img');
							if (childElements > 1 && placeholder.dataset.src) {
								placeholder.style.visibility = 'hidden';
								placeholder.onload = function () {
									if (placeholder.style.length > 1) {
										placeholder.style.removeProperty(
											'visibility'
										);
									} else {
										placeholder.removeAttribute('style');
									}
								};
								placeholder.src = placeholder.dataset.src;
							}
							embed.classList.add(
								'wistia_embed',
								'wistia_async_'.concat(videoId)
							);
							var video = document.createElement('script');
							video.src =
								'https://fast.wistia.com/embed/medias/'.concat(
									videoId,
									'.jsonp'
								);
							document.body.appendChild(video);
							if (typeof Wistia === 'undefined') {
								var script = document.createElement('script');
								script.src =
									'https://fast.wistia.com/assets/external/E-v1.js';
								document.body.appendChild(script);
							}
							window._wq = window._wq || [];
							_wq.push({
								id: videoId,
								onReady: function onReady() {
									target.classList.add(_this.loadedClassName);
								},
							});
						} else {
							console.warn(
								''
									.concat(
										this.pluginName,
										' - Duplicate Wistia embed (video ID: '
									)
									.concat(
										videoId,
										'). Only the first instance will be loaded.'
									)
							);
						}
					},
				},
				{
					key: 'createObserver',
					value: function createObserver(video) {
						var _this2 = this;
						var callback = function callback(entries) {
							entries.forEach(function (entry) {
								if (entry.isIntersecting) {
									_this2.lazyLoad(entry.target);
									observer.unobserve(entry.target);
								}
							});
						};
						var options = { rootMargin: '10%' };
						var observer = new IntersectionObserver(
							callback,
							options
						);
						observer.observe(video);
					},
				},
				{
					key: 'injectStyles',
					value: function injectStyles() {
						var style = document.createElement('style');
						style.id = ''.concat(
							this.loadingClassName,
							'-injected-styles'
						);
						style.appendChild(
							document.createTextNode(
								wistia_lazyload_min_namespaceObject
							)
						);
						document.head.appendChild(style);
					},
				},
				{
					key: 'init',
					value: function init() {
						var _this3 = this;
						window.addEventListener('load', function () {
							var videos = Array.from(
								document.querySelectorAll(
									'.'.concat(_this3.loadingClassName)
								)
							);
							_this3.injectStyles();
							if ('IntersectionObserver' in window) {
								videos.forEach(function (video) {
									return _this3.createObserver(video);
								});
							} else {
								videos.forEach(function (video) {
									return _this3.lazyLoad(video);
								});
								console.warn(
									''.concat(
										_this3.pluginName,
										' - Intersection Observer API not support by your browser. Wistia videos will not be lazy loaded.'
									)
								);
							}
						});
					},
				},
			]);
			return WistiaLazyload;
		})();
		var wistiaLazyload = new WistiaLazyload();
		const wistia_lazyload = wistiaLazyload;
		return __webpack_exports__;
	})();
});
